import { Teacher } from './entities/teacher.entity';
import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  createOutput,
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
    return createOutput(payload);
  }

  async bulkCreate(createTeacherDto: CreateTeacherDto[]) {
    const teacher = await this.teacherRepository.save(createTeacherDto);
    return createOutput(teacher);
  }

  async findAll() {
    const payload = await this.teacherRepository.find();
    return findOutput(payload);
  }

  async findOne(id: string) {
    const isExists = await this.teacherRepository.findOne(id);
    return findOutput(isExists);
  }

  async update(id: string, updateTeacher: CreateTeacherDto) {
    await this.teacherRepository.update(id, updateTeacher);
    const payload = await this.teacherRepository.findOne(id);
    return updateOutput(payload);
  }

  async remove(id: string) {
    const deletePayload = await this.teacherRepository.delete(id);
    return deleteOutput(deletePayload);
  }
}
