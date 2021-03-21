import { Grade } from './entities/grade.entity';
import { Repository } from 'typeorm';
import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GradeMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(Grade)
    private gradeRepository: Repository<Grade>,
  ) {}

  async use(req: any, res: any, next: () => void) {
    if (req.params.id) {
      const ifExists = await this.gradeRepository.findOne(req.params.id);
      if (!ifExists) {
        throw new NotFoundException();
      } else {
        next();
      }
    } else {
      throw new NotFoundException('Id Not Give');
    }
  }
}
