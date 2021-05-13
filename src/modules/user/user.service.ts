import { filterUser } from './dto/filterUser.dto';
import { RefreshTokenUser } from './dto/refreshTokenUser.dto';
import { UserPasswordResetDto } from './dto/userPasswordReset.dto';
import { BulkUpdateUserDto } from './dto/bulkUpdateUser.dto';
import { User } from './entities/user.entity';
import { getRepository, ILike, Repository } from 'typeorm';
import {
  BadRequestException,
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
  loginOutput,
  tokenOutput,
} from 'src/utils/outputMessage.utils';
import { hashString, compairePassword } from '../../utils/bcrypt.utils';
import { generateToken, decodeToken } from '../../utils/jwt.utils';

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
      return createOutput(newUser);
    } catch (e) {
      throw new InternalServerErrorException();
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
      return createOutput(newDataArray);
    } catch (e) {
      throw new InternalServerErrorException();
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
      return loginOutput(token);
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async resetPassword(payload: UserPasswordResetDto) {
    try {
      const decodeValue = await decodeToken(payload.token);
      if (decodeValue.data && decodeValue.exp) {
        if (decodeValue.exp < Date.now() / 1000) {
          return tokenOutput(false, 'Token Expire!!!');
        }
        const user = await this.userRepository.findOne({
          id: decodeValue.data.id,
        });
        if (!user) {
          return tokenOutput(false, 'Unknown Token!!!');
        }
        const isMatch = await compairePassword(
          payload.oldPassword,
          user.password,
        );
        if (!isMatch) {
          return tokenOutput(false, 'Password Not Match!!!');
        }

        const password = await hashString(payload.newPassword);
        await this.userRepository.update(user.id, { password });
        return tokenOutput(true, 'Password updated ..');
      } else {
        return tokenOutput(false, 'Unknown Token!!!');
      }
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async refreshToken(payload: RefreshTokenUser) {
    try {
      const decodeValue = await decodeToken(payload.token);
      if (decodeValue.data && decodeValue.exp) {
        if (decodeValue.exp < Date.now() / 1000) {
          return tokenOutput(false, 'Token Expire!!!');
        }
        const user = await this.userRepository.findOne({
          id: decodeValue.data.id,
        });
        if (!user) {
          return tokenOutput(false, 'Unknown Token!!!');
        }

        delete user.password;
        const token = await generateToken(user);
        return loginOutput(token);
      } else {
        return tokenOutput(false, 'Unknown Token!!!');
      }
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

        return findOutput(payload, total, take, page + 1);
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

        return findOutput(payload, total, take, page + 1);
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

        return findOutput(payload, total, take, page + 1);
      }
    } catch (e) {
      return new InternalServerErrorException();
    }
  }

  async update(id: string, payload: any) {
    try {
      await this.userRepository.update(id, payload);
      const newData = await this.userRepository.findOne(id, {
        relations: this.userRelation,
      });
      return updateOutput(newData);
    } catch (e) {
      return new InternalServerErrorException();
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
      return updateOutput(updateDataArray);
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async remove(id: string) {
    try {
      const deleteUser = await this.userRepository.delete(id);
      return deleteOutput(deleteUser);
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async bulkRemove(ids: string[]) {
    try {
      const deleteUser = await this.userRepository.delete(ids);
      return deleteOutput(deleteUser);
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
