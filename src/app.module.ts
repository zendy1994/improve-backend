import { FileModule } from '@/app/file/file.module';
import { UserModule } from '@/app/user/user.module';
import configuration from '@/config/configuration';
import { configValidationSchema } from '@/schema/config.schema';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: `src/config/environments/${process.env.NODE_ENV}.env`,
      validationSchema: configValidationSchema,
    }),
    UserModule,
    FileModule,
  ],
  controllers: [AppController],
})
export class AppModule { }
