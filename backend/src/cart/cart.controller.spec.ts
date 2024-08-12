import { Test, TestingModule } from '@nestjs/testing';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';

/**
 * Unit tests for the CartController.
 */
describe('CartController', () => {
  let controller: CartController;

  /**
   * Setup the testing module before each test.
   */
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartController],
      providers: [CartService],
    }).compile();

    // Retrieve an instance of CartController from the testing module
    controller = module.get<CartController>(CartController);
  });

  /**
   * Test to check if the CartController is defined.
   */
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
