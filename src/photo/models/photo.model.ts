import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Discount } from "../../discount/models/discount.model";

interface IPhotoCreationAtrr {
  url: string;
  discountId: number;
}

@Table({ tableName: "photo" })
export class Photo extends Model<Photo, IPhotoCreationAtrr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.INTEGER,
  })
  url: number;

  @ForeignKey(() => Discount)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  discountId: number;

  @BelongsTo(() => Discount, { foreignKey: "discountId" })
  parent: Discount;
}
