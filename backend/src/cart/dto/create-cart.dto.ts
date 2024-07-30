import { IsNumber } from 'class-validator';

export class CreateCartItemDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  assetId: number;
}
