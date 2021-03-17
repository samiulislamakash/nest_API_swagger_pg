import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  createOutput,
  deleteOutput,
  findOutput,
  updateOutput,
} from 'src/utils/outputMessage.utils';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    const student = await this.studentRepository.save(createStudentDto);
    return createOutput(student);
  }

  async bulkCreate(createStudentDto: CreateStudentDto[]) {
    const students = await this.studentRepository.save(createStudentDto);
    return createOutput(students);
  }

  async findAll() {
    const payload = await this.studentRepository.find();
    return findOutput(payload);
  }

  async findOne(id: string) {
    return findOutput(await this.studentRepository.findOne(id));
  }

  async update(id: string, updateStudentDto: CreateStudentDto) {
    await this.studentRepository.update(id, updateStudentDto);
    const newData = await this.studentRepository.findOne(id);
    return updateOutput(newData);
  }

  async remove(id: string) {
    const deletePayload = await this.studentRepository.delete(id);
    return deleteOutput(deletePayload);
  }
}
