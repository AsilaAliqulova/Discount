import { ApiProperty } from "@nestjs/swagger";

export class CreateStoreSubscribeDto {
    @ApiProperty()
    usesrId: number;
    @ApiProperty()
    storeId: number;
    
}
