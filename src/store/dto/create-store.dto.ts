import { ApiProperty } from "@nestjs/swagger";

export class CreateStoreDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    location: string;
    @ApiProperty()
    phone: string;
    @ApiProperty()
    createdAt: Date;
    @ApiProperty()
    since:string
    @ApiProperty()
    ownerId:number
    @ApiProperty()
    storeCocialLinkId:number
    @ApiProperty()
    districtId:number
    @ApiProperty()
    regionId:number
}
