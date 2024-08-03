import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CheckoutCartDto {
  @ApiProperty()
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsNumber()
  cartId: number;
}
