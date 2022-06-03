import { Post, Get, Delete, Body, Param, Controller } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { User } from 'src/user/schema/user.schema';

@Controller('v1/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/signup')
  async createUser(@Body() createUserDto: CreateUserDto) {
    await this.userService.create(createUserDto);
  }

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    return await this.userService.find(id);
  }
}
