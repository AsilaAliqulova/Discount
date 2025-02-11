import { ApiProperty } from "@nestjs/swagger";

export class CreatePhotoDto {
    @ApiProperty()
    url:string
    @ApiProperty()
    discountId:number
    @ApiProperty()
    photo:string
}
