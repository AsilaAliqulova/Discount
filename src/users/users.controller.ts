import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  InternalServerErrorException,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserGuard } from "../guards/user.guard";
import { FindUserDto } from "./dto/find-user.dto";
import { ApiBearerAuth } from "@nestjs/swagger";
import { PhoneUserDto } from "./dto/phone-user.dto";
import { VerifiOtpDto } from "./dto/verify-otp.dto";
import { SmsService } from "../sms/sms.service";

@Controller("users")
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly smsService: SmsService
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @HttpCode(200)
  @Post("newotp")
  newOtp(@Body() phoneUserDto: PhoneUserDto) {
    return this.usersService.newOtp(phoneUserDto);
  }

  @HttpCode(200)
  @Post("verifyotp")
  verifyOtp(@Body() verifyOtp: VerifiOtpDto) {
    return this.usersService.verifyOtp(verifyOtp);
  }

  @Get("/tokinss")
  async getTokinSms() {
  return this.usersService.getTokinSms();
  }

  @Get()
  @UseGuards(UserGuard)
  @ApiBearerAuth("authorization")
  findAll() {
    return this.usersService.findAll();
  }

  @Get("activate/:link")
  activate(@Param("link") link: string) {
    return this.usersService.activate(link);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(+id);
  }

  @Get("/email:email")
  findUserByEmail(@Body("email") email: string) {
    return this.usersService.findUserByEmail(email);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }

  @HttpCode(200)
  @Post("find-user")
  findUser(@Body() findUserDto: FindUserDto) {
    return this.usersService.findUser(findUserDto);
  }
}
