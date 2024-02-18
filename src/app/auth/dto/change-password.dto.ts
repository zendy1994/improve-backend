import { IsString, MinLength, Length } from "class-validator";

export class ChangePasswordDto {
  @IsString()
  email: string;

  @IsString()
  @MinLength(8)
  new_password: string;

  @IsString()
  @Length(6)
  code: string;
}
