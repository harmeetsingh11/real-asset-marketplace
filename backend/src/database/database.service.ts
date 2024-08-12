import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * DatabaseService class extends PrismaClient to manage database connections.
 * Implements OnModuleInit and OnModuleDestroy for lifecycle management.
 */
@Injectable()
export class DatabaseService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  /**
   * Called when the module is initialized.
   * Connects to the database using PrismaClient.
   */
  async onModuleInit() {
    await this.$connect();
  }

  /**
   * Called when the module is destroyed.
   * Disconnects from the database using PrismaClient.
   */
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
