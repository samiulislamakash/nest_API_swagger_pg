import { Teacher } from './entities/teacher.entity';
import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  createOneOutput,
  deleteOutput,
  findOutput,
  updateOutput,
} from 'src/utils/outputMessage.utils';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
  ) {}

  async create(createTeacherDto: CreateTeacherDto) {
    const payload = await this.teacherRepository.save(createTeacherDto);
    return createOneOutput(payload);
  }

  async findAll() {
    const payload = await this.teacherRepository.find();
    return findOutput(payload);
  }

  async findOne(id: string) {
    const isExists = await this.teacherRepository.findOne(id);
    if (!isExists) {
      throw new NotFoundException();
    }
    return findOutput(isExists);
  }

  async update(id: string, updateTeacher: CreateTeacherDto) {
    const isExists = await this.teacherRepository.findOne(id);
    if (!isExists) {
      throw new NotFoundException();
    }
    await this.teacherRepository.update(id, updateTeacher);
    const payload = await this.teacherRepository.findOne(id);
    return updateOutput(payload);
  }

  async remove(id: string) {
    const isExists = await this.teacherRepository.findOne(id);
    if (!isExists) {
      throw new NotFoundException();
    }
    const deletePayload = await this.teacherRepository.delete(id);
    return deleteOutput(deletePayload);
  }
}
