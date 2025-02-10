import { Injectable } from '@nestjs/common';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Photo } from './models/photo.model';

@Injectable()
export class PhotoService {
  constructor(@InjectModel(Photo) private readonly photoModel: typeof Photo) {}

  create(createPhotoDto: CreatePhotoDto) {
    return this.photoModel.create(createPhotoDto);
  }

  findAll() {
    return this.photoModel.findAll();
  }

  findOne(id: number) {
    return this.photoModel.findByPk(id);
  }

  // async update(id: number, updatePhotoDto: UpdatePhotoDto) {
  //   const updated = await this.photoModel.update(updatePhotoDto, {
  //     where: { id },
  //     returning: true,
  //   });
  //   return updated[1][0];
  // }

  remove(id: number) {
    return this.photoModel.destroy({ where: { id } });
  }
}
