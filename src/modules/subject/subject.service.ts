import { Subject } from './entities/subject.entity';
import { Repository } from 'typeorm';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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
  private readonly subjectRelation: string[] = [];
  constructor(
    @InjectRepository(Subject)
    private subjectRepository: Repository<Subject>,
  ) {}

  async create(createSubjectDto: any) {
    try {
      const subject = await this.subjectRepository.save(createSubjectDto);
      const newSubject = await this.subjectRepository.findOne(subject.id, {
        relations: this.subjectRelation,
      });
      return createOutput(newSubject);
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async bulkCreate(createSubjectDto: any[]) {
    try {
      const subjects = await this.subjectRepository.save(createSubjectDto);
      let newDataArray: Subject[] = [];
      for (let i = 0; i < subjects.length; i++) {
        const data = await this.subjectRepository.findOne(subjects[i].id, {
          relations: this.subjectRelation,
        });
        newDataArray.push(data);
      }
      return createOutput(newDataArray);
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    const payload = await this.subjectRepository.find({
      relations: this.subjectRelation,
    });
    return findOutput(payload);
  }

  async findOne(id: string) {
    return findOutput(
      await this.subjectRepository.findOne(id, {
        relations: this.subjectRelation,
      }),
    );
  }

  async update(id: string, updateSubjectDto: any) {
    await this.subjectRepository.update(id, updateSubjectDto);
    const newData = await this.subjectRepository.findOne(id, {
      relations: this.subjectRelation,
    });
    return updateOutput(newData);
  }

  async remove(id: string) {
    const deleteSubject = await this.subjectRepository.delete(id);
    return deleteOutput(deleteSubject);
  }
}
