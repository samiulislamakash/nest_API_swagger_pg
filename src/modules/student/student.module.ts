import { Student } from './entities/student.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  exports: [TypeOrmModule],
  controllers: [StudentController],
  providers: [StudentService]
})
export class StudentModule { }
