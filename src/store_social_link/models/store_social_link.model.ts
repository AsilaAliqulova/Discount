import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";

interface ISocialLinkStoreCreationAttr{

  url: string;
  description: string;
  socialLinkId: number;
}


@Table({ tableName: "store_social_link" })
export class StoreSocialLink extends Model<
  StoreSocialLink,
  ISocialLinkStoreCreationAttr
> {
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
  description: string;
  //   @ForeignKey(() => SocialLink)
  //   @Column({
  //     type: DataType.INTEGER,
  //     allowNull: true,
  //   })
  //   social_linkId: number;

//   @BelongsTo(() => SocialLink, { foreignKey: "social_linkId" })
//   socialLink: SocialLink;
}
