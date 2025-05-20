import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnnounceModule } from 'src/announce/announce.module';
import { UserModule } from 'src/user/user.module';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { CourseEntity } from './entities/course.entity';

@Module({
  providers: [CourseService],
  controllers: [CourseController],
  imports: [
    TypeOrmModule.forFeature([CourseEntity]),
    AnnounceModule,
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get('SECRET_TOKEN'),
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [CourseService],
})
export class CourseModule {}

