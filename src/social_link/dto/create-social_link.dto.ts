import { ApiProperty } from "@nestjs/swagger"

export class CreateSocialLinkDto {
    @ApiProperty()
    name:string
    @ApiProperty()
    icon:string
}
