import { Test, TestingModule } from '@nestjs/testing';
import { WalletService } from './wallet.service';

describe('WalletService', () => {
  let service: WalletService;

  beforeEach(async () => {
    // Set up a testing module with WalletService
    const module: TestingModule = await Test.createTestingModule({
      providers: [WalletService],
    }).compile();

    // Retrieve an instance of WalletService from the testing module
    service = module.get<WalletService>(WalletService);
  });

  it('should be defined', () => {
    // Assert that the WalletService instance is defined
    expect(service).toBeDefined();
  });
});
