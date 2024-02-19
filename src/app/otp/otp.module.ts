import { Otp } from '@/app/otp/entities/otp.entity';
import { OtpController } from '@/app/otp/otp.controller';
import { OtpService } from '@/app/otp/otp.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Otp])],
  controllers: [OtpController],
  providers: [OtpService],
  exports: [OtpService],
})
export class OtpModule {}
