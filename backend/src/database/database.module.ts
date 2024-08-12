import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';

/**
 * DatabaseModule class provides and exports the DatabaseService.
 * This module is responsible for managing the database connection through PrismaClient.
 */
@Module({
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
