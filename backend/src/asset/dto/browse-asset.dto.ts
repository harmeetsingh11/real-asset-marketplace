import { IsOptional, IsString } from 'class-validator';

export class BrowseAssetsDto {
  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  priceRange?: string;
}
