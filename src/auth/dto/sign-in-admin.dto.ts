import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsStrongPassword } from "class-validator";

export class SignInDtoAdmin {
  @ApiProperty({ example: "asilaaliqulova@gmail.com" })
  @IsEmail()
  readonly email: string;
  @ApiProperty({ example: "string" })
  // @IsStrongPassword()
  readonly password: string;
}
