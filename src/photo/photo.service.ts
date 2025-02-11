import { Injectable } from '@nestjs/common';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Photo } from './models/photo.model';
import { FileService } from '../file/file.service';

@Injectable()
export class PhotoService {
  constructor(@InjectModel(Photo) private readonly photoModel: typeof Photo,private readonly fileService: FileService) {}

 async create(createPhotoDto: CreatePhotoDto,photo:any) {
   const fileName = await this.fileService.saveFile(photo)
    return this.photoModel.create({...createPhotoDto, photo: fileName });
  }

  findAll() {
    return this.photoModel.findAll({include:{all:true}});
  }

  findOne(id: number) {
    return this.photoModel.findByPk(id);
  }

  async update(id: number, updatePhotoDto: UpdatePhotoDto) {
    const updated = await this.photoModel.update(updatePhotoDto, {
      where: { id },
      returning: true,
    });
    return updated[1][0];
  }

  remove(id: number) {
    return this.photoModel.destroy({ where: { id } });
  }
}
