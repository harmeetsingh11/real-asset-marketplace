// AssetService
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { CreateAssetDto } from './dto/create-asset.dto';
import { BrowseAssetsDto } from './dto/browse-asset.dto';
import { AssetDetailsDto } from './dto/asset-details.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AssetService {
  constructor(private readonly dataservice: DatabaseService) {}

  async createAsset(createAssetDto: CreateAssetDto) {
    const { userId, assetName, description, price, category, images } =
      createAssetDto;

    try {
      const asset = await this.dataservice.asset.create({
        data: {
          name: assetName,
          description,
          price,
          category,
          userId,
          images: {
            create: images.map((url) => ({ url })),
          },
        },
      });

      return { assetId: asset.id, status: 'Asset listed successfully' };
    } catch (error) {
      throw new BadRequestException(`Failed to create asset: ${error.message}`);
    }
  }

  async browseAssets(filters: BrowseAssetsDto) {
    const { category, priceRange } = filters;

    // Validate that at least one filter is provided
    if (!category && !priceRange) {
      throw new BadRequestException(
        'Please provide at least one filter: either category or priceRange.',
      );
    }

    const whereClause: any = {};

    if (category) {
      whereClause.category = {
        equals: category.toLowerCase(),
        mode: 'insensitive',
      };
    }

    if (priceRange) {
      const [minPrice, maxPrice] = priceRange.split('-').map(Number);
      if (!whereClause.price) {
        whereClause.price = {};
      }
      whereClause.price.gte = minPrice;
      whereClause.price.lte = maxPrice;
    }

    try {
      const assets = await this.dataservice.asset.findMany({
        where: whereClause,
        include: {
          images: true,
        },
      });

      return {
        assets: assets.map((asset) => ({
          assetId: asset.id,
          assetName: asset.name,
          description: asset.description,
          price: asset.price,
          category: asset.category,
          thumbnail: asset.images.length > 0 ? asset.images[0].url : null,
        })),
      };
    } catch (error) {
      throw new BadRequestException(
        `Failed to browse assets: ${error.message}`,
      );
    }
  }

  async getAssetDetails(assetDetailsDto: AssetDetailsDto) {
    const { assetId } = assetDetailsDto;

    try {
      const asset = await this.dataservice.asset.findUnique({
        where: { id: assetId },
        include: { images: true },
      });

      if (!asset) {
        throw new NotFoundException('Asset not found');
      }

      return {
        assetId: asset.id,
        assetName: asset.name,
        description: asset.description,
        price: asset.price,
        category: asset.category,
        images: asset.images.map((image) => image.url),
      };
    } catch (error) {
      throw new BadRequestException(
        `Failed to get asset details: ${error.message}`,
      );
    }
  }
}
