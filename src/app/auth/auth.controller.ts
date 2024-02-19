import { AuthService } from '@/app/auth/auth.service';
import { AuthCredentialsDto } from '@/app/auth/dto/auth-credentials.dto';
import { ChangePasswordDto } from '@/app/auth/dto/change-password.dto';
import { CreateUserDto } from '@/app/auth/dto/create-user.dto';
import { JwtAuthGuard } from '@/app/auth/guards/jwt-auth.guard';
import { VerifyOtpDto } from '@/app/otp/dto/verify-otp.dto';
import { User } from '@/app/user/entities/user.entity';
import { GetToken } from '@/decorators/get-token.decorator';
import { GetUser } from '@/decorators/get-user.decorator';
import { PublicFileValidatorInterceptor } from '@/interceptors/public-file-validator.interceptor';
import { Routes } from '@/utils/constants/routes.constant';
import {
  Body,
  Controller,
  Delete,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  @UseInterceptors(
    FileInterceptor('avatar'),
    new PublicFileValidatorInterceptor(
      [/^image\/(?:jpg|jpeg|png|webp|gif|bmp|svg\+xml)$/i],
      'Only images are allowed',
      false
    )
  )
  signUp(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile()
    avatar: Express.Multer.File
  ) {
    return this.authService.signUp(createUserDto, avatar);
  }

  @Post('/sign-in')
  signIn(@Body() authCredentialsDto: AuthCredentialsDto) {
    return this.authService.signIn(authCredentialsDto);
  }

  @Delete('/sign-out')
  @UseGuards(JwtAuthGuard)
  signOut(@GetUser() user: User, @GetToken() token: string) {
    return this.authService.signOut(user, token);
  }

  @Patch('/email-verification')
  emailVerification(verifyOtpDto: VerifyOtpDto) {
    return this.authService.emailVerification(verifyOtpDto);
  }

  @Post('/change-password')
  async changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    return this.authService.changePassword(changePasswordDto);
  }
}
