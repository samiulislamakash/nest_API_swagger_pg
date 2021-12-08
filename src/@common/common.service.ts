import { Repository, ILike } from 'typeorm';

export abstract class CommonService<Entity> extends Repository<Entity> {
  _repository: Repository<Entity>;

  constructor(private repository: any) {
    super();
    this._repository = this.repository;
  }

  async _create(payload: any, relations?: string[]): Promise<any> {
    try {
      const { id } = await this._repository.save(payload);
      return await this._repository.findOne(id, {
        relations,
      });
    } catch (e) {
      throw e;
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
      return newData;
    } catch (e) {
      throw e;
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
      return updateData;
    } catch (e) {
      throw e;
    }
  }

  async _bulkDelete(ids: string[]) {
    try {
      return await this._repository.softDelete(ids);
    } catch (e) {
      throw e;
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
        let data = {
          payload,
          count,
          take,
          page: page + 1,
        };
        return data;
      } else {
        const [payload, count] = await this._repository.findAndCount({
          take,
          skip,
          //  order: {
          //    updatedAt: 'DESC',
          //  },
          relations,
        });
        let data = {
          payload,
          count,
          take,
          page: page + 1,
        };
        return data;
      }
    } catch (e) {
      throw e;
    }
  }

  async _getById(id: string | number, relations?: string[]) {
    try {
      return await this._repository.findOne(id, {
        relations,
      });
    } catch (e) {
      throw e;
    }
  }

  async _update(id: string | number, payload: any, relations?: string[]) {
    try {
      await this._repository.update(id, payload);
      return await this._repository.findOne(id, {
        relations,
      });
    } catch (e) {
      throw e;
    }
  }

  async _remove(id: string | number) {
    try {
      return await this._repository.softDelete(id);
    } catch (e) {
      throw e;
    }
  }
}
