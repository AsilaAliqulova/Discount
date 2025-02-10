import { ApiProperty } from "@nestjs/swagger";

export class CreateDiscountTypeDto {
    @ApiProperty()
    name:string
    @ApiProperty()
    description:string
}
