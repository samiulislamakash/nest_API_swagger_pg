import { Grade } from 'src/modules/grade/entities/grade.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { GradeService } from './grade.service';
import { GradeController } from './grade.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Grade])],
  exports: [TypeOrmModule],
  controllers: [GradeController],
  providers: [GradeService],
})
export class GradeModule {}
