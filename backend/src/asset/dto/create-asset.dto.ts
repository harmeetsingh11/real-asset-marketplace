import { IsString, IsNumber, IsArray, ArrayNotEmpty } from 'class-validator';

export class CreateAssetDto {
  @IsNumber()
  userId: number;

  @IsString()
  assetName: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsString()
  category: string;

  @IsArray()
  @ArrayNotEmpty()
  images: string[];
}
