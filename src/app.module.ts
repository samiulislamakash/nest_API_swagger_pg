import { Student } from './modules/student/entities/student.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentModule } from './modules/student/student.module';
import { TeacherModule } from './modules/teacher/teacher.module';
import { SubjectModule } from './modules/subject/subject.module';
import { GradeModule } from './modules/grade/grade.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'samisql',
      database: 'SchoolManagement',
      autoLoadEntities: true,
      synchronize: true,
    }),
    StudentModule,
    TeacherModule,
    SubjectModule,
    GradeModule,
  ],
})
export class AppModule {}
