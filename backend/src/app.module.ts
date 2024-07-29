import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { AssetModule } from './asset/asset.module';
import { CartModule } from './cart/cart.module';
import { UserModule } from './user/user.module';
import { WalletModule } from './wallet/wallet.module';

@Module({
  imports: [DatabaseModule, AuthModule, AssetModule, CartModule, UserModule, WalletModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
