import {
  BadGatewayException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TelegrafException, TelegrafExecutionContext } from "nestjs-telegraf";
import { Observable } from "rxjs";
import { Context } from "telegraf";

@Injectable()
export class AdminGuard implements CanActivate {
  // constructor(private readonly jwtService: JwtService) {}

  // canActivate(
  //   context: ExecutionContext
  // ): boolean | Promise<boolean> | Observable<boolean> {
  //   const req = context.switchToHttp().getRequest();
  //   const authHeader = req.headers.authorization;
  //   console.log(authHeader);

  //   if (!authHeader) {
  //     throw new UnauthorizedException("Unauthorized admin");
  //   }

  //   const bearer = authHeader.split(" ")[0];
  //   const token = authHeader.split(" ")[1];
  //   console.log(token);

  //   if (bearer !== "Bearer" || !token) {
  //     throw new UnauthorizedException("Unauthorized admin");
  //   }

  //   async function verify(token: string, jwtService: JwtService) {
  //     let payload: any;
  //     try {
  //       payload = await jwtService.verify(token, {
  //         secret: process.env.ACCESS_TOKEN_KEY,
  //       });
  //     } catch (error) {
  //       console.log(error);
  //       throw new BadGatewayException(error);
  //     }

  //     if (!payload) {
  //       throw new UnauthorizedException("Unauthorized admin");
  //     }
  //     if (!payload.is_active) {
  //       throw new UnauthorizedException("Unauthorized admin");
  //     }
  //     req.admin = payload;
  //     return true;
  //   }
  //   return verify(token, this.jwtService);
  // }

  private readonly ADMIN = process.env.ADMIN

  async canActivate(context: ExecutionContext):  Promise<boolean>  {
    const ctx = TelegrafExecutionContext.create(context)
    const {from}= ctx.getContext<Context>()

    if (Number(this.ADMIN)!= from!.id) {
      throw new TelegrafException("Siz admin emassiz,Ruxsat yo'q🙅‍♂️")
    }
    return true
  }

}
