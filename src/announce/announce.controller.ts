import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AnnounceService } from './announce.service';
import { AnnounceEntity } from './entities/announce.entity';
import { CreateAnnounceDto } from './interface/create-announce';

@Controller('announce')
export class AnnounceController {
  constructor(private announceService: AnnounceService) {}
  @Post()
  createAnnounce(@Body() body: CreateAnnounceDto): Promise<AnnounceEntity> {
    return this.announceService.createAnnounce(body);
  }

  @Get('search')
  searchAnnounce(
    @Query('levelName') levelName: string,
    @Query('subjectName') subjectName: string,
  ): Promise<AnnounceEntity | null | string> {
    if (!levelName || !subjectName) {
      throw new Error('Niveau ou sujet introuvable');
    }
    return this.announceService.searchAnnounce({ levelName, subjectName });
  }
}
