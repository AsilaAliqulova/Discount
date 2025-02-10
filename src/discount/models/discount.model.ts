import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { DiscountType } from "../../discount_type/models/discount_type.model";
import { Category } from "../../category/models/category.model";

interface IDiscountCreationAtrr {
  title: string;
  description: string;
  discount_percent: number;
  start_date: string;
  end_date: string;
  discount_value: number;
  special_link: string;
  is_active: boolean;
  storeId: number;
  discountTypeId: number;
  categoryId: number;
}

@Table({ tableName: "discount" })
export class Discount extends Model<Discount, IDiscountCreationAtrr> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  discount_percent: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  start_date: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  end_date: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  discount_value: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  special_link: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  is_active: boolean;

  @ForeignKey(() => DiscountType)
  @Column({
    type: DataType.INTEGER,
  })
  discountTypeId: number;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
  })
  categoryId: number;

  @BelongsTo(() => DiscountType)
  discount_type: DiscountType;

  @BelongsTo(() => Category)
  category: Category;
}
