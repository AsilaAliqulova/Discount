import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { District } from "../../district/models/district.model";

interface IRegionCreationAttr {
  name: string;
}

@Table({ tableName: "region" })
export class Region extends Model<Region, IRegionCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING(20),
  })
  name: string;

  @HasMany(() => District)
  distict: District[];

}
