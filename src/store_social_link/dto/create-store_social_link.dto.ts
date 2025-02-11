import { ApiProperty } from "@nestjs/swagger";

export class CreateStoreSocialLinkDto {
  @ApiProperty()
  url: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  socialLinkId: number;
}
