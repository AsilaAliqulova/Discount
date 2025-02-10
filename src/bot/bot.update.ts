
import { Ctx, Start, Update } from 'nestjs-telegraf';
import { Context } from 'vm';

@Update()
export class BotUpdate {
  @Start()
  async onStart(@Ctx() ctx:Context){
    ctx.reply("salom😄");
  }
}
