import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { InterfaceLevelSubject } from 'src/level/level';
import { SUBJECTS } from './bdd';
import { InterfacePostSubject, InterfaceSubject } from './subject';
import { SubjectService } from './subject.service';

@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}
  @Get()
  findAll(): InterfaceSubject[] {
    return SUBJECTS;
  }

  @Get(':id')
  findOneById(@Param('id') id: string): InterfaceSubject | undefined {
    return this.subjectService.findOneById(+id);
  }

  @Post()
  addSubject(@Body() subject: InterfacePostSubject): InterfaceSubject[] {
    return this.subjectService.createNewSubject(subject);
  }

  @Get(':name/level/')
  findLevelAndSubject(@Param('name') name: string): InterfaceLevelSubject[] {
    return this.subjectService.levelAndSubjectFromName(name);
  }

  @Get('favorite')
  findFavorite(): string {
    return this.subjectService.findFavorite();
  }
}
