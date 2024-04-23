import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../UsersService';
import { UsersModule } from '../../users.module';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../../schemas/user-schema';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(getModelToken(User.name))
      .useValue(jest.fn())
      .compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
