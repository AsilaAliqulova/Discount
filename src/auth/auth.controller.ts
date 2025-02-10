import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/sign-in.dto";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Response } from "express";
import { CookieGetter } from "../decorators/cookie_getter.decorator";
import { SignInDtoAdmin } from "./dto/sign-in-admin.dto";
import { CreateAdminDto } from "../admin/dto/create-admin.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: "Yangi foydalanuvchi ro'yhatdan o'tqazish" })
  @ApiResponse({
    status: 201,
    description: "Ro'yhatdan o'tgan foydalanuvchi",
    type: String,
  })
  @Post("signup")
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @ApiOperation({ summary: "Tizimga kirish" })
  @HttpCode(HttpStatus.OK)
  @Post("signIn")
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signIn(signInDto, res);
  }

  @HttpCode(200)
  @Post("signout")
  async signOut(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signOut(refreshToken, res);
  }

  @HttpCode(200)
  @Post(":id/refresh")
  refresh(
    @Param("id") id: number,
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshToken(id, refreshToken, res);
  }

  @ApiOperation({ summary: "Tizimga kirish" })
  @HttpCode(HttpStatus.OK)
  @Post("signIn-admin")
  async signInAdmin(
    @Body() signInDto: SignInDtoAdmin,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signInAdmin(signInDto, res);
  }

  @ApiOperation({ summary: "Yangi adminni ro'yhatdan o'tqazish" })
  @ApiResponse({
    status: 201,
    description: "Ro'yhatdan o'tgan admin",
    type: String,
  })
  @Post("signup-admin")
  async signUpAdmin(@Body() createadminDto: CreateAdminDto) {
    return this.authService.signUpAdmin(createadminDto);
  }
}
