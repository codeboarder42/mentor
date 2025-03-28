import { Global, Module } from '@nestjs/common';
import { LEVELS, SUBJECTS } from './bdd';
import { BddService } from './bdd.service';

@Global()
@Module({
  providers: [
    BddService,
    {
      provide: 'LEVELS',
      useValue: LEVELS,
    },
    {
      provide: 'SUBJECTS',
      useValue: SUBJECTS,
    },
  ],
  exports: [BddService],
})
export class BddModule {}
