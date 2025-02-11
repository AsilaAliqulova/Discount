import { ApiProperty } from "@nestjs/swagger";

export class CreateFavouriteDto {
    @ApiProperty()
    userId:number
    @ApiProperty()
    discountId:number
}
