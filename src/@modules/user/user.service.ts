import { RefreshTokenUser } from './dto/refreshTokenUser.dto';
import { UserPasswordResetDto } from './dto/userPasswordReset.dto';
import { BulkUpdateUserDto } from './dto/bulkUpdateUser.dto';
import { User } from './entities/user.entity';
import { ILike, Repository } from 'typeorm';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashString, compairePassword } from '../../@utils/bcrypt.utils';
import { generateToken, decodeToken } from '../../@utils/jwt.utils';
import { commonResponse } from 'src/@utils/outputResponse.utils';

@Injectable()
export class UserService {
  userRelation: string[] = [];

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(payload: any) {
    try {
      // password hassing
      payload.password = await hashString(payload.password);

      // save user
      const user = await this.userRepository.save(payload);
      const newUser = await this.userRepository.findOne(user.id, {
        relations: this.userRelation,
      });
      delete newUser.password;
      return newUser;
    } catch (e) {
      throw e;
    }
  }

  async bulkCreate(payload: any[]) {
    try {
      // password hassing
      for (let j = 0; j < payload.length; j++) {
        payload[j].password = await hashString(payload[j].password);
      }
      //create multiple user
      const users = await this.userRepository.save(payload);
      let newDataArray: User[] = [];
      for (let i = 0; i < users.length; i++) {
        const data = await this.userRepository.findOne(users[i].id, {
          relations: this.userRelation,
        });
        delete data.password;
        newDataArray.push(data);
      }
      return newDataArray;
    } catch (e) {
      throw e;
    }
  }

  async login(payload: any) {
    try {
      const user = await this.userRepository.findOne({ email: payload.email });
      if (!user) {
        return new NotFoundException();
      }
      const isMatch = await compairePassword(payload.password, user.password);
      if (!isMatch) {
        return new BadRequestException();
      }
      delete user.password;
      const token = await generateToken(user);
      return token;
    } catch (e) {
      throw e;
    }
  }

  async resetPassword(payload: UserPasswordResetDto) {
    try {
      const decodeValue = await decodeToken(payload.token);
      if (decodeValue.data && decodeValue.exp) {
        if (decodeValue.exp < Date.now() / 1000) {
          return commonResponse(false, 'Token Expire!!!', {});
        }
        const user = await this.userRepository.findOne({
          id: decodeValue.data.id,
        });
        if (!user) {
          return commonResponse(false, 'Unknown Token!!!', {});
        }

        const password = await hashString(payload.newPassword);
        await this.userRepository.update(user.id, { password });
        return commonResponse(true, 'Password updated ..', {});
      } else {
        return commonResponse(false, 'Unknown Token!!!', {});
      }
    } catch (e) {
      throw e;
    }
  }

  async refreshToken(payload: RefreshTokenUser) {
    try {
      const decodeValue = await decodeToken(payload.token);
      if (decodeValue.data && decodeValue.exp) {
        const user = await this.userRepository.findOne({
          id: decodeValue.data.id,
        });
        if (!user) {
          return commonResponse(false, 'Unknown Token!!!', {});
        }

        delete user.password;
        const token = await generateToken(user);
        return commonResponse(true, 'Refresh Token Successfull.', token);
      } else {
        return commonResponse(false, 'Unknown Token!!!', {});
      }
    } catch (e) {
      throw e;
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

      if (param.searchTerm) {
        const searchTerm = param.searchTerm;
        delete param.searchTerm;
        let whereData = [
          {
            firstName: ILike(`%${searchTerm}%`),
            ...param,
          },
          {
            lastName: ILike(`%${searchTerm}%`),
            ...param,
          },
          {
            email: ILike(`%${searchTerm}%`),
            ...param,
          },
        ];

        const [payload, total] = await this.userRepository.findAndCount({
          select: [
            'id',
            'firstName',
            'lastName',
            'email',
            'createdAt',
            'updatedAt',
          ],
          where: whereData,
          skip,
          take,
          order: {
            updatedAt: 'DESC',
          },
        });
        let data = {
          payload,
          total,
          take,
          page: page + 1,
        };
        return data;
      } else if (!param.searchTerm && Object.keys(param).length > 0) {
        const [payload, total] = await this.userRepository.findAndCount({
          select: [
            'id',
            'firstName',
            'lastName',
            'email',
            'createdAt',
            'updatedAt',
          ],
          where: [param],
          skip,
          take,
          order: {
            updatedAt: 'DESC',
          },
        });
        let data = {
          payload,
          total,
          take,
          page: page + 1,
        };
        return data;
      } else {
        const [payload, total] = await this.userRepository.findAndCount({
          select: [
            'id',
            'firstName',
            'lastName',
            'email',
            'createdAt',
            'updatedAt',
          ],
          skip,
          take,
          order: {
            updatedAt: 'DESC',
          },
        });
        let data = {
          payload,
          total,
          take,
          page: page + 1,
        };
        return data;
      }
    } catch (e) {
      throw e;
    }
  }

  async update(id: string, payload: any) {
    try {
      await this.userRepository.update(id, payload);
      return await this.userRepository.findOne(id, {
        relations: this.userRelation,
      });
    } catch (e) {
      throw e;
    }
  }

  async bulkUpdate(payload: BulkUpdateUserDto) {
    try {
      const { ids, user } = payload;
      await this.userRepository.update(ids, user);
      let updateDataArray: User[] = [];
      for (let i = 0; i < ids.length; i++) {
        const data = await this.userRepository.findOne(ids[i], {
          relations: this.userRelation,
        });
        updateDataArray.push(data);
      }
      return updateDataArray;
    } catch (e) {
      throw e;
    }
  }

  async remove(id: string) {
    try {
      return await this.userRepository.delete(id);
    } catch (e) {
      throw e;
    }
  }

  async bulkRemove(ids: string[]) {
    try {
      return await this.userRepository.delete(ids);
    } catch (e) {
      throw e;
    }
  }
}
