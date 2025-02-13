import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  ServiceUnavailableException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import * as uuid from "uuid";
import { MailService } from "../mail/mail.service";
import { FindUserDto } from "./dto/find-user.dto";
import { Op } from "sequelize";
import { BotService } from "../bot/bot.service";
import * as otpGenerator from "otp-generator";
import { PhoneUserDto } from "./dto/phone-user.dto";
import { Otp } from "../otp/models/otp.model";
import { AddMinutesToDate } from "../helpers/addMinutes";
import { decode, encode } from "../helpers/crypto";
import { VerifiOtpDto } from "./dto/verify-otp.dto";
import { SmsService } from "../sms/sms.service";
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    @InjectModel(Otp) private readonly otpModel: typeof Otp,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly botService: BotService,
    private readonly smsService: SmsService
  ) {}

  async getTokens(user: User) {
    const payload = {
      id: user.id,
      is_active: user.is_active,
      is_owner: user.is_owner,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accessToken,
      resfresh_token: refreshToken,
    };
  }

  async create(createUserDto: CreateUserDto) {
    if (createUserDto.password !== createUserDto.confirm_password) {
      throw new BadRequestException("Parollar mos emas");
    }
    const hashed_password = bcrypt.hashSync(createUserDto.password, 10);
    const activation_link = uuid.v4();
    const newUser = await this.userModel.create({
      ...createUserDto,
      hashed_password,
      activation_link,
    });

    try {
      await this.mailService.sendMail(newUser);
    } catch (error) {
      throw new InternalServerErrorException("Xat yuborishda xatolik");
    }

    return newUser;
  }

  async activate(link: string) {
    if (!link) {
      throw new BadRequestException("activation link not found");
    }
    const updateUser = await this.userModel.update(
      { is_active: true },
      {
        where: {
          activation_link: link,
          is_active: false,
        },
        returning: true,
      }
    );
    if (!updateUser) {
      throw new BadRequestException("User already activated");
    }
    const response = {
      message: "User activated successfully",
      user: updateUser[1][0].is_active,
    };
    return response;
  }

  async updateRefreshToken(id: number, hashed_refresh_token: string | null) {
    const updateUser = await this.userModel.update(
      { hashed_refresh_token },
      { where: { id } }
    );
    return updateUser;
  }

  findAll() {
    return this.userModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.userModel.findByPk(id);
  }

  findUserByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({
      where: { email },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await user.update(updateUserDto);
    return user;
  }

  remove(id: number) {
    return this.userModel.destroy({ where: { id } });
  }

  async findUser(findUserDto: FindUserDto) {
    const { name, email, phone } = findUserDto;
    const where = {};
    if (name) {
      where["name"] = {
        [Op.iLike]: `%${name}%`,
      };
    }

    if (email) {
      where["email"] = {
        [Op.iLike]: `%${email}%`,
      };
    }

    if (phone) {
      where["phone"] = {
        [Op.iLike]: `%${phone}%`,
      };
    }

    console.log(where);

    const users = await this.userModel.findAll({ where });
    if (!users) {
      throw new NotFoundException("User not found");
    }

    return users;
  }

  async newOtp(phoneUserDto: PhoneUserDto) {
    const phone_number = phoneUserDto.phone;

    const otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    // --------------------------BOT--------------------------------------
    const isSend = await this.botService.sendOtp(phone_number, otp);
    if (!isSend) {
      throw new BadRequestException("avval ro'yhatdan o'ting");
    }
    //-------------------------SMS---------------------------------------

    const response = await this.smsService.sendSMS(phone_number, otp);

    if (response.status !== 200) {
      throw new ServiceUnavailableException("Otp yuborishda hatolik");
    }

    const message =
      `OTP code has been send to ****` +
      phone_number.slice(phone_number.length - 4);

    const now = new Date();
    const expiration_time = AddMinutesToDate(now, 5);
    await this.otpModel.destroy({ where: { phone_number } });

    const newOtpData = await this.otpModel.create({
      id: uuid.v4(),
      otp,
      phone_number,
      expiration_time,
    });

    const details = {
      timestamp: now,
      phone_number,
      otp_id: newOtpData.id,
    };
    const encodedData = await encode(JSON.stringify(details));
    return {
      message: "Otp botga yuborildi",
      messageSMS: message,
      verification_key: encodedData,
    };
  }

  async verifyOtp(verifyOtpDto: VerifiOtpDto) {
    const { verification_key, phone: phone_number, otp } = verifyOtpDto;

    const currentDate = new Date();
    const decodedData = await decode(verification_key);
    const details = JSON.parse(decodedData);
    if (details.phone_number != phone_number) {
      throw new BadRequestException("Otp bu telifon raqamiga yuborilmagan");
    }
    const resultOtp = await this.otpModel.findByPk(details.otp_id);

    if (resultOtp == null) {
      throw new BadRequestException("Bunday otp yo'q");
    }

    if (resultOtp.verified) {
      throw new BadRequestException("Bu otp avval foydalanilgan");
    }

    if (resultOtp.expiration_time < currentDate) {
      throw new BadRequestException("Bu otp vaqti tugagan");
    }
    if (resultOtp.otp != otp) {
      throw new BadRequestException("Otplar mos emas");
    }

    const user = await this.userModel.update(
      { is_owner: true },
      {
        where: { phone: phone_number },
        returning: true,
      }
    );
    if (!user[1][0]) {
      throw new BadRequestException("Bunday foydalanuvchi mavjud emas");
    }

    await this.otpModel.update(
      { verified: true },
      { where: { id: details.otp_id } }
    );

    return {
      message: "Tabriklayman siz owner boldiz",
    };
  }

  async getTokinSms() {
    try {
      const newToken = await this.smsService.refreshToken();
      console.log("New SMS Token:", newToken);

      const filePath = path.join(__dirname, "..", "..", "tokens.json");
      fs.writeFileSync(
        filePath,
        JSON.stringify({ token: newToken }, null, 2)
      );
    } catch (error) {
      console.error("Failed to refresh token:", error);
    }
  }
}
