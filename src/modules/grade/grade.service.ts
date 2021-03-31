import { InjectRepository } from '@nestjs/typeorm';
import { Grade } from 'src/modules/grade/entities/grade.entity';
import { Repository } from 'typeorm';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateGradeDto } from './dto/create-grade.dto';
import {
  createOutput,
  deleteOutput,
  findOutput,
  updateOutput,
} from 'src/utils/outputMessage.utils';

@Injectable()
export class GradeService {
  private readonly gradeRelation: string[] = [];

  constructor(
    @InjectRepository(Grade)
    private gradeRepository: Repository<Grade>,
  ) {}

  async create(createGradeDto: any) {
    try {
      const grade = await this.gradeRepository.save(createGradeDto);
      const newGrade = await this.gradeRepository.findOne(grade.id, {
        relations: this.gradeRelation,
      });
      return createOutput(grade);
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async bulkCreate(createGradeDto: any[]) {
    const grades = await this.gradeRepository.save(createGradeDto);
    let newDataArray: Grade[] = [];
    for (let i = 0; i < grades.length; i++) {
      const data = await this.gradeRepository.findOne(grades[i].id, {
        relations: this.gradeRelation,
      });
      newDataArray.push(data);
    }
    return createOutput(newDataArray);
  }

  async findAll() {
    const payload = await this.gradeRepository.find({
      relations: this.gradeRelation,
    });
    return findOutput(payload);
  }

  async findOne(id: string) {
    return findOutput(
      await this.gradeRepository.findOne(id, {
        relations: this.gradeRelation,
      }),
    );
  }

  async update(id: string, updateGradeDto: any) {
    await this.gradeRepository.update(id, updateGradeDto);
    const newData = await this.gradeRepository.findOne(id, {
      relations: this.gradeRelation,
    });
    return updateOutput(newData);
  }

  async remove(id: string) {
    const deletePayload = await this.gradeRepository.delete(id);
    return deleteOutput(deletePayload);
  }
}
