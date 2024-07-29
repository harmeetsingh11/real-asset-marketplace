import { IsNumber } from 'class-validator';

export class AssetDetailsDto {
  @IsNumber()
  assetId: number;
}
