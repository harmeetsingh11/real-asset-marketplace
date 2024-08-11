import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    // Create a testing module with the UserController and UserService
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    // Get an instance of UserController from the testing module
    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    // Test that the UserController instance is defined
    expect(controller).toBeDefined();
  });
});
