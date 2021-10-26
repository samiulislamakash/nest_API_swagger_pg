import { BulkUploadDepartment } from './dto/bulk-upload-department.dto';
import { Department } from './entities/department.entity';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Like, Repository, ILike, Raw } from 'typeorm';
import {
  createOutput,
  deleteOutput,
  findOutput,
  updateOutput,
} from 'src/@utils/outputMessage.utils';

@Injectable()
export class DepartmentService {
  relation: string[] = [];

  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {}

  async create(payload: CreateDepartmentDto) {
    try {
      const createData = await this.departmentRepository.save(payload);
      const newCreateData = await this.departmentRepository.findOne(
        createData.id,
        {
          relations: this.relation,
        },
      );
      return createOutput(newCreateData);
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async bulkCreate(payload: any[]) {
    try {
      const department = await this.departmentRepository.save(payload);
      let newDataArray: Department[] = [];
      for (let i = 0; i < department.length; i++) {
        const data = await this.departmentRepository.findOne(department[i].id, {
          relations: this.relation,
        });
        newDataArray.push(data);
      }
      return createOutput(newDataArray);
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async filter(param: any) {
    try {
      // paginate work .
      const take = param.take && param.take > 0 ? +param.take : 10;
      const page = param.page && param.page > 0 ? +param.page - 1 : 0;
      const skip = page * take;
      delete param.take;
      delete param.page;
      if (Object.keys(param).includes('searchTerm')) {
        const searchTerm = param.searchTerm;
        let whereData = [
          {
            name: ILike(`%${searchTerm}%`),
          },
        ];
        const [payload, count] = await this.departmentRepository.findAndCount({
          where: whereData,
          take,
          skip,
          order: {
            updatedAt: 'DESC',
          },
          relations: this.relation,
        });
        return findOutput(payload, count, take, page + 1);
      } else {
        const [payload, count] = await this.departmentRepository.findAndCount({
          take,
          skip,
          order: {
            updatedAt: 'DESC',
          },
          relations: this.relation,
        });
        return findOutput(payload, count, take, page + 1);
      }
    } catch (e) {
      console.log(e);
      return new InternalServerErrorException();
    }
  }

  async update(id: string, payload: any) {
    try {
      await this.departmentRepository.update(id, payload);
      const newData = await this.departmentRepository.findOne(id, {
        relations: this.relation,
      });
      return updateOutput(newData);
    } catch (e) {
      return new InternalServerErrorException();
    }
  }

  async bulkUpdate(payload: BulkUploadDepartment) {
    try {
      const { ids, department } = payload;
      await this.departmentRepository.update(ids, department);
      let updateDataArray: Department[] = [];
      for (let i = 0; i < ids.length; i++) {
        const data = await this.departmentRepository.findOne(ids[i], {
          relations: this.relation,
        });
        updateDataArray.push(data);
      }
      return updateOutput(updateDataArray);
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async remove(id: string) {
    try {
      const deleteDepartment = await this.departmentRepository.delete(id);
      return deleteOutput(deleteDepartment);
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async bulkRemove(ids: string[]) {
    try {
      const deleteDepartment = await this.departmentRepository.delete(ids);
      return deleteOutput(deleteDepartment);
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
