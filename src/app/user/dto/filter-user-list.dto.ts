import { IsOptional, IsString } from "class-validator";

export class FilterUserListDto {
  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  order_by: "ASC" | "DESC";
}
