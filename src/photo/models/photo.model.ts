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
  photo:string
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
    type: DataType.STRING,
  })
  url: string;
  
  @Column({
    type: DataType.STRING,
  })
  photo: string;

  @ForeignKey(() => Discount)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  discountId: number;

  @BelongsTo(() => Discount)
  parent: Discount;
}
