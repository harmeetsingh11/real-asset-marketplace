import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TokenBlacklistModule } from 'src/token-blacklist/token-blacklist.module';

@Module({
  imports: [DatabaseModule, TokenBlacklistModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
