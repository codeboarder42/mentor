import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUSerDto } from './interface/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async createUser({
    firstName,
    lastName,
    email,
    password,
    role,
  }: CreateUSerDto): Promise<UserEntity> {
    const passwordHash = await hash(password, 10);
    return this.userRepository.save({
      firstName,
      lastName,
      email,
      passwordHash,
      role,
    });
  }
  async findOne(email: string): Promise<UserEntity | null> {
    return this.userRepository.findOneBy({ email });
  }
}
