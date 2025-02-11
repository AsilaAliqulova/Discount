import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { User } from "../../users/models/user.model";
import { Discount } from "../../discount/models/discount.model";

interface IFavouritesCreationAttr{
    userId:number
    discountId:number
}

@Table({tableName:'favourite'})
export class Favourite extends Model<Favourite,IFavouritesCreationAttr>{
     @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
 @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  userId: number;

  @ForeignKey(() => Discount)
  @Column({
    type: DataType.INTEGER,
  })
  discountId: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Discount)
  discount: Discount;
}
