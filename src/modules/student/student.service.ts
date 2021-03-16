import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { createOneOutput, deleteOutput, findOutput, updateOutput } from 'src/utils/outputMessage.utils';

@Injectable()
export class StudentService {

  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>
  ) { }

  async create(createStudentDto: CreateStudentDto) {
    const student = await this.studentRepository.save(createStudentDto);
    return createOneOutput(student);
  }

  async bulkCreate(createStudentDto: CreateStudentDto[]) {
    const students = await this.studentRepository.save(createStudentDto);
    return
  }

  async findAll() {
    const payload = await this.studentRepository.find();
    return findOutput(payload);
  }

  async findOne(id: string) {
    const isExists = await this.studentRepository.findOne(id);
    if (!isExists) {
      throw new NotFoundException()
    }
    return findOutput(isExists);
  }

  async update(id: string, updateStudentDto: CreateStudentDto) {
    const isExists = await this.studentRepository.findOne(id);
    if (!isExists) {
      throw new NotFoundException()
    }
    await this.studentRepository.update(id, updateStudentDto);
    const newData = await this.studentRepository.findOne(id);
    return updateOutput(newData)
  }

  async remove(id: string) {
    const isExists = await this.studentRepository.findOne(id);
    if (!isExists) {
      throw new NotFoundException()
    }
    const deletePayload = await this.studentRepository.delete(id);
    return deleteOutput(deletePayload);
  }
}
