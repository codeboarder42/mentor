import { Body, Controller, Post } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { CreateUSerDto } from './interface/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  signupUser(@Body() body: CreateUSerDto): Promise<UserEntity> {
    return this.userService.createUser(body);
  }
}
