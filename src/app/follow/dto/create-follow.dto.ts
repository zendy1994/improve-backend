import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateFollowDto {
  @IsNotEmpty()
  @IsUUID()
  follow_user_id: string;
}
