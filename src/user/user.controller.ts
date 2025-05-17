import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/guards/role.decorator';
import { RoleGuard } from 'src/guards/role.guard';
import { UserEntity } from './entities/user.entity';
import { CreateUSerDto } from './interface/create-user.dto';
import { Role } from './interface/role';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  signupUser(@Body() body: CreateUSerDto): Promise<UserEntity> {
    return this.userService.createUser(body);
  }

  @Get('me')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Admin)
  userInfo(@Req() { user }): Promise<UserEntity | null> {
    return this.userService.findOne(user.username);
  }
}
