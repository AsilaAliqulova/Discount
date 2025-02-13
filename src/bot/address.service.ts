import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Bot } from "./models/bot.model";
import { InjectBot } from "nestjs-telegraf";
import { BOT_NAME } from "../app.constants";
import { Context, Telegraf, Markup } from "telegraf";
import { Address } from "./models/address.model";

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(Bot) private readonly botModel: typeof Bot,
    @InjectModel(Address) private readonly addressModel: typeof Address,
    @InjectBot(BOT_NAME) private readonly bot: Telegraf<Context>
  ) {}

  async onAddress(ctx: Context) {
    try {
      await ctx.reply(`📍 Foydalanuvchi manzillari`, {
        parse_mode: "HTML",
        ...Markup.keyboard([
          ["Mening manzillarim", "Yangi manzil qo'shish"],
        ]).resize(),
      });
    } catch (error) {
      console.log("onAddress error:", error);
    }
  }

  async onCommanNewAddress(ctx: Context) {
    try {
      const userId = ctx.from?.id;
      const user = await this.botModel.findByPk(userId);

      if (!user || !user.status) {
        await ctx.reply(`Siz avval ro'yhatdan o'tishingiz kerak`, {
          parse_mode: "HTML",
          ...Markup.keyboard([["/start"]]).resize(),
        });
      } else {
        await this.addressModel.create({ userId, last_state: "name" });
        await ctx.reply(
          `Yangi manzilingiz nomini kiriting (masalan,<i>uyim</i>)`,
          {
            parse_mode: "HTML",
            ...Markup.removeKeyboard(),
          }
        );
      }
    } catch (error) {
      console.log("onCommanNewAddress error:", error);
    }
  }

  async onCommanMyAddress(ctx: Context) {
    try {
      const userId = ctx.from?.id;
      const user = await this.botModel.findByPk(userId);

      if (!user || !user.status) {
        await ctx.reply(`Siz avval ro'yhatdan o'tishingiz kerak`, {
          parse_mode: "HTML",
          ...Markup.keyboard([["/start"]]).resize(),
        });
      } else {
        const addresses = await this.addressModel.findAll({
          where: { userId, last_state: "finish" },
        });

        addresses.forEach(async (address) => {
          await ctx.replyWithHTML(
            `<b>Manzil nomi:</b> ${address.name}\n<b>Manzil:</b> ${address.address}`,
            {
              reply_markup: {
                inline_keyboard: [
                  [
                    {
                      text: "Lokatsiyani ko'rish",
                      callback_data: `loc_${address.id}`,
                    },
                    {
                      text: "Manzilni o'chirish",
                      callback_data: `del_${address.id}`,
                    },
                  ],
                ],
              },
            }
          );
        });
      }
    } catch (error) {
      console.log("onCommanMyAddress error:", error);
    }
  }

  async onClickLocation(ctx: Context) {
    try {
      const contextAction = ctx.callbackQuery!["data"];
      const address_id = contextAction.split("_")[1];
      const address = await this.addressModel.findByPk(address_id);
      //tekshir lokatsiyani
      await ctx.replyWithLocation(
        Number(address?.location?.split(",")[0]),
        Number(address?.location?.split(",")[1])
      );
    } catch (error) {
      console.log("onAddress err", error);
    }
  }

  async onDeleteLocation(ctx: Context) {
    try {
      
      const contextAction = ctx.callbackQuery!["data"];
      const address_id = contextAction.split("_")[1];
      const address = await this.addressModel.findByPk(address_id);
      console.log("Address location:", address?.location);

      if (!address || !address.location) {
        return ctx.reply("Manzil topilmadi yoki noto'g'ri formatda.");
      }

      const [latitude, longitude] = address.location.split(",").map(Number);
      await ctx.replyWithLocation(latitude, longitude);
      await address.update({ location: "null" });
      await ctx.reply(
        `📍 Lokatsiya o'chirildi: ${address.name || "Noma'lum manzil"}`
      );
    } catch (error) {
      console.log("onDeleteLocation err", error);
    }
  }

  async sendOtp(
    phone_number: string,
    OTP: string
  ): Promise<boolean | undefined> {
    try {
      const user = await this.botModel.findOne({ where: { phone_number } });
      if (!user || !user.status) {
        return false;
      }
      await this.bot.telegram.sendMessage(
        user.userId!,
        `Verification OTP cod:${OTP}`
      );
      return true;
    } catch (error) {
      console.log("sendOtp", error);
    }
  }
}
