import { Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Store } from './models/store.models';

@Injectable()
export class StoreService {
  constructor(
    @InjectModel(Store)
    private readonly storeModel: typeof Store
  ) {}

  create(createStoreDto: CreateStoreDto) {
    return this.storeModel.create(createStoreDto);
  }

  findAll() {
    return this.storeModel.findAll({include:{all:true}});
  }

  findOne(id: number) {
    return this.storeModel.findByPk(id);
  }

  async update(id: number, updateStoreDto: UpdateStoreDto) {
    const updated = await this.storeModel.update(updateStoreDto, {
      where: { id },
      returning: true,
    });
    return updated[1][0];
  }

  remove(id: number) {
    return this.storeModel.destroy({ where: { id } });
  }
}
