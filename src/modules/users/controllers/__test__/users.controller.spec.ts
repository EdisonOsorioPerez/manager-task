import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../../services/users.service';
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
const mockUserService = {
  getUsers: jest.fn(),
  createUser: jest.fn(),
  updateUser: jest.fn(),
  deleteUser: jest.fn(),
};
describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: mockUserService }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getUsers', () => {
    beforeEach(() => {
      mockUserService.getUsers.mockReturnValue([newUser]);
    });
    it('return all users', () => {
      const response = controller.getUsers();
      expect(response).toEqual([newUser]);
    });
  });
  describe('createUsers', () => {
    beforeEach(() => {
      mockUserService.createUser.mockReturnValue(newUser);
    });
    it('return all users', () => {
      const response = controller.createUser(newUser);
      expect(response).toEqual(newUser);
    });
  });

  describe('updateUsers', () => {
    beforeEach(() => {
      mockUserService.updateUser.mockReturnValue(newUser);
    });
    it('return all users', () => {
      const response = controller.updateUser(updateUser);
      expect(response).toEqual(newUser);
    });
  });
  describe('deleteUsers', () => {
    beforeEach(() => {
      mockUserService.deleteUser.mockReturnValue(responseSuccessDelete);
    });
    it('return all users', () => {
      const response = controller.deleteUser(updateUser.id);
      expect(response).toEqual(responseSuccessDelete);
    });
  });
});
