import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { AssetModule } from './asset/asset.module';

@Module({
  imports: [DatabaseModule, AuthModule, AssetModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
