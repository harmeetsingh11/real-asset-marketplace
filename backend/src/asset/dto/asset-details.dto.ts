import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class AssetDetailsDto {
  @ApiProperty()
  @IsNumber()
  assetId: number;
}
