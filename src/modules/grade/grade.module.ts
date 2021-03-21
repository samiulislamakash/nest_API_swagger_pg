import { GradeMiddleware } from './grade.middleware';
import { Grade } from 'src/modules/grade/entities/grade.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { GradeService } from './grade.service';
import { GradeController } from './grade.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Grade])],
  exports: [TypeOrmModule],
  controllers: [GradeController],
  providers: [GradeService],
})
export class GradeModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(GradeMiddleware)
      .forRoutes(
        { path: 'grade/:id', method: RequestMethod.GET },
        { path: 'grade/:id', method: RequestMethod.PATCH },
        { path: 'grade/:id', method: RequestMethod.DELETE },
      );
  }
}
