import { Test, TestingModule } from '@nestjs/testing';
import { AssetController } from './asset.controller';
import { AssetService } from './asset.service';

/**
 * AssetController Unit Tests
 * 
 * This file contains unit tests for the AssetController. It ensures that the controller is properly defined and
 * can be instantiated without issues.
 */
describe('AssetController', () => {
  let controller: AssetController;

  /**
   * Setup the testing module before each test case.
   */
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssetController],
      providers: [AssetService],
    }).compile();

    controller = module.get<AssetController>(AssetController);
  });

  /**
   * Test to check if the controller is defined.
   */
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
