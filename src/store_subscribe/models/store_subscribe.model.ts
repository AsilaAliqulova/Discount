import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../../users/models/user.model";
import { Store } from "../../store/models/store.models";

interface IStoreSubscribe {
  userId: number;
  storeId: number;
}

@Table({ tableName: "store_subscribe" })
export class StoreSubscribe extends Model<StoreSubscribe, IStoreSubscribe> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  userId: number;

  @BelongsTo(() => User, { foreignKey: "userId" })
  user: User;



  @ForeignKey(() => Store)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  storeId: number;

  @BelongsTo(() => Store, { foreignKey: "storeId" })
  store: Store;
}
