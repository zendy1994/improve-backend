import { AuthController } from '@/app/auth/auth.controller';
import { AuthService } from '@/app/auth/auth.service';
import { JwtStrategy } from '@/app/auth/strategies/jwt.strategy';
import { LocalStrategy } from '@/app/auth/strategies/local.strategy';
import { File } from '@/app/file/entities/file.entity';
import { FileModule } from '@/app/file/file.module';
import { OtpModule } from '@/app/otp/otp.module';
import { User } from '@/app/user/entities/user.entity';
import { UserModule } from '@/app/user/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlacklistedToken } from '@/app/user/entities/blacklisted_token.entity';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET_KEY'),
        signOptions: {
          expiresIn: `${configService.get<string>('JWT_EXPIRES_TIME')}`,
        },
      }),
    }),
    TypeOrmModule.forFeature([User, BlacklistedToken, File]),
    FileModule,
    UserModule,
    OtpModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
