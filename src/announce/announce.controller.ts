import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/guards/role.decorator';
import { RoleGuard } from 'src/guards/role.guard';
import { Role } from 'src/user/interface/role';
import { AnnounceService } from './announce.service';
import { AnnounceEntity } from './entities/announce.entity';
import { CreateAnnounceDto } from './interface/create-announce.dto';
import { SearchQuery } from './interface/search-query';

@Controller('announce')
export class AnnounceController {
  constructor(private announceService: AnnounceService) {}
  @Post()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Teacher)
  createAnnounce(
    @Body() body: CreateAnnounceDto,
    @Req() { user },
  ): Promise<AnnounceEntity> {
    return this.announceService.createAnnounce({ ...body, userId: user.sub });
  }

  @Get('search')
  searchAnnounce(
    @Query() { levelName, subjectName }: SearchQuery,
  ): Promise<AnnounceEntity | null | string> {
    if (!levelName || !subjectName) {
      throw new Error('Niveau ou sujet introuvable');
    }
    return this.announceService.searchAnnounce({ levelName, subjectName });
  }
}
