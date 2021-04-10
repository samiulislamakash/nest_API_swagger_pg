import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  createOutput,
  deleteOutput,
  findOutput,
  updateOutput,
} from 'src/utils/outputMessage.utils';

@Injectable()
export class StudentService {
  private readonly studentRelation: string[] = ['grede'];

  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  async create(createStudentDto: any) {
    try {
      const student = await this.studentRepository.save(createStudentDto);
      const newStudent = await this.studentRepository.findOne(student.id, {
        relations: this.studentRelation,
      });
      return createOutput(newStudent);
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async bulkCreate(createStudentDto: any[]) {
    try {
      const students = await this.studentRepository.save(createStudentDto);
      let newDataArray: Student[] = [];
      for (let i = 0; i < students.length; i++) {
        const data = await this.studentRepository.findOne(students[i].id, {
          relations: this.studentRelation,
        });
        newDataArray.push(data);
      }
      return createOutput(newDataArray);
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    const payload = await this.studentRepository.find({
      relations: this.studentRelation,
    });
    return findOutput(payload);
  }

  async findOne(id: string) {
    return findOutput(
      await this.studentRepository.findOne(id, {
        relations: this.studentRelation,
      }),
    );
  }

  async update(id: string, updateStudentDto: any) {
    await this.studentRepository.update(id, updateStudentDto);
    const newData = await this.studentRepository.findOne(id, {
      relations: this.studentRelation,
    });
    return updateOutput(newData);
  }

  async remove(id: string) {
    const deletePayload = await this.studentRepository.delete(id);
    return deleteOutput(deletePayload);
  }
}
