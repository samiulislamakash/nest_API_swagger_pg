import { SubjectMiddleware } from './subject.middleware';
import { Subject } from './entities/subject.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectController } from './subject.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Subject])],
  exports: [TypeOrmModule],
  controllers: [SubjectController],
  providers: [SubjectService],
})
export class SubjectModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SubjectMiddleware)
      .forRoutes(
        { path: 'subject/:id', method: RequestMethod.GET },
        { path: 'subject/:id', method: RequestMethod.DELETE },
        { path: 'subject/:id', method: RequestMethod.PATCH },
      );
  }
}
