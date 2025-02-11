import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Store } from "../../store/models/store.models";
import { SocialLink } from "../../social_link/models/social_link.model";

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



   @HasMany(() => Store)
  store: Store[];
    @ForeignKey(() => SocialLink)
    @Column({
      type: DataType.INTEGER,
      allowNull: true,
    })
    social_linkId: number;

  @BelongsTo(() => SocialLink)
  socialLink: SocialLink;
}
