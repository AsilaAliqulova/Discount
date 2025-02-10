import { Injectable } from '@nestjs/common';
import { CreateRewiewDto } from './dto/create-rewiew.dto';
import { UpdateRewiewDto } from './dto/update-rewiew.dto';

@Injectable()
export class RewiewsService {
  create(createRewiewDto: CreateRewiewDto) {
    return 'This action adds a new rewiew';
  }

  findAll() {
    return `This action returns all rewiews`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rewiew`;
  }

  update(id: number, updateRewiewDto: UpdateRewiewDto) {
    return `This action updates a #${id} rewiew`;
  }

  remove(id: number) {
    return `This action removes a #${id} rewiew`;
  }
}
