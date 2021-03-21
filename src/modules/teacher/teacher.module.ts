import { TeacherMiddleware } from './teacher.middleware';
import { Teacher } from './entities/teacher.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher])],
  exports: [TypeOrmModule],
  controllers: [TeacherController],
  providers: [TeacherService],
})
export class TeacherModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TeacherMiddleware)
      .forRoutes(
        { path: 'teacher/:id', method: RequestMethod.GET },
        { path: 'teacher/:id', method: RequestMethod.DELETE },
        { path: 'teacher/:id', method: RequestMethod.PATCH },
      );
  }
}
