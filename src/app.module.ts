import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import { AnnounceModule } from './announce/announce.module';
import { LevelModule } from './level/level.module';
import { typeOrmModuleOptions } from './ormconfig';
import { SubjectModule } from './subject/subject.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['./config/.env'],
      load: [],
    }),
    TypeOrmModule.forRoot(typeOrmModuleOptions),
    CacheModule.register(),
    LevelModule,
    SubjectModule,
    AnnounceModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
