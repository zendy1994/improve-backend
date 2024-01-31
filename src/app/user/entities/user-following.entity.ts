import { User } from "@/app/user/entities/user.entity";
import { BaseEntity } from "@/common/entities/base.entity";
import { TableDB } from "@/common/enums/table-db.enum";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity(TableDB.USER_FOLLOW)
export class UserFollow extends BaseEntity {
  @Column({ type: "uuid" })
  follower_id: string;

  @Column({ type: "uuid" })
  following_id: string;

  @ManyToOne(() => User, (user) => user.following)
  @JoinColumn({ name: "follower_id" })
  follower: User;

  @ManyToOne(() => User, (user) => user.followers)
  @JoinColumn({ name: "following_id" })
  following: User;
}
