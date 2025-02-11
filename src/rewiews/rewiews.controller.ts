import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { RewiewsService } from './rewiews.service';
import { CreateRewiewDto } from './dto/create-rewiew.dto';
import { UpdateRewiewDto } from './dto/update-rewiew.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('rewiews')
export class RewiewsController {
  constructor(private readonly rewiewsService: RewiewsService) {}

  @Post()
   @UseInterceptors(FileInterceptor("photo"))
  create(@Body() createRewiewDto: CreateRewiewDto,@UploadedFile() photo:any) {
    return this.rewiewsService.create(createRewiewDto,photo);
  }

  @Get()
  findAll() {
    return this.rewiewsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rewiewsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRewiewDto: UpdateRewiewDto) {
    return this.rewiewsService.update(+id, updateRewiewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rewiewsService.remove(+id);
  }
}
