import { Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { StoreSubscribe } from "../../store_subscribe/models/store_subscribe.model";

interface IStoreCreationAttr{

    name: string;
    location: string;
    phone: string;
    since:string
    ownerId:number
    storeCocialLinkId:number
    districtId:number
    regionId:number
    
}
@Table({ tableName: "store" })
export class Store extends Model<Store, IStoreCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  location: string;

  @Column({
    type: DataType.STRING,
  })
  phone: string;

  @Column({
    type: DataType.STRING,
  })
  since: string;

  @HasMany(() => StoreSubscribe)
  customer: StoreSubscribe[];
}