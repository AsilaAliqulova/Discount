import {
  Action,
  Command,
  Ctx,
  Hears,
  On,
  Start,
  Update,
} from "nestjs-telegraf";
import { Context } from "telegraf";
import { AddressService } from "./address.service";

@Update()
export class AddressUpdate {
  constructor(private readonly addressService: AddressService) {}

  @Hears("Mening manzillarim")
  async onCommanMyAddress(@Ctx() ctx: Context) {
    await this.addressService.onCommanMyAddress(ctx);
  }
  @Hears("Yangi manzil qo'shish")
  async onCommanNewAddress(@Ctx() ctx: Context) {
    await this.addressService.onCommanNewAddress(ctx);
  }

  @Command("address")
  async onAddress(@Ctx() ctx: Context) {
    await this.addressService.onAddress(ctx);
  }

  @Action(/loc_+\d+/)
  async onClickLocation(@Ctx() ctx: Context) {
    await this.addressService.onClickLocation(ctx);
  }
  @Action(/del_+\d+/)
  async onDeleteLocation(@Ctx() ctx: Context) {
    await this.addressService.onDeleteLocation(ctx);
  }
}
