import { PartialType } from '@nestjs/swagger';
import { CreateTokenBlacklistDto } from './create-token-blacklist.dto';

export class UpdateTokenBlacklistDto extends PartialType(
  CreateTokenBlacklistDto,
) {}
