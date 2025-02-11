import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "./users/users.module";
import { User } from "./users/models/user.model";
import { AuthModule } from "./auth/auth.module";
import { MailModule } from "./mail/mail.module";
import { CategoryModule } from "./category/category.module";
import { Category } from "./category/models/category.model";
import { DiscountTypeModule } from "./discount_type/discount_type.module";
import { DiscountType } from "./discount_type/models/discount_type.model";
import { PhotoModule } from "./photo/photo.module";
import { DiscountModule } from "./discount/discount.module";
import { Photo } from "./photo/models/photo.model";
import { Discount } from "./discount/models/discount.model";
import { AdminModule } from './admin/admin.module';
import { Admin } from "./admin/models/admin.model";
import { RewiewsModule } from './rewiews/rewiews.module';
import { BotModule } from './bot/bot.module';
import { TelegrafModule } from "nestjs-telegraf";
import { BOT_NAME } from "./app.constants";
import { StoreModule } from './store/store.module';
import { StoreSubscribeModule } from './store_subscribe/store_subscribe.module';
import { StoreSocialLinkModule } from './store_social_link/store_social_link.module';
import { Store } from "./store/models/store.models";
import { StoreSubscribe } from "./store_subscribe/models/store_subscribe.model";
import { Bot } from "./bot/models/bot.model";
import { DistrictModule } from './district/district.module';
import { RegionModule } from './region/region.module';
import { FavouritesModule } from './favourites/favourites.module';
import { SocialLinkModule } from './social_link/social_link.module';
import { District } from "./district/models/district.model";
import { Region } from "./region/models/region.model";
import { Favourite } from "./favourites/models/favourite.model";
import { Rewiew } from "./rewiews/models/rewiew.model";
import { SocialLink } from "./social_link/models/social_link.model";
import { StoreSocialLink } from "./store_social_link/models/store_social_link.model";

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      botName: BOT_NAME,
      useFactory: () => ({
        token: process.env.BOT_TOKEN || "1234",
        middlewares: [],
        include: [BotModule],
      }),
    }),
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      username: process.env.POSTGRES_USER,
      port: Number(process.env.POSTGRES_PORT),
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
        User,
        Category,
        DiscountType,
        Photo,
        Discount,
        Admin,
        Store,
        StoreSubscribe,
        Bot,
        District,
        Region,
        Favourite,
        Rewiew,
        SocialLink,
        StoreSocialLink
      ],
      autoLoadModels: true, //modelllarni avtomatik topib olish
      sync: { alter: true }, //db bilan bog'lanish
      logging: false,
    }),
    UsersModule,
    AuthModule,
    MailModule,
    CategoryModule,
    DiscountTypeModule,
    PhotoModule,
    DiscountModule,
    AdminModule,
    RewiewsModule,
    BotModule,
    StoreModule,
    StoreSubscribeModule,
    StoreSocialLinkModule,
    DistrictModule,
    RegionModule,
    FavouritesModule,
    SocialLinkModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
