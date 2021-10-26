import { InternalServerErrorException } from '@nestjs/common';
import {
  createOutput,
  deleteOutput,
  findOutput,
  getByIdOutput,
  updateOutput,
} from 'src/utils/outputMessage.utils';
import { Repository, ILike } from 'typeorm';

export abstract class BaseService<Entity> extends Repository<Entity> {
  _repository: Repository<Entity>;

  constructor(private repository: any) {
    super();
    this._repository = this.repository;
  }

  async _create(payload: any, relations?: string[]): Promise<any> {
    try {
      const { id } = await this._repository.save(payload);
      const res = await this._repository.findOne(id, {
        relations,
      });
      return createOutput(res);
    } catch (e) {
      console.error(e);
      return new InternalServerErrorException();
    }
  }

  async _bulkCreate(payload: any, relations?: string[]) {
    try {
      const save_res = await this._repository.save(payload);
      let newData: any[] = [];
      for (let i = 0; i < save_res.length; i++) {
        const data = await this._repository.findOne(save_res[i].id, {
          relations,
        });
        newData.push(data);
      }
      return createOutput(newData);
    } catch (e) {
      console.error(e);
      return new InternalServerErrorException();
    }
  }

  async _bulkUpdate(payload: any, relations?: string[]) {
    try {
      const { ids, data } = payload;
      await this._repository.update(ids, data);
      let updateData: any[] = [];
      for (let i = 0; i < ids.length; i++) {
        const data = await this._repository.findOne(ids[i], { relations });
        updateData.push(data);
      }
      return updateOutput(updateData);
    } catch (e) {
      console.error(e);
      return new InternalServerErrorException();
    }
  }

  async _bulkDelete(ids: string[]) {
    try {
      const res = await this._repository.delete(ids);
      return deleteOutput(res);
    } catch (e) {
      console.error(e);
      return new InternalServerErrorException();
    }
  }

  async _filter(param: any, relations?: string[]) {
    try {
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
        const [payload, count] = await this._repository.findAndCount({
          where: whereData,
          take,
          skip,
          //  order: {
          //    updatedAt: 'DESC',
          //  },
          relations,
        });
        return findOutput(payload, count, take, page + 1);
      } else {
        const [payload, count] = await this._repository.findAndCount({
          take,
          skip,
          //  order: {
          //    updatedAt: 'DESC',
          //  },
          relations,
        });
        return findOutput(payload, count, take, page + 1);
      }
    } catch (e) {
      console.error(e);
      return new InternalServerErrorException();
    }
  }

  async _getById(id: string | number, relations?: string[]) {
    try {
      const res = await this._repository.findOne(id, {
        relations,
      });
      return getByIdOutput(res);
    } catch (e) {
      console.error(e);
      return new InternalServerErrorException();
    }
  }

  async _update(id: string | number, payload: any, relations?: string[]) {
    try {
      await this._repository.update(id, payload);
      const res = await this._repository.findOne(id, {
        relations,
      });
      return updateOutput(res);
    } catch (e) {
      console.error(e);
      return new InternalServerErrorException();
    }
  }

  async _remove(id: string | number) {
    try {
      const res = await this._repository.delete(id);
      return deleteOutput(res);
    } catch (e) {
      console.error(e);
      return new InternalServerErrorException();
    }
  }
}
