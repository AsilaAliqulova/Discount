import { ApiProperty } from "@nestjs/swagger";

export class CreateStoreSubscribeDto {
    @ApiProperty()
    userId: number;
    @ApiProperty()
    storeId: number;
    
}
