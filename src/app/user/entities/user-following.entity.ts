import { BaseEntity } from '@/common/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { TableDB } from '@/common/enums/table-db.enum';


@Entity(TableDB.USER_FOLLOWING)
export class UserFollowing extends BaseEntity {
    @Column({type: 'uuid'})
    follower_id: string;

    @Column({type: 'uuid'})
    following_id: string;

    @ManyToOne(() => User, user => user.following)
    @JoinColumn({ name: 'follower_id' })
    follower: User;

    @ManyToOne(() => User, user => user.followers)
    @JoinColumn({ name: 'following_id' })
    following: User;
}
