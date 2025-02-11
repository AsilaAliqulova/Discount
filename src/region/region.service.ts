import { Injectable } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Region } from './models/region.model';

@Injectable()
export class RegionService {
  constructor(@InjectModel(Region) private regionModel: typeof Region,

) {}
  async create(createRegionDto: CreateRegionDto) {
    
    return this.regionModel.create(createRegionDto);
  }

  findAll() {
    return this.regionModel.findAll({include:{all:true}});
  }

  findOne(id: number) {
    return this.regionModel.findByPk(id);
  }

  async update(id: number, updateRegionDto: UpdateRegionDto) {
    const updated = await this.regionModel.update(updateRegionDto, {
      where: { id },
      returning: true,
    });
    return updated[1][0];
  }

  remove(id: number) {
    return this.regionModel.destroy({ where: { id } });
  }
}
