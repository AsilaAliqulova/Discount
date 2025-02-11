import { Model, Table } from "sequelize-typescript";

interface IRewiewsCreationAttr {
  discountId: number;
  text: string;
  rating: number;
  photo: string;
  userId: number;
}

@Table({tableName:'rewiews'})
export class Rewiew extends Model{
  
}
