import { Controller } from '@nestjs/common';
import { LevelService } from './level.service';

@Controller('level')
export class LevelController {
  constructor(private readonly levelService: LevelService) {}
  // @Get('subject/:name')
  // findLevelAndSubjectbyName(
  //   @Param('name') name: string,
  // ): Promise<InterfaceLevelSubject> {
  //   return this.levelService.findLevelAndSubjectbyName(name);
  // }
}
