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

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      botName:BOT_NAME,
      useFactory:()=>({
        token:process.env.BOT_TOKEN ||"1234",
        middlewares:[],
        include:[BotModule]
      })
    }),
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      username: process.env.POSTGRES_USER,
      port: Number(process.env.POSTGRES_PORT),
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Category, DiscountType, Photo, Discount,Admin],
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
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
