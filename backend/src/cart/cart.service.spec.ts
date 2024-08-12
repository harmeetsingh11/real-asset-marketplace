import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from './cart.service';

/**
 * Unit tests for CartService.
 * Verifies the basic functionality and existence of the CartService.
 */
describe('CartService', () => {
  let service: CartService;

  beforeEach(async () => {
    // Create a testing module with the CartService provider
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartService],
    }).compile();

    // Retrieve an instance of CartService from the testing module
    service = module.get<CartService>(CartService);
  });

  it('should be defined', () => {
    // Ensure that the CartService instance is properly defined
    expect(service).toBeDefined();
  });
});
