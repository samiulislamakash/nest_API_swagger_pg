import { InjectRepository } from '@nestjs/typeorm';
import { Grade } from 'src/modules/grade/entities/grade.entity';
import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGradeDto } from './dto/create-grade.dto';
import {
  createOutput,
  deleteOutput,
  findOutput,
  updateOutput,
} from 'src/utils/outputMessage.utils';

@Injectable()
export class GradeService {
  constructor(
    @InjectRepository(Grade)
    private gradeRepository: Repository<Grade>,
  ) {}

  async create(createGradeDto: CreateGradeDto) {
    const grade = await this.gradeRepository.save(createGradeDto);
    return createOutput(grade);
  }

  async bulkCreate(createGradeDto: CreateGradeDto[]) {
    const grade = await this.gradeRepository.save(createGradeDto);
    return createOutput(grade);
  }

  async findAll() {
    const payload = await this.gradeRepository.find();
    return findOutput(payload);
  }

  async findOne(id: string) {
    const payload = await this.gradeRepository.findOne(id);
    return findOutput(payload);
  }

  async update(id: string, updateGradeDto: CreateGradeDto) {
    await this.gradeRepository.update(id, updateGradeDto);
    const newData = await this.gradeRepository.findOne(id);
    return updateOutput(newData);
  }

  async remove(id: string) {
    const deletePayload = await this.gradeRepository.delete(id);
    return deleteOutput(deletePayload);
  }
}
