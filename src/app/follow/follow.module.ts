import { Module } from "@nestjs/common";
import { FollowService } from "./follow.service";
import { FollowController } from "./follow.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "../user/user.module";
import { User } from "../user/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User]), UserModule],
  controllers: [FollowController],
  providers: [FollowService],
})
export class FollowModule {}
