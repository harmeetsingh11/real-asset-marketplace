import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UserProfileDto {
  @ApiProperty()
  @IsNumber()
  userId: number;
}
