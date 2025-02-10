
import { IsEmail, IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;
  @IsPhoneNumber("UZ")
  phone?: string;
  @IsEmail()
  email?: string;
}
