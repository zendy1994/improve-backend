import { BaseEntity } from "@/common/entities/base.entity";
import { TableDB } from "@/common/enums/table-db.enum";
import { IsEmail, IsString } from "class-validator";
import { Column, Entity } from "typeorm";

@Entity(TableDB.OTP)
export class Otp extends BaseEntity {
  @Column()
  @IsEmail()
  email: string;

  @Column({ length: 6 })
  @IsString()
  code: string;

  @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP(6)" })
  expires_at: Date;
}
