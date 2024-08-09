import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class AssetsByUserDto {
  @ApiProperty()
  @IsNumber()
  userId: number;
}
