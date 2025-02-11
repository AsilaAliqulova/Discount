import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IBotCReationAttr {
  userId: number | undefined;
  username: string | undefined;
  first_name: string | undefined;
  last_name: string | undefined;
  lang: string | undefined;
}
@Table({ tableName: "bot" })
export class Bot extends Model<Bot, IBotCReationAttr> {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
  })
  userId: number | undefined;
  @Column({
    type: DataType.STRING,
  })
  username: string | undefined;
  @Column({
    type: DataType.STRING,
  })
  first_name: string | undefined;
  @Column({
    type: DataType.STRING,
  })
  last_name: string | undefined;
  @Column({
    type: DataType.STRING,
  })
  phone_number: string;
  @Column({
    type: DataType.STRING,
  })
  lang: string | undefined;
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  status: boolean;
}
