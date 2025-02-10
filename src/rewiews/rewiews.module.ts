import { Module } from '@nestjs/common';
import { RewiewsService } from './rewiews.service';
import { RewiewsController } from './rewiews.controller';

@Module({
  controllers: [RewiewsController],
  providers: [RewiewsService],
})
export class RewiewsModule {}
