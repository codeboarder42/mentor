import { Controller, Get, Param } from '@nestjs/common';
import { InterfaceLevelSubject } from './level';
import { LevelService } from './level.service';

@Controller('level')
export class LevelController {
  constructor(private readonly levelService: LevelService) {}
  @Get('subject/:name')
  findLevelAndSubjectbyName(
    @Param('name') name: string,
  ): InterfaceLevelSubject[] {
    return this.levelService.findLevelAndSubjectbyName(name);
  }
}
