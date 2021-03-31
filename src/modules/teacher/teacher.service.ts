import { Teacher } from './entities/teacher.entity';
import { Repository } from 'typeorm';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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
  private readonly teacherRelation: string[] = [];

  constructor(
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
  ) {}

  async create(createTeacherDto: any) {
    try {
      const teacher = await this.teacherRepository.save(createTeacherDto);
      const newTeacher = await this.teacherRepository.findOne(teacher.id, {
        relations: this.teacherRelation,
      });
      return createOutput(newTeacher);
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async bulkCreate(createTeacherDto: any[]) {
    try {
      const teachers = await this.teacherRepository.save(createTeacherDto);
      let newDataArray: Teacher[] = [];
      for (let i = 0; i < teachers.length; i++) {
        const data = await this.teacherRepository.findOne(teachers[i].id, {
          relations: this.teacherRelation,
        });
        newDataArray.push(data);
      }
      return createOutput(newDataArray);
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    const payload = await this.teacherRepository.find({
      relations: this.teacherRelation,
    });
    return findOutput(payload);
  }

  async findOne(id: string) {
    return findOutput(
      await this.teacherRepository.findOne(id, {
        relations: this.teacherRelation,
      }),
    );
  }

  async update(id: string, updateTeacher: CreateTeacherDto) {
    await this.teacherRepository.update(id, updateTeacher);
    const newData = await this.teacherRepository.findOne(id, {
      relations: this.teacherRelation,
    });
    return updateOutput(newData);
  }

  async remove(id: string) {
    const deletePayload = await this.teacherRepository.delete(id);
    return deleteOutput(deletePayload);
  }
}
