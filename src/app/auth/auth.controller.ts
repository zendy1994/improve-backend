import { AuthService } from "@/app/auth/auth.service";
import { AuthCredentialsDto } from "@/app/auth/dto/auth-credentials.dto";
import { CreateUserDto } from "@/app/auth/dto/create-user.dto";
import { ResetPasswordDto } from "@/app/auth/dto/reset-password.dto";
import { User } from "@/app/user/entities/user.entity";
import { GetToken } from "@/decorators/get-token.decorator";
import { GetUser } from "@/decorators/get-user.decorator";
import { PublicFileValidatorInterceptor } from "@/interceptors/public-file-validator.interceptor";
import {
  Body,
  Controller,
  Delete,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/sign-up")
  @UseInterceptors(
    FileInterceptor("avatar"),
    new PublicFileValidatorInterceptor(
      [/^image\/(?:jpg|jpeg|png|webp|gif|bmp|svg\+xml)$/i],
      "Only images are allowed",
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

  @Post("/sign-in")
  signIn(@Body() authCredentialsDto: AuthCredentialsDto) {
    return this.authService.signIn(authCredentialsDto);
  }

  @Delete("/sign-out")
  signOut(@GetUser() user: User, @GetToken() token: string) {
    return this.authService.signOut(user, token);
  }

  @Post("/reset-password")
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }
}
