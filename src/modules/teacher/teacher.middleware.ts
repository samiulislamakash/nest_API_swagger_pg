import { Teacher } from './entities/teacher.entity';
import { Repository } from 'typeorm';
import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TeacherMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
  ) {}
  async use(req: any, res: any, next: () => void) {
    if (req.params.id) {
      const ifExists = await this.teacherRepository.findOne(req.params.id);
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
