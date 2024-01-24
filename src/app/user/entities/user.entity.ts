import { BaseEntity } from '@/common/entities/base.entity';
import { TableDB } from '@/common/enums/table-db.enum';
import { File } from '@/app/file/entities/file.entity';
import { Exclude } from 'class-transformer';
import {
    Column,
    Entity,
    Index,
    JoinColumn,
    OneToOne
} from 'typeorm';


@Entity(TableDB.USER)
export class User extends BaseEntity {
  @Index('username_idx', { unique: true })
  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  @Exclude({ toPlainOnly: true })
  password: string;


  @Column({
    type: 'uuid',
    nullable: true,
  })
  avatar_id: string;

  @OneToOne(() => File, (file) => file.avatar, {
    eager: true,
    nullable: true,
  })
  @JoinColumn({ name: 'avatar_id' })
  avatar: File;
}
