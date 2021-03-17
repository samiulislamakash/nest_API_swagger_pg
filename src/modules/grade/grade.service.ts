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

  async findAll() {
    const payload = await this.gradeRepository.find();
    return findOutput(payload);
  }

  async findOne(id: string) {
    const isExists = await this.gradeRepository.findOne(id);
    if (!isExists) {
      throw new NotFoundException();
    }
    return findOutput(isExists);
  }

  async update(id: string, updateGradeDto: CreateGradeDto) {
    const isExists = await this.gradeRepository.findOne(id);
    if (!isExists) {
      throw new NotFoundException();
    }
    await this.gradeRepository.update(id, updateGradeDto);
    const newData = await this.gradeRepository.findOne(id);
    return updateOutput(newData);
  }

  async remove(id: string) {
    const isExists = await this.gradeRepository.findOne(id);
    if (!isExists) {
      throw new NotFoundException();
    }
    const deletePayload = await this.gradeRepository.delete(id);
    return deleteOutput(deletePayload);
  }
}
