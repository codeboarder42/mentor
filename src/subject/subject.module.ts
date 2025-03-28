import { forwardRef, Module } from '@nestjs/common';
import { LevelModule } from 'src/level/level.module';
import { SubjectController } from './subject.controller';
import { SubjectService } from './subject.service';

@Module({
  imports: [forwardRef(() => LevelModule)],
  controllers: [SubjectController],
  providers: [SubjectService],
  exports: [SubjectService],
})
export class SubjectModule {}
