import { Model, Table } from "sequelize-typescript";

interface IRewiewsCreationAttr {
  discountId: number;
  userId: number;
  text: string;
  rating: number;
  photo: string;
}

@Table({tableName:'rewiews'})
export class Rewiew extends Model{}
