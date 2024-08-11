import { Test, TestingModule } from '@nestjs/testing';
import { TokenBlacklistService } from './token-blacklist.service';

describe('TokenBlacklistService', () => {
  let service: TokenBlacklistService;

  beforeEach(async () => {
    // Create a testing module with the TokenBlacklistService
    const module: TestingModule = await Test.createTestingModule({
      providers: [TokenBlacklistService],
    }).compile();

    // Get an instance of TokenBlacklistService from the testing module
    service = module.get<TokenBlacklistService>(TokenBlacklistService);
  });

  it('should be defined', () => {
    // Test that the TokenBlacklistService instance is defined
    expect(service).toBeDefined();
  });
});
