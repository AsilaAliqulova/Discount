import { Module } from '@nestjs/common';
import { RewiewsService } from './rewiews.service';
import { RewiewsController } from './rewiews.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Rewiew } from './models/rewiew.model';
import { FileModule } from '../file/file.module';

@Module({
  imports:[SequelizeModule.forFeature([Rewiew]),FileModule],
  controllers: [RewiewsController],
  providers: [RewiewsService],
})
export class RewiewsModule {}
