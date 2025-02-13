import {  IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class VerifiOtpDto {
  @IsPhoneNumber("UZ")
  phone: string;

  @IsNotEmpty()
  @IsString()
  otp: string;

  @IsNotEmpty()
  @IsString()
  verification_key: string;
}
