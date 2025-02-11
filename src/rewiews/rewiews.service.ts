import { Injectable } from '@nestjs/common';
import { CreateRewiewDto } from './dto/create-rewiew.dto';
import { UpdateRewiewDto } from './dto/update-rewiew.dto';
import { InjectModel } from '@nestjs/sequelize';
import { FileService } from '../file/file.service';
import { Rewiew } from './models/rewiew.model';

@Injectable()
export class RewiewsService {
  constructor(
    @InjectModel(Rewiew) private readonly rewiewModel: typeof Rewiew,
    private readonly fileService: FileService
  ) {}
  async create(createRewiewDto: CreateRewiewDto, photo: any) {
    const fileName = await this.fileService.saveFile(photo);
    return this.rewiewModel.create({ ...createRewiewDto, photo: fileName });
  }

  findAll() {
    return this.rewiewModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.rewiewModel.findByPk(id);
  }

  async update(id: number, updateRewiewDto: UpdateRewiewDto, photo?: any) {
    if (photo) {
      const fileName = await this.fileService.saveFile(photo);
      updateRewiewDto.photo = fileName;
    }
    const updated = await this.rewiewModel.update(updateRewiewDto, {
      where: { id },
      returning: true,
    });
    return updated[1][0];
  }

  remove(id: number) {
    return this.rewiewModel.destroy({ where: { id } });
  }
}
