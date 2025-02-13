import {
  Command,
  Ctx,
  On,
  Start,
  Update,
} from "nestjs-telegraf";
import { Context } from "telegraf";
import { BotService } from "./bot.service";

@Update()
export class BotUpdate {
  constructor(private readonly botService: BotService) {}
  @Start()
  async onStart(@Ctx() ctx: Context) {
    await this.botService.start(ctx);
  }

  @On("contact")
  async onContact(@Ctx() ctx: Context) {
    await this.botService.OnContact(ctx);
  }
  @Command("stop")
  async onStop(@Ctx() ctx: Context) {
    await this.botService.onStop(ctx);
  }

  @On("location")
  async onLocation(@Ctx() ctx: Context) {
    await this.botService.onLocation(ctx)
  
  }

  // @On("message")
  // async deleteUnCatchMessage(@Ctx() ctx: Context) {
  //   await this.botService.deleteUnCatchMessage(ctx);
  // }

  @On("text")
  async onText(@Ctx() ctx: Context) {
    await this.botService.onText(ctx);
  }

  @On("message")
  async onMessage(@Ctx() ctx: Context) {
    console.log("Ushlanmagan message");
  }

  // @On("message")
  // async onMessage(@Ctx() ctx: Context) {
  //   console.log(ctx.botInfo);
  // }

  // @On("photo")
  // async onPhoto(@Ctx() ctx: Context) {
  //   if ("photo" in ctx.message!) {
  //     console.log(ctx.message.photo);
  //     await ctx.replyWithPhoto(
  //       String(ctx.message.photo[ctx.message.photo.length - 1].file_id)
  //     );
  //   }
  // }

  // @On("video")
  // async onVideo(@Ctx() ctx: Context) {
  //   if ("photo" in ctx.message!) {
  //     console.log(ctx.message!.video);
  //     await ctx.replyWithPhoto(
  //       String(ctx.message.photo[ctx.message.photo.length - 1].file_id)
  //     );
  //   }
  // }

  // @On("sticker")
  // async onStekit(@Ctx() ctx: Context) {
  //   if ("photo" in ctx.message!) {
  //     console.log(ctx.message.sticker);
  //     await ctx.replyWithPhoto(
  //       String()
  //     );
  //   }
  // }

  // @On("animation")
  // async onAnimation(@Ctx() ctx: Context) {
  //   if ("animation" in ctx.message!) {
  //     console.log(ctx.message.animation);
  //     await ctx.replyWithPhoto(String(ctx.message.animation.duration));
  //   }
  // }

  // @On("contact")
  // async onContact(@Ctx() ctx: Context) {
  //   if ("contact" in ctx.message!) {
  //     console.log(ctx.message.contact);
  //     await ctx.replyWithHTML(String(ctx.message.contact.first_name));
  //     await ctx.replyWithHTML(String(ctx.message.contact.last_name));
  //     await ctx.replyWithHTML(String(ctx.message.contact.phone_number));
  //     await ctx.replyWithHTML(String(ctx.message.contact.vcard));
  //   }
  // }

  // @On("voice")
  // async onVoice(@Ctx() ctx: Context) {
  //   if ("voice" in ctx.message!) {
  //     console.log(ctx.message.voice);
  //     await ctx.replyWithHTML(String(ctx.message.voice.file_id));
  //   }
  // }

  // @On("invoice")
  // async onInVoice(@Ctx() ctx: Context) {
  //   if ("invoice" in ctx.message!) {
  //     console.log(ctx.message.invoice);
  //     await ctx.replyWithHTML(String(ctx.message.invoice));
  //   }
  // }

  // @On("document")
  // async onDocument(@Ctx() ctx: Context) {
  //   if ("invoice" in ctx.message!) {
  //     console.log(ctx.message.invoice);
  //     await ctx.replyWithHTML(String(ctx.message.invoice));
  //   }
  // }

  // @Hears("hi")
  // async onHear(@Ctx() ctx: Context) {
  //   await ctx.replyWithHTML("salom");
  // }

  // @Command("help")
  // async onHelpCommand(@Ctx() ctx: Context) {
  //   await ctx.replyWithHTML("kutubtur");
  // }

  // @Command("inline")
  // async onInlineCommand(@Ctx() ctx: Context) {
  //   const inlineKeyboart = [
  //     [
  //       { text: "tugma1", callback_data: "button_1" },
  //       { text: "tugma2", callback_data: "button_2" },
  //       { text: "tugma3", callback_data: "button_3" },
  //     ],
  //     [
  //       { text: "tugma4", callback_data: "button_4" },
  //       { text: "tugma5", callback_data: "button_5" },
  //     ],
  //     [{ text: "tugma6", callback_data: "button_6" }],
  //   ];
  //   await ctx.reply("Inline keyboard :kerakli tugmani bosing", {
  //     reply_markup: {
  //       inline_keyboard: inlineKeyboart,
  //     },
  //   });
  // }

  // @Action("button_1")
  // async onActionbutton1(@Ctx() ctx: Context) {
  //   await ctx.replyWithHTML("button 1 bosildi");
  // }

  // @Action(/^button_+[1-9]/)
  // async onActionbuttonAny(@Ctx() ctx: Context) {
  //   const actionText = ctx.callbackQuery!["data"];
  //   const buttonId = actionText.split("_")[1];
  //   console.log(actionText);
  //   await ctx.replyWithHTML(`${buttonId} tugma bosildi`);
  // }

  // @Command("main")
  // async onMain(@Ctx() ctx: Context) {
  //   await ctx.replyWithHTML(`kearli main tugma bos`, {
  //     ...Markup.keyboard([
  //       [Markup.button.contactRequest(`📞 telefon raqamingizni yuboring`)],
  //       [Markup.button.locationRequest(`📍 turgan manzilingizni yuboring`)],
  //       ["dori1", "dori2", "dori3"],
  //       ["dori4", "dori5"],
  //       ["dori6"],
  //     ]),
  //   });
  // }

  // @Hears(/^dori+\+$d/)
  // async onButtonHear(@Ctx() ctx: Context) {
  //   if ("text" in ctx.message!) {
  //     await ctx.replyWithHTML(`${ctx.message.text} dori bosildi`);
  //   }
  // }

  // @On("text")
  // async onText(@Ctx() ctx: Context) {
  //   console.log(ctx.from);
  //   console.log(ctx.chat);

  //   if ("text" in ctx.message!) {
  //     if (ctx.message.text === "salom") {
  //       await ctx.replyWithHTML("Vaalaykum alaykum ");
  //     } else {
  //       await ctx.reply(ctx.message.text);
  //     }
  //   }
  // }
}
