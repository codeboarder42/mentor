import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { LevelEntity } from './entities/level.entity';
import { InterfaceLevelSubject } from './level';

@Injectable()
export class LevelService {
  constructor(
    @InjectRepository(LevelEntity)
    private levelRepository: Repository<LevelEntity>,
  ) {}

  async findAll(): Promise<LevelEntity[]> {
    return this.levelRepository.find();
  }

  async findLevelAndSubjectbyName(
    name: string,
  ): Promise<InterfaceLevelSubject> {
    const level = await this.levelRepository.findOneBy({ name });
    return {
      subject: {
        id: level?.subject?.id ?? 0,
        name: level?.subject?.name ?? '',
      },
      level: {
        id: level?.id ?? 0,
        name: level?.name ?? '',
      },
    };
  }
}
