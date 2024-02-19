import { SendOtpDto } from '@/app/otp/dto/send-otp.dto';
import { VerifyOtpDto } from '@/app/otp/dto/verify-otp.dto';
import { OtpService } from '@/app/otp/otp.service';
import { SentryInterceptor } from '@/interceptors/sentry.interceptor';
import { Routes } from '@/utils/constants/routes.constant';
import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('OTP')
@UseInterceptors(SentryInterceptor)
@Controller(Routes.OTP)
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Post()
  async sendOtp(@Body() sendOtpDto: SendOtpDto): Promise<string> {
    return this.otpService.sendOtpByEmail(sendOtpDto);
  }

  @Post('/verification')
  async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto): Promise<boolean> {
    return this.otpService.verifyOtpByEmail(verifyOtpDto);
  }
}
