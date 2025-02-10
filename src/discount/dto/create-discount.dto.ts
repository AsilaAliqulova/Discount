import { ApiProperty } from "@nestjs/swagger";

export class CreateDiscountDto {
  @ApiProperty()
  storeId: number;
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  discount_percent: number;
  @ApiProperty()
  start_date: string;
  @ApiProperty()
  end_date: string;
  @ApiProperty()
  categoryId: number;
  @ApiProperty()
  discount_value: number;
  @ApiProperty()
  special_link: string;
  @ApiProperty()
  is_active: boolean;
  @ApiProperty()
  discountTypeId: number;
}
