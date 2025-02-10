import { ApiProperty } from "@nestjs/swagger";

export class CreateAdminDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  is_active: boolean;
  is_creator: boolean;
  hashed_refresh_token: string;
}
