import { Body, Controller, Post } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ApiResponse } from 'src/app.interfaces';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserDto } from './dtos/user.dto';
import { UserRepository } from './user.repository';

@Controller('users')
export class UsersController {
  constructor(private userRepository: UserRepository) {}
  @Post('/')
  async createUser(
    @Body() { email }: CreateUserDto,
  ): Promise<ApiResponse<UserDto>> {
    return {
      data: plainToClass(UserDto, await this.userRepository.save({ email })),
      success: true,
    };
  }
}
