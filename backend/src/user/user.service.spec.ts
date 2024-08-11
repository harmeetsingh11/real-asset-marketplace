import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    // Create a testing module with UserService provider
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    // Retrieve an instance of UserService from the testing module
    service = module.get<UserService>(UserService);
  });

  /**
   * Test to ensure that the UserService is defined.
   */
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
