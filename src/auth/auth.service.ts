import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import * as bcrypt from "bcrypt";
import { SignInDto } from "./dto/sign-in.dto";
import { UsersService } from "../users/users.service";
import { User } from "../users/models/user.model";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { Response } from "express";
import { CreateAdminDto } from "../admin/dto/create-admin.dto";
import { AdminService } from "../admin/admin.service";
import { SignInDtoAdmin } from "./dto/sign-in-admin.dto";
import { Admin } from "../admin/models/admin.model";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtServise: JwtService,

    private readonly userService: UsersService,
    private readonly adminService: AdminService
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    const candidate = await this.userService.findUserByEmail(
      createUserDto.email
    );

    if (candidate) {
      throw new BadRequestException("bunday foydalanuvchi mavjud");
    }

    const newUser = await this.userService.create(createUserDto);
    const response = {
      message: "Tabriklayman tizimga qo'shildiz.",
      userId: newUser.id,
    };

    return response;
  }

  async getTokens(user: User) {
    const payload = {
      id: user.id,
      is_active: user.is_active,
      is_owner: user.is_owner,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtServise.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtServise.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accessToken,
      resfresh_token: refreshToken,
    };
  }

  async getTokensAdmin(admin: Admin) {
    const payload = {
      id: admin.id,
      name:admin.name ,
      is_creator:admin.is_creator
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtServise.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtServise.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accessToken,
      resfresh_token: refreshToken,
    };
  }

  async signIn(signInDto: SignInDto, res: Response) {
    const { email, password } = signInDto;
    const user = await this.userService.findUserByEmail(signInDto.email);
    if (!user) {
      throw new UnauthorizedException("email yoki password noto'g'ri");
    }

    if (!user.is_active) {
      throw new BadRequestException("User is not activate");
    }

    const isMatchPass = await bcrypt.compare(password, user.hashed_password);
    if (!isMatchPass) {
      throw new BadRequestException("password do not match");
    }
    const tokens = await this.getTokens(user);
    const hashed_refresh_token = await bcrypt.hash(tokens.resfresh_token, 7);
    const updateUser = await this.userService.updateRefreshToken(
      user.id,
      hashed_refresh_token
    );
    if (!updateUser) {
      throw new InternalServerErrorException("Token saqlashda xatolik");
    }

    res.cookie("refresh_token", tokens.resfresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const response = {
      message: "User logged in",
      userId: user.id,
      access_token: tokens.access_token,
    };
    return response;
  }

  async signOut(refreshToken: string, res: Response) {
    const userData = await this.jwtServise.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!userData) {
      throw new ForbiddenException("User not verified");
    }
    const hashed_refresh_token = null;
    await this.userService.updateRefreshToken(
      userData.id,
      hashed_refresh_token
    );

    res.clearCookie("refresh_token");
    const response = {
      message: "User logged out successfully",
    };
    return response;
  }

  async refreshToken(userId: number, refreshToken: string, res: Response) {
    const decodedToken = await this.jwtServise.decode(refreshToken);

    if (userId != decodedToken["id"]) {
      throw new BadRequestException("Ruxsat etilmagan1");
    }
    const user = await this.userService.findOne(userId);

    if (!user || !user.hashed_refresh_token) {
      throw new BadRequestException("Ruxsat etilmagan2");
    }

    const tokenMatch = await bcrypt.compare(
      refreshToken,
      user.hashed_refresh_token
    );

    if (!tokenMatch) {
      throw new ForbiddenException("Forbidden");
    }

    const tokens = await this.getTokens(user);

    const hashed_refresh_token = await bcrypt.hash(tokens.resfresh_token, 7);
    await this.userService.updateRefreshToken(user.id, hashed_refresh_token);

    res.cookie("refresh_token", tokens.resfresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const response = {
      message: "User logged in",
      userId: user.id,
      access_token: tokens.access_token,
    };
    return response;
  }

  async signUpAdmin(createAdminDto: CreateAdminDto) {
    const candidate = await this.adminService.findAdminByEmail(
      createAdminDto.email
    );

    if (candidate) {
      throw new BadRequestException("bunday foydalanuvchi mavjud");
    }

    const newAdmin = await this.adminService.createAdmin(createAdminDto);
    const response = {
      message: "Tabriklayman tizimga qo'shildiz.",
      userId: newAdmin.id,
    };

    return response;
  }

  async signInAdmin(signInDtoAdmin: SignInDtoAdmin, res: Response) {
    
    const { password } = signInDtoAdmin;
    const admin = await this.adminService.findAdminByEmail(signInDtoAdmin.email);
    if (!admin) {
      throw new UnauthorizedException("email yoki password noto'g'ri");
    }

    const isMatchPass = await bcrypt.compare(password, admin.password);
    if (!isMatchPass) {
      throw new BadRequestException("password do not match");
    }
    const tokens = await this.getTokensAdmin(admin);
    const hashed_refresh_token = await bcrypt.hash(tokens.resfresh_token, 7);
    const updateAdmin = await this.adminService.updateRefreshToken(
      admin.id,
      hashed_refresh_token
    );
    if (!updateAdmin) {
      throw new InternalServerErrorException("Token saqlashda xatolik");
    }

    res.cookie("refresh_token", tokens.resfresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const response = {
      message: "Admin logged in",
      userId: admin.id,
      access_token: tokens.access_token,
    };
    return response;
  }
}
