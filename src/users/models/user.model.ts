import { ApiProperty } from "@nestjs/swagger";
import {  Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { StoreSubscribe } from "../../store_subscribe/models/store_subscribe.model";

interface IUserCreationAttr {
  name: string;
  phone: string;
  email: string;
  hashed_password: string;
  activation_link:string
}

@Table({ tableName: "users" })
export class User extends Model<User, IUserCreationAttr> {
  @ApiProperty()
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING(30),
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING(30),
    allowNull: false,
  })
  phone: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
  })
  hashed_password: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_owner: boolean;

  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string | null;

  @Column({
    type: DataType.STRING,
  })
  activation_link: string;

  // @HasMany(() => StoreSubscribe)
  // customer: StoreSubscribe[];
}
