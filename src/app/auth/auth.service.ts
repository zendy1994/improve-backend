import { AuthCredentialsDto } from "@/app/auth/dto/auth-credentials.dto";
import { CreateUserDto } from "@/app/auth/dto/create-user.dto";
import { ResetPasswordDto } from "@/app/auth/dto/reset-password.dto";
import { OtpService } from "@/app/otp/otp.service";
import { User } from "@/app/user/entities/user.entity";
import { UserService } from "@/app/user/user.service";
import { PostgresErrorCode } from "@/common/enums/postgres-error-code.enum";
import { ValidatorConstants } from "@/utils/constants/validator.constant";
import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { Repository } from "typeorm";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    private jwtService: JwtService,
    private userService: UserService,
    private otpService: OtpService
  ) {}

  async blacklistToken(userId: string, token: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (user) {
      user.blacklisted_tokens = user.blacklisted_tokens || [];
      user.blacklisted_tokens.push(token);

      await this.userRepository.save(user);
    }
  }

  async isTokenBlacklisted(userId: string, token: string): Promise<boolean> {
    const user = await this.userRepository.findOneBy({ id: userId });

    return (
      user && user.blacklisted_tokens && user.blacklisted_tokens.includes(token)
    );
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword
    );
    if (!isPasswordMatching) {
      throw new BadRequestException("Wrong credentials provided");
    }
  }

  async signUp(
    createUserDto: CreateUserDto,
    avatar: Express.Multer.File
  ): Promise<User> {
    const { email, username, password } = createUserDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const isTaken = await this.userService.isEmailOrUsernameTaken(
      email,
      username
    );

    if (isTaken) {
      throw new ConflictException("Email or username already exists");
    }

    const savedUser = await this.userRepository.save({
      ...createUserDto,
      password: hashedPassword,
    });

    if (avatar) {
      await this.userService.addAvatar(savedUser.id, avatar);
    }

    const user: User = await this.userService.findUserByIdentifier(email);

    return user;
  }

  async signIn(authCredentialsDto: AuthCredentialsDto) {
    try {
      const { identifier, password } = authCredentialsDto;

      const user: User = await this.userService.findUserByIdentifier(
        identifier
      );

      await this.verifyPassword(password, user.password);

      const { id, email, username } = user;

      const accessToken: string = await this.jwtService.sign({
        id,
        email,
        username,
      });

      return {
        profile: {
          ...user,
        },
        access_token: accessToken,
      };
    } catch (error) {
      throw new UnauthorizedException("Please check your login credentials");
    }
  }

  async signOut(user: User, token: string): Promise<string> {
    const { id: userId } = user;

    if (await this.isTokenBlacklisted(userId, token)) {
      return "Token is already blacklisted";
    }

    await this.blacklistToken(userId, token);

    return "Logout successfully";
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { username, newPassword } = resetPasswordDto;

    const user: User = await this.userService.findUserByIdentifier(username);

    if (!user) {
      throw new NotFoundException(ValidatorConstants.NOT_FOUND("User"));
    }

    const salt = await bcrypt.genSalt();
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    await this.userRepository.save({
      ...user,
      password: hashedNewPassword,
    });

    return this.userService.getUserDetailByUserId(user.id);
  }
}
