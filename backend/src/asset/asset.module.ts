import { Module } from '@nestjs/common';
import { AssetService } from './asset.service';
import { AssetController } from './asset.controller';
import { DatabaseModule } from 'src/database/database.module';

/**
 * AssetModule
 * 
 * This module is responsible for managing assets in the application. It imports the DatabaseModule
 * for database interactions, provides the AssetService for asset-related business logic, and
 * defines the AssetController to handle HTTP requests related to assets.
 */
@Module({
  imports: [DatabaseModule],
  controllers: [AssetController],
  providers: [AssetService],
})
export class AssetModule {}
