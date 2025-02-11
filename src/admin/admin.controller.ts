import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { Admin } from "./models/admin.model";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { AdminGuard } from "../guards/admin.guard";
import { JwtCreatorGuard } from "../guards/jwt-creator.guard";
import { ApiBearerAuth } from "@nestjs/swagger";
import { JwtSelfGuard } from "../guards/jst-self.guard";

@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  async createAdmin(@Body() createAdminDto: CreateAdminDto): Promise<Admin> {
    return this.adminService.createAdmin(createAdminDto);
  }

  @Get()
  @UseGuards(AdminGuard)
  @ApiBearerAuth("authorization")
  async findAll(): Promise<Admin[]> {
    return this.adminService.findAll();
  }

  @UseGuards(JwtSelfGuard)
  @ApiBearerAuth("authorization")
  @Get(":id")
  async findById(@Param("id") id: number): Promise<Admin | null> {
    return this.adminService.findById(id);
  }
  @Patch("/update/:id")
  async updateById(
    @Param("id") id: number,
    @Body() updateLangDto: UpdateAdminDto
  ): Promise<Admin | null> {
    return this.adminService.updateById(id, updateLangDto);
  }
  @Delete("/delete/:id")
  async deleteById(@Param("id") id: number) {
    return this.adminService.deleteById(id);
  }

  @Get("/email:email")
  findAdminByEmail(@Body("email") email: string) {
    return this.adminService.findAdminByEmail(email);
  }
}
