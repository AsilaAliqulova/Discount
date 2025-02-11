import { Module } from '@nestjs/common';
import { StoreSocialLinkService } from './store_social_link.service';
import { StoreSocialLinkController } from './store_social_link.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { StoreSocialLink } from './models/store_social_link.model';

@Module({
  imports:[SequelizeModule.forFeature([StoreSocialLink])],
  controllers: [StoreSocialLinkController],
  providers: [StoreSocialLinkService],
})
export class StoreSocialLinkModule {}
