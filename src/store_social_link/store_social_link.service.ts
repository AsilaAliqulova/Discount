import { Injectable } from '@nestjs/common';
import { CreateStoreSocialLinkDto } from './dto/create-store_social_link.dto';
import { UpdateStoreSocialLinkDto } from './dto/update-store_social_link.dto';
import { InjectModel } from '@nestjs/sequelize';
import { StoreSocialLink } from './models/store_social_link.model';

@Injectable()
export class StoreSocialLinkService {
  constructor(
    @InjectModel(StoreSocialLink)
    private readonly storeSocialLinkModel: typeof StoreSocialLink
  ) {}

  create(createStoreSocialLinkDto: CreateStoreSocialLinkDto) {
    return this.storeSocialLinkModel.create(createStoreSocialLinkDto);
  }

  findAll() {
    return this.storeSocialLinkModel.findAll({include:{all:true}});
  }

  findOne(id: number) {
    return this.storeSocialLinkModel.findByPk(id);
  }

  async update(id: number, updateStoreLInkDto: UpdateStoreSocialLinkDto) {
    const updated = await this.storeSocialLinkModel.update(updateStoreLInkDto, {
      where: { id },
      returning: true,
    });
    return updated[1][0];
  }

  remove(id: number) {
    return this.storeSocialLinkModel.destroy({ where: { id } });
  }
}
