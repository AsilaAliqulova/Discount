import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsStrongPassword } from "class-validator";

export class SignInDto {
  @ApiProperty({ example: "asilaaliqulova@gmail.com" })
  @IsEmail()
  readonly email: string;
  @ApiProperty({ example: "string" })
  // @IsStrongPassword()
  readonly password: string;
}
