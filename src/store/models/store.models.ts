import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { StoreSubscribe } from "../../store_subscribe/models/store_subscribe.model";
import { Discount } from "../../discount/models/discount.model";
import { User } from "../../users/models/user.model";
import { StoreSocialLink } from "../../store_social_link/models/store_social_link.model";
import { District } from "../../district/models/district.model";
import { Region } from "../../region/models/region.model";

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

   @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  ownerId: number;

   @ForeignKey(() => StoreSocialLink)
  @Column({
    type: DataType.INTEGER,
  })
  storeCocialLinkId: number;

   @ForeignKey(() => District)
  @Column({
    type: DataType.INTEGER,
  })
  districtId: number;

   @ForeignKey(() => Region)
  @Column({
    type: DataType.INTEGER,
  })
  regionId: number;

   @BelongsTo(() => Region)
  region: Region;

   @BelongsTo(() => District)
  district: District;

    @BelongsTo(() => User)
  owner: User;

   @BelongsTo(() =>StoreSocialLink )
  storeCocialLink: StoreSocialLink;

  @HasMany(() => StoreSubscribe)
  customer: StoreSubscribe[];

  @HasMany(() => Discount )
  discount: Discount[];
}