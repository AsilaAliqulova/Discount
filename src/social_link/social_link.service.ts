import { Injectable } from '@nestjs/common';
import { CreateSocialLinkDto } from './dto/create-social_link.dto';
import { UpdateSocialLinkDto } from './dto/update-social_link.dto';
import { InjectModel } from '@nestjs/sequelize';
import { SocialLink } from './models/social_link.model';

@Injectable()
export class SocialLinkService {
   constructor(
    @InjectModel(SocialLink) private readonly socialLinkModel: typeof SocialLink
  ) {}
  create(createSocialLinkDto: CreateSocialLinkDto) {
    return this.socialLinkModel.create(createSocialLinkDto)
  }

  findAll() {
    return this.socialLinkModel.findAll()
  }

  findOne(id: number) {
    return this.socialLinkModel.findByPk(id)
  }

    async update(id: number, updateSocilLinkItemDto: UpdateSocialLinkDto) {
    const updated = await this.socialLinkModel.update(updateSocilLinkItemDto, {
      where: { id },
      returning: true,
    });
    return updated[1][0];
  }

  remove(id: number) {
    return this.socialLinkModel.destroy({ where: { id } });
  }
}
