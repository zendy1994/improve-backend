import { Column, Entity, Index, JoinTable, ManyToMany, OneToOne, JoinColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { File } from '@/app/file/entities/file.entity';
import { BaseEntity } from '@/common/entities/base.entity';
import { TableDB } from '@/common/enums/table-db.enum';

@Entity(TableDB.USER)
export class User extends BaseEntity {
  @Column({ type: 'uuid', nullable: true })
  avatar_id: string;

  @Index('email_idx', { unique: true })
  @Column({ unique: true })
  email: string;

  @Index('username_idx', { unique: true })
  @Column({ unique: true })
  username: string;

  @Column({ select: false })
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @OneToOne(() => File, (file) => file.avatar, {
    eager: true,
    nullable: true,
  })
  @JoinColumn({ name: 'avatar_id' })
  avatar: File;

  @ManyToMany(() => User, (user) => user.following)
  @JoinTable({
    name: 'user_following',
    joinColumn: { name: 'follower_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'following_id', referencedColumnName: 'id' },
  })
  following: User[];

  @ManyToMany(() => User, (user) => user.followers)
  followers: User[];
}
