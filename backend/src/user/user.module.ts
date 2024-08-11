import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TokenBlacklistModule } from 'src/token-blacklist/token-blacklist.module';

@Module({
  // Modules imported into this module
  imports: [
    DatabaseModule,          // Provides database access
    TokenBlacklistModule,    // Manages token blacklisting
  ],
  // Controllers to handle incoming requests
  controllers: [UserController],
  // Providers for dependency injection
  providers: [UserService],
})
export class UserModule {}
