import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UserDto {
  @ApiProperty({
    name: 'name',
    type: String,
    description: 'name of user',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    name: 'email',
    type: String,
    description: 'email of user',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    name: 'username',
    type: String,
    description: 'username of user',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  username: string;
}

export class UpdateUserDto extends UserDto {
  @ApiProperty({
    name: 'id',
    type: String,
    description: 'Id of user',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  id: string;
}
