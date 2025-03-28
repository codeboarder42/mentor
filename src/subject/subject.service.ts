import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { BddService } from 'src/bdd/bdd.service';
import { InterfaceLevelSubject } from 'src/level/level';
import { LevelService } from 'src/level/level.service';
import { SUBJECTS } from './bdd';
import { InterfacePostSubject, InterfaceSubject } from './subject';

@Injectable()
export class SubjectService {
  constructor(
    private readonly bdd: BddService,
    @Inject(forwardRef(() => LevelService))
    private readonly levelService: LevelService,
  ) {}
  findAll(): InterfaceSubject[] {
    return this.bdd.get<InterfaceSubject>('subjects');
  }

  createNewSubject({
    name,
    levelId,
  }: InterfacePostSubject): InterfaceSubject[] {
    const sortedByIdSubject = this.findAll().sort((a, b) => a.id - b.id);
    const newId = sortedByIdSubject[sortedByIdSubject.length - 1].id + 1;
    return [...SUBJECTS, { id: newId, name: name, levelId: levelId }];
  }

  findOneById(id: number): InterfaceSubject | undefined {
    return this.bdd.getById<InterfaceSubject>('subjects', id);
  }

  levelAndSubjectFromName(name: string): InterfaceLevelSubject[] {
    const subject = this.findAll().find((s) => s.name === name);
    const levels = this.levelService.findAll();
    const filteredLevels = levels.filter((l) => l.id === subject?.levelId);
    return filteredLevels.map((level) => ({
      level,
      subject,
    }));
  }
}
