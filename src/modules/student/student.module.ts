import { StudentMiddleware } from './student.middleware';
import { Student } from './entities/student.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  exports: [TypeOrmModule],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(StudentMiddleware).forRoutes(
      {
        path: 'students/:id',
        method: RequestMethod.GET,
      },
      {
        path: 'students/:id',
        method: RequestMethod.DELETE,
      },
      {
        path: 'students/:id',
        method: RequestMethod.PATCH,
      },
    );
  }
}
