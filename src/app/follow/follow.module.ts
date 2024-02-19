import { FollowController } from "@/app/follow/follow.controller";
import { FollowService } from "@/app/follow/follow.service";
import { User } from "@/app/user/entities/user.entity";
import { UserModule } from "@/app/user/user.module";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([User]), UserModule],
  controllers: [FollowController],
  providers: [FollowService],
})
export class FollowModule {}
