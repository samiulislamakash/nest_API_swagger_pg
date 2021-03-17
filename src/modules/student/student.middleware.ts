import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StudentMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  async use(req: any, res: any, next: () => void) {
    if (req.params.id) {
      const ifExists = await this.studentRepository.findOne(req.params.id);
      if (!ifExists) {
        throw new NotFoundException();
      } else {
        next();
      }
    } else {
      throw new NotFoundException('Id Not Pass');
    }
  }
}
