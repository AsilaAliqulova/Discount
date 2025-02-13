import { Injectable } from "@nestjs/common";
const FormData = require("form-data");
import axios from "axios";

@Injectable()
export class SmsService {
    
  async sendSMS(phone_number: string, otp: string) {
    const data = new FormData();
    data.append("mobile_phone", phone_number);
    data.append("message", "Bu Eskiz dan test");
    data.append("mobile_phone", phone_number);
    data.append("from", "4546");
    console.log(process.env.SMS_SERVICE_URL);

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: process.env.SMS_SERVICE_URL,
      headers: {
        Authorization: `Bearer ${process.env.SMS_TOKEN}`,
      },
      data: data,
    };

    try {
      const response = await axios(config);
      return response;
    } catch (error) {
      console.log(error);
      return { status: 500 };
    }
  }

  async getToken() {}

  async  refreshToken() {
  try {
    var config = {
      method: "patch",
      maxBodyLength: Infinity,
      url: "https://notify.eskiz.uz/api/auth/refresh",
      headers: {
        Authorization: `Bearer ${process.env.SMS_TOKEN}`, 
        "Content-Type": "application/json",
      },
    };

    const response = await axios(config);
    console.log("Token refreshed:", response.data);
     return response.data;
    
  } catch (error) {
    console.error("Error refreshing token:", error.response?.data || error.message);
  }
}
}
