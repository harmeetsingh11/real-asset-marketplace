import { Test, TestingModule } from '@nestjs/testing';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';

describe('WalletController', () => {
  let controller: WalletController;

  beforeEach(async () => {
    // Set up a testing module with the WalletController and WalletService
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WalletController],
      providers: [WalletService],
    }).compile();

    // Retrieve an instance of WalletController from the testing module
    controller = module.get<WalletController>(WalletController);
  });

  it('should be defined', () => {
    // Assert that the WalletController instance is correctly defined
    expect(controller).toBeDefined();
  });
});
