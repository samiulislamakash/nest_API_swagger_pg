import { BulkUploadBrand } from './dto/bulk-upload-brand.dto';
import { CreateDepartmentDto } from './../department/dto/create-department.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  createOutput,
  deleteOutput,
  findOutput,
  updateOutput,
} from 'src/@utils/outputMessage.utils';
import { Repository, ILike } from 'typeorm';

@Injectable()
export class BrandService {
  relation: string[] = [];

  constructor(
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
  ) {}

  async create(payload: CreateDepartmentDto) {
    try {
      const createData = await this.brandRepository.save(payload);
      const newCreateData = await this.brandRepository.findOne(createData.id, {
        relations: this.relation,
      });
      return createOutput(newCreateData);
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async bulkCreate(payload: any[]) {
    try {
      const brand = await this.brandRepository.save(payload);
      let newDataArray: Brand[] = [];
      for (let i = 0; i < brand.length; i++) {
        const data = await this.brandRepository.findOne(brand[i].id, {
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
        const [payload, count] = await this.brandRepository.findAndCount({
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
        const [payload, count] = await this.brandRepository.findAndCount({
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
      await this.brandRepository.update(id, payload);
      const newData = await this.brandRepository.findOne(id, {
        relations: this.relation,
      });
      return updateOutput(newData);
    } catch (e) {
      return new InternalServerErrorException();
    }
  }

  async bulkUpdate(payload: BulkUploadBrand) {
    try {
      const { ids, brand } = payload;
      await this.brandRepository.update(ids, brand);
      let updateDataArray: Brand[] = [];
      for (let i = 0; i < ids.length; i++) {
        const data = await this.brandRepository.findOne(ids[i], {
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
      const deleteBrand = await this.brandRepository.delete(id);
      return deleteOutput(deleteBrand);
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async bulkRemove(ids: string[]) {
    try {
      const deleteBrand = await this.brandRepository.delete(ids);
      return deleteOutput(deleteBrand);
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
