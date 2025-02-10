import { forwardRef, Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "../users/users.module";
import { AdminModule } from "../admin/admin.module";

@Module({
  imports: [
    forwardRef(() => UsersModule), AdminModule,
    JwtModule.register({
      global: true,
      secret: "MySecterKey",
      signOptions: { expiresIn: "15h" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
