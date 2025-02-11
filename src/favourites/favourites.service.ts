import { Injectable } from '@nestjs/common';
import { CreateFavouriteDto } from './dto/create-favourite.dto';
import { UpdateFavouriteDto } from './dto/update-favourite.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Favourite } from './models/favourite.model';

@Injectable()
export class FavouritesService {
  constructor(@InjectModel(Favourite) private favouriteModel: typeof Favourite) {}

  create(createFavouriteDto: CreateFavouriteDto) {
     return this.favouriteModel.create(createFavouriteDto);
  }

  findAll() {
     return this.favouriteModel.findAll({include:{all:true}});
  }

  findOne(id: number) {
    return this.favouriteModel.findByPk(id);
  }

    async update(id: number, updateFavouriteDto: UpdateFavouriteDto) {
    const updated = await this.favouriteModel.update(updateFavouriteDto, {
      where: { id },
      returning:true
    });
    return updated[1][0];
  }

  remove(id: number) {
    return this.favouriteModel.destroy({where:{id}})
  }
}
