import { Test, TestingModule } from '@nestjs/testing';
import { AssetService } from './asset.service';

/**
 * AssetService Test Suite
 * 
 * This test suite is used to verify the correct initialization and definition of the AssetService.
 * It ensures that the AssetService is properly instantiated and can be accessed within the test environment.
 */
describe('AssetService', () => {
  let service: AssetService;

  beforeEach(async () => {
    // Create a testing module with AssetService as a provider
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssetService],
    }).compile();

    // Get an instance of AssetService from the testing module
    service = module.get<AssetService>(AssetService);
  });

  it('should be defined', () => {
    // Check if AssetService is defined
    expect(service).toBeDefined();
  });
});
