import { IsNumber } from 'class-validator';

export class CheckoutCartDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  cartId: number;
}
