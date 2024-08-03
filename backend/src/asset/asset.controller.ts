// AssetController
import { Controller, Post, Get, Body, Query, UseGuards } from '@nestjs/common';
import { AssetService } from './asset.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { BrowseAssetsDto } from './dto/browse-asset.dto';
import { AssetDetailsDto } from './dto/asset-details.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('asset')
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @UseGuards(JwtAuthGuard)
  @Post('list')
  async listAsset(@Body() createAssetDto: CreateAssetDto) {
    try {
      return await this.assetService.createAsset(createAssetDto);
    } catch (error) {
      throw new Error(`Error creating asset: ${error.message}`);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('browse')
  async browseAssets(@Query() filters: BrowseAssetsDto) {
    try {
      return await this.assetService.browseAssets(filters);
    } catch (error) {
      throw new Error(`Error browsing assets: ${error.message}`);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('details')
  async getAssetDetails(@Query() assetDetailsDto: AssetDetailsDto) {
    try {
      return await this.assetService.getAssetDetails(assetDetailsDto);
    } catch (error) {
      throw new Error(`Error getting asset details: ${error.message}`);
    }
  }
}
