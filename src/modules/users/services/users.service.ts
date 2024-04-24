import { CrudModel } from '../../../models/crud.model';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user-schema';
import { Model } from 'mongoose';
import { UpdateUserDto, UserDto } from '../dtos/user-dto';

@Injectable()
export class UsersService extends CrudModel<User> {
  constructor(@InjectModel(User.name) protected userModel: Model<User>) {
    super(userModel);
  }

  async getUsers() {
    return this.find({});
  }

  async createUser(user: UserDto) {
    const userExist = await this.findUserByName(user.name);
    if (userExist) {
      throw new ConflictException('El usuario ya existe');
    }
    const emailExist = await this.findUserByEmail(user.email);
    if (emailExist) {
      throw new ConflictException('El correo no esta disponible');
    }

    return this.create(user);
  }

  async updateUser(user: UpdateUserDto) {
    const userExist = await this.findUserById(user.id);
    const emailExist = await this.findUserByEmail(user.email);
    if (emailExist.email !== userExist.email) {
      throw new ConflictException('El correo no esta disponible');
    }
    if (userExist) {
      await this.update(
        { _id: user.id },

        {
          email: user.email,
          username: user.username,
        }
      );
      return userExist;
    } else {
      throw new ConflictException('No se puedo actualizar el usuario');
    }
  }

  async deleteUser(id: string) {
    const userExist = await this.findUserById(id);
    if (userExist) {
      return this.delete({ _id: userExist._id });
    } else {
      throw new ConflictException('No se pudo eliminar el usuario');
    }
  }

  private findUserById(id: string) {
    return this.findById(id);
  }

  private findUserByName(name: string) {
    return this.findOne({
      name,
    });
  }

  private findUserByEmail(email: string) {
    return this.findOne({ email });
  }
}
