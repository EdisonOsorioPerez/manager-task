import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { UsersService } from '../users.service';
import { UpdateUserDto, UserDto } from '../../dtos/user-dto';

const responseSuccessDelete = 'successfully';
const newUser: UserDto = {
  name: 'Jan',
  email: 'juan@doe.mail',
  username: 'Juan Jose Doe',
};
const updateUser: UpdateUserDto = {
  id: '123',
  name: 'juan',
  email: 'juan@doe1.mail',
  username: 'Juan Jose Doe',
};

const mockCrudModel = {
  find: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findOneAndUpdate: jest.fn().mockResolvedValue(updateUser),
  findByIdAndDelete: jest.fn().mockResolvedValue(responseSuccessDelete),
  findOne: jest.fn(),
  findById: jest.fn(),
};
describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken('User'),
          useValue: mockCrudModel,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUsers', () => {
    beforeEach(() => {
      mockCrudModel.find.mockResolvedValue([newUser]);
    });
    it('Should resturn all data', async () => {
      const response = await service.getUsers();
      expect(response).toEqual([newUser]);
    });
  });

  describe('createUser', () => {
    beforeEach(() => {
      mockCrudModel.create.mockResolvedValue(newUser);
      mockCrudModel.findOne.mockResolvedValue(null);
    });

    it('create a new user', async () => {
      const respose = await service.createUser(newUser);
      expect(respose).toEqual(newUser);
    });
  });

  describe('updateUser', () => {
    beforeEach(() => {
      mockCrudModel.update.mockResolvedValue(updateUser);
      mockCrudModel.findOne.mockResolvedValue(updateUser);
      mockCrudModel.findById.mockResolvedValue(updateUser);
    });
    it('update to user', async () => {
      const response = await service.updateUser(updateUser);
      expect(response).toEqual(updateUser);
    });
  });

  describe('deleteUser', () => {
    beforeEach(() => {
      mockCrudModel.delete.mockResolvedValue(responseSuccessDelete);
    });
    it('delete to user', async () => {
      const response = await service.deleteUser('2');
      expect(response).toEqual(responseSuccessDelete);
    });
  });
});
