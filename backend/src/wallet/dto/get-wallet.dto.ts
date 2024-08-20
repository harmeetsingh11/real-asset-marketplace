import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class WalletByUserDto {
  @ApiProperty()
  @IsInt()
  userId: number;
}
