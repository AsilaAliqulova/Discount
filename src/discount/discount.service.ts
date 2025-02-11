import { Injectable } from '@nestjs/common';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Discount } from './models/discount.model';

@Injectable()
export class DiscountService {
  constructor(
    @InjectModel(Discount) private readonly discountModel: typeof Discount
  ) {}

  create(createDiscountDto: CreateDiscountDto) {
    return this.discountModel.create(createDiscountDto);
  }

  findAll() {
    return this.discountModel.findAll({include:{all:true}});
  }

  findOne(id: number) {
    return this.discountModel.findByPk(id);
  }

  async update(id: number, updateDiscountDto: UpdateDiscountDto) {
    const updated = await this.discountModel.update(updateDiscountDto, {
      where: { id },
      returning: true,
    });
    return updated[1][0];
  }

  remove(id: number) {
    return this.discountModel.destroy({ where: { id } });
  }
}
