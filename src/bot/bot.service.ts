import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Bot } from "./models/bot.model";
import { InjectBot } from "nestjs-telegraf";
import { BOT_NAME } from "../app.constants";
import { Context, Telegraf, Markup } from "telegraf";
import { Address } from "./models/address.model";

@Injectable()
export class BotService {
  constructor(
    @InjectModel(Bot) private readonly botModel: typeof Bot,
    @InjectModel(Address) private readonly addressModel: typeof Address,
    @InjectBot(BOT_NAME) private readonly bot: Telegraf<Context>
  ) {}

  async start(ctx: Context) {
    const userId = ctx.from?.id;
    const user = await this.botModel.findByPk(userId);

    if (!user) {
      await this.botModel.create({
        userId,
        username: ctx.from?.username,
        first_name: ctx.from?.first_name,
        last_name: ctx.from?.last_name,
        lang: ctx.from?.language_code,
      });
      await ctx.reply(
        `Iltimos,<b>📞Telefon raqamni yuborish</b> tugmasini bosing`,
        {
          parse_mode: "HTML",
          ...Markup.keyboard([
            [Markup.button.contactRequest("📞Telefon raqamni yuborish")],
          ])
            .resize()
            .oneTime(),
        }
      );
    } else if (!user.status) {
      await ctx.reply(
        `Iltimos,<b>📞Telefon raqamni yuborish</b> tugmasini bosing`,
        {
          parse_mode: "HTML",
          ...Markup.keyboard([
            [Markup.button.contactRequest("📞Telefon raqamni yuborish")],
          ])
            .resize()
            .oneTime(),
        }
      );
    } else {
      await this.bot.telegram.sendChatAction(userId!, "typing");
      await ctx.reply(
        `Ushbu bot orqali skidkachi foydalanuvchilarini foallashtirish uchun ishlatiladi`,
        {
          parse_mode: "HTML",
          ...Markup.removeKeyboard(),
        }
      );
    }
  }

  async OnContact(ctx: Context) {
    if ("contact" in ctx.message!) {
      const userId = ctx.from?.id;
      const user = await this.botModel.findByPk(userId);
      if (!user) {
        await ctx.reply(`Iltimos,<b>Start</b> tugmasini bosing`, {
          parse_mode: "HTML",
          ...Markup.keyboard([["/start"]])
            .resize()
            .oneTime(),
        });
      } else if (ctx.message!.contact.user_id !== userId) {
        await ctx.reply(`Iltimos, o'zingizning raqamingizni yuboring`, {
          parse_mode: "HTML",
          ...Markup.keyboard([
            [Markup.button.contactRequest("Telefon raqamni yuborish")],
          ])
            .resize()
            .oneTime(),
        });
      } else {
        let phone = ctx.message.contact.phone_number;
        if (phone[0] != "+") {
          phone = "+" + phone;
        }
        user.phone_number = phone;
        user.status = true;
        await user.save();

        await ctx.reply(`Tabriklayman sizning accauntingiz faollashtirildi`, {
          parse_mode: "HTML",
          ...Markup.removeKeyboard(),
        });
      }
    }
  }

  async onStop(ctx: Context) {
    try {
      const userId = ctx.from?.id;
      const user = await this.botModel.findByPk(userId);

      if (user && user.status) {
        user.status = false;
        user.phone_number = "";
        await user.save();

        await ctx.reply(`Sizni yana kutub qolamiz`, {
          parse_mode: "HTML",
          ...Markup.removeKeyboard(),
        });
      }
    } catch (error) {
      console.log("onStop error:", error);
    }
  }

  async onLocation(ctx: Context) {
    try {
      if ("location" in ctx.message!) {
        const userId = ctx.from?.id;
        const user = await this.botModel.findByPk(userId);

        if (!user || !user.status) {
          await ctx.reply(`Siz avval ro'yhatdan o'ting`, {
            parse_mode: "HTML",
            ...Markup.keyboard([["/start"]]).resize(),
          });
        } else {
          const address = await this.addressModel.findOne({
            where: { userId },
            order: [["id", "DESC"]],
          });

          if (address && address.last_state == "location") {
            address.location = `${ctx.message.location.latitude},${ctx.message.location.longitude}`;
            address.last_state = "finish";
            await address.save();
            await ctx.reply("Manzil saqlandi",{
              parse_mode:"HTML",
              ...Markup.keyboard([["Mening manzillarim","Yangi manzil qo'shish"]]).resize()
            })
          }
        }
      }
    } catch (error) {
      console.log("onLocation error:", error);
    }
  }

  async onText(ctx: Context) {
    try {
      if ("text" in ctx.message!) {
        const userId = ctx.from?.id;
        const user = await this.botModel.findByPk(userId);

        if (!user || !user.status) {
          await ctx.reply(`Siz avval ro'yhatdan o'ting`, {
            parse_mode: "HTML",
            ...Markup.keyboard([["/start"]]).resize(),
          });
        } else {
          const address = await this.addressModel.findOne({
            where: { userId },
            order: [["id", "DESC"]],
          });
          if (address && address.last_state !== "finish") {
            if (address.last_state == "name") {
              address.name = ctx.message.text;
              address.last_state = "address";
              await address.save();
              await ctx.reply("Manzilingizni kiriting:", {
                parse_mode: "HTML",
                ...Markup.removeKeyboard(),
              });
            } else if (address.last_state == "address") {
              address.address = ctx.message.text;
              address.last_state = "location";
              await address.save();
              await ctx.reply("Manzilingizni locatsiyasini yuboring:", {
                parse_mode: "HTML",
                ...Markup.keyboard([
                  [Markup.button.locationRequest(`📍 Lokatsiyani  yuboring`)],
                ]).resize(),
              });
            }
          }
        }
      }
    } catch (error) {
      console.log("onText error:", error);
    }
  }

  async deleteUnCatchMessage(ctx: Context) {
    try {
      const contextmessage = ctx.message!.message_id;
      await ctx.deleteMessage(contextmessage);
    } catch (error) {
      console.log("deleteUnCatchMessage", error);
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
        `Verifcation OTP code:${OTP}`
      );
      return true;
    } catch (error) {
      console.log("senOTPda error", error);
    }
  }
}
