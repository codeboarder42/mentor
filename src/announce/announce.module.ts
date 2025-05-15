import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LevelModule } from 'src/level/level.module';
import { SubjectModule } from 'src/subject/subject.module';
import { AnnounceController } from './announce.controller';
import { AnnounceService } from './announce.service';
import { AnnounceEntity } from './entities/announce.entity';

@Module({
  providers: [AnnounceService],
  controllers: [AnnounceController],
  imports: [
    TypeOrmModule.forFeature([AnnounceEntity]),
    forwardRef(() => LevelModule),
    forwardRef(() => SubjectModule),
  ], // Add your entities here
  exports: [AnnounceService],
})
export class AnnounceModule {}
