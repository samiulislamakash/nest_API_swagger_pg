import { Subject } from './entities/subject.entity';
import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  createOutput,
  deleteOutput,
  findOutput,
  updateOutput,
} from 'src/utils/outputMessage.utils';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(Subject)
    private subjectRepository: Repository<Subject>,
  ) {}

  async create(createSubjectDto: CreateSubjectDto) {
    const subject = await this.subjectRepository.save(createSubjectDto);
    return createOutput(subject);
  }

  async findAll() {
    const payload = await this.subjectRepository.find();
    return findOutput(payload);
  }

  async findOne(id: string) {
    const payload = await this.subjectRepository.findOne(id);
    if (!payload) {
      throw new NotFoundException();
    }
    return findOutput(payload);
  }

  async update(id: string, updateSubjectDto: CreateSubjectDto) {
    const isExists = await this.subjectRepository.findOne(id);
    if (!isExists) {
      throw new NotFoundException();
    }
    await this.subjectRepository.update(id, updateSubjectDto);
    const payload = await this.subjectRepository.findOne(id);
    return updateOutput(payload);
  }

  async remove(id: string) {
    const isExists = await this.subjectRepository.findOne(id);
    if (!isExists) {
      throw new NotFoundException();
    }
    const deleteSubject = await this.subjectRepository.delete(id);
    return deleteOutput(deleteSubject);
  }
}
