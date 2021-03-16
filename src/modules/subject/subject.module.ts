import { Subject } from './entities/subject.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectController } from './subject.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Subject])],
  exports: [TypeOrmModule],
  controllers: [SubjectController],
  providers: [SubjectService],
})
export class SubjectModule {}
