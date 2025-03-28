import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { BddService } from 'src/bdd/bdd.service';
import { SubjectService } from 'src/subject/subject.service';
import { InterfaceLevel, InterfaceLevelSubject } from './level';

@Injectable()
export class LevelService {
  constructor(
    private readonly bdd: BddService,
    @Inject(forwardRef(() => SubjectService))
    private readonly subjectService: SubjectService,
  ) {}

  findAll(): InterfaceLevel[] {
    return this.bdd.get<InterfaceLevel>('levels');
  }

  findLevelAndSubjectbyName(name: string): InterfaceLevelSubject[] {
    const level = this.findAll().find((l) => l.name === name);
    if (!level) {
      throw new Error(`Level with name ${name} not found`);
    }
    const subjects = this.subjectService.findAll();
    const filteredSubjects = subjects?.filter((s) => s.levelId === level.id);
    return filteredSubjects.map<InterfaceLevelSubject>((subject) => {
      return { subject, level };
    });
  }
}
