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
    // Relations doit être ajouté pour charger les sujets associés au niveau
    const level = await this.levelRepository.findOne({
      where: { name },
      relations: ['subjects'], // Important: charge explicitement la relation
    });

    // Si le niveau n'est pas trouvé, retourner des valeurs par défaut
    if (!level) {
      return {
        subjects: [], // Retourne un tableau vide de sujets
        level: {
          id: 0,
          name: '',
        },
      };
    }

    // Retourne le niveau avec tous ses sujets
    return {
      subjects: level.subjects.map((subject) => ({
        id: subject.id,
        name: subject.name,
      })),
      level: {
        id: level.id,
        name: level.name,
      },
    };
  }
}
