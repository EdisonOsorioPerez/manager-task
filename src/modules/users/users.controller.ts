import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto, UserDto } from './dtos/user-dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('api/v1/users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({
    description: 'Obtiene toda la lista de usuarios',
  })
  @ApiResponse({
    status: 200,
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  getUsers() {
    return this.userService.getUsers();
  }

  @ApiOperation({
    description: 'Crea un usuario',
  })
  @ApiBody({
    description: 'Crea un usuario utilizando un UserDto',
    type: UserDto,
    examples: {
      ejemplo1: {
        value: {
          name: 'Juan',
          email: 'juan@gmail.com',
          username: 'Juan Castillo',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Usuario creado correctamente',
  })
  @ApiResponse({
    status: 409,
    description: 'Usuario ya existente',
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  createUser(@Body() user: UserDto) {
    return this.userService.createUser(user);
  }

  @ApiOperation({
    description: 'Actualiza un usuario',
  })
  @ApiBody({
    description: 'Actualiza un usuario apartir de un UpdateUserDto',
    type: UserDto,
    examples: {
      ejemplo1: {
        value: {
          name: 'Juan',
          email: 'juan@gmail.com',
          username: 'Juan Castillo Espinal',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Usuario actualizado correctamente',
  })
  @ApiResponse({
    status: 409,
    description: 'No se pudo actualizar el usuario',
  })
  @Put()
  @HttpCode(HttpStatus.CREATED)
  updateUser(@Body() userUpdate: UpdateUserDto) {
    return this.userService.updateUser(userUpdate);
  }

  @ApiOperation({
    description: 'Elimina el usuario',
  })
  @ApiParam({
    description: 'Nombre del usuario a eliminar',
    type: String,
    required: true,
    name: 'name',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario eliminado correctamente',
  })
  @ApiResponse({
    status: 409,
    description: 'No se pudo eliminar el usuario',
  })
  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
