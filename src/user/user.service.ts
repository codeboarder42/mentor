import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUSerDto } from './interface/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  createUser({
    firstName,
    lastName,
    email,
  }: CreateUSerDto): Promise<UserEntity> {
    return this.userRepository.save({
      firstName,
      lastName,
      email,
    });
  }
}
