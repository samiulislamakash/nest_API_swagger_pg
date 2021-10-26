import { BulkUploadCategory } from './dto/bulk-update-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository, ILike } from 'typeorm';
import {
  createOutput,
  deleteOutput,
  findOutput,
  updateOutput,
} from 'src/@utils/outputMessage.utils';

@Injectable()
export class CategoryService {
  relation: string[] = ['department'];

  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(payload: any) {
    try {
      const createData = await this.categoryRepository.save(payload);
      const newCreateData = await this.categoryRepository.findOne(
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
      const brand = await this.categoryRepository.save(payload);
      let newDataArray: Category[] = [];
      for (let i = 0; i < brand.length; i++) {
        const data = await this.categoryRepository.findOne(brand[i].id, {
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
        const [payload, count] = await this.categoryRepository.findAndCount({
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
        const [payload, count] = await this.categoryRepository.findAndCount({
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
      await this.categoryRepository.update(id, payload);
      const newData = await this.categoryRepository.findOne(id, {
        relations: this.relation,
      });
      return updateOutput(newData);
    } catch (e) {
      return new InternalServerErrorException();
    }
  }

  async bulkUpdate(payload: any) {
    try {
      const { ids, category } = payload;
      await this.categoryRepository.update(ids, category);
      let updateDataArray: Category[] = [];
      for (let i = 0; i < ids.length; i++) {
        const data = await this.categoryRepository.findOne(ids[i], {
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
      const deleteBrand = await this.categoryRepository.delete(id);
      return deleteOutput(deleteBrand);
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async bulkRemove(ids: string[]) {
    try {
      const deleteBrand = await this.categoryRepository.delete(ids);
      return deleteOutput(deleteBrand);
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
