import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Photo } from './models/photo.model';
import { FileModule } from '../file/file.module';

@Module({
  imports:[SequelizeModule.forFeature([Photo]),FileModule],
  controllers: [PhotoController],
  providers: [PhotoService],
})
export class PhotoModule {}
