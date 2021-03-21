import { Subject } from './entities/subject.entity';
import { Repository } from 'typeorm';
import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SubjectMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(Subject)
    private subjectRepository: Repository<Subject>,
  ) {}
  async use(req: any, res: any, next: () => void) {
    if (req.params.id) {
      const ifExists = await this.subjectRepository.findOne(req.params.id);
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
