import { IsDateString, IsEnum, IsNotEmpty, Matches, MinLength, IsOptional, IsString, Length, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is to weak',
  })
  password: string;

  @IsNotEmpty()
  fullName: string;

  @IsNotEmpty()
  @IsDateString()
  date_of_birth: string;
}
