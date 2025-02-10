import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RewiewsService } from './rewiews.service';
import { CreateRewiewDto } from './dto/create-rewiew.dto';
import { UpdateRewiewDto } from './dto/update-rewiew.dto';

@Controller('rewiews')
export class RewiewsController {
  constructor(private readonly rewiewsService: RewiewsService) {}

  @Post()
  create(@Body() createRewiewDto: CreateRewiewDto) {
    return this.rewiewsService.create(createRewiewDto);
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
