import { PartialType } from '@nestjs/swagger';
import { CreateRewiewDto } from './create-rewiew.dto';

export class UpdateRewiewDto extends PartialType(CreateRewiewDto) {}
