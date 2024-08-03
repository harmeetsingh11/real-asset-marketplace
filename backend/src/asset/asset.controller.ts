// AssetController
import { Controller, Post, Get, Body, Query, UseGuards } from '@nestjs/common';
import { AssetService } from './asset.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { BrowseAssetsDto } from './dto/browse-asset.dto';
import { AssetDetailsDto } from './dto/asset-details.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Asset')
@Controller('asset')
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @UseGuards(JwtAuthGuard)
  @Post('list')
  @ApiOperation({
    description:
      'This endpoint allows a user to list a new asset by providing asset details such as name, description, price, category, and images. It returns the asset ID and listing status.',
    summary: 'List a new asset',
  })
  async listAsset(@Body() createAssetDto: CreateAssetDto) {
    try {
      return await this.assetService.createAsset(createAssetDto);
    } catch (error) {
      throw new Error(`Error creating asset: ${error.message}`);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('browse')
  @ApiOperation({
    description:
      'This endpoint allows users to browse listed assets. Users can apply filters to narrow down the search results. It returns a list of assets with basic details.',
    summary: 'Browse assets',
  })
  async browseAssets(@Query() filters: BrowseAssetsDto) {
    try {
      return await this.assetService.browseAssets(filters);
    } catch (error) {
      throw new Error(`Error browsing assets: ${error.message}`);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('details')
  @ApiOperation({
    description:
      'This endpoint provides detailed information about a specific asset based on the asset ID. It returns the asset details including name, description, price, category, and images.',
    summary: 'Get asset details',
  })
  async getAssetDetails(@Query() assetDetailsDto: AssetDetailsDto) {
    try {
      return await this.assetService.getAssetDetails(assetDetailsDto);
    } catch (error) {
      throw new Error(`Error getting asset details: ${error.message}`);
    }
  }
}
