import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from './database.service';

/**
 * Unit tests for the DatabaseService.
 * Ensures that the DatabaseService is properly defined.
 */
describe('DatabaseService', () => {
  let service: DatabaseService;

  beforeEach(async () => {
    // Create a testing module with DatabaseService
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseService],
    }).compile();

    // Retrieve an instance of DatabaseService from the testing module
    service = module.get<DatabaseService>(DatabaseService);
  });

  it('should be defined', () => {
    // Verify that the DatabaseService instance is defined
    expect(service).toBeDefined();
  });
});
