import { commonResponse } from 'src/@utils/outputResponse.utils';
import { filterUser } from './dto/filterUser.dto';
import { RefreshTokenUser } from './dto/refreshTokenUser.dto';
import { UserPasswordResetDto } from './dto/userPasswordReset.dto';
import { UserLoginDto } from './dto/userLogin.dto';
import { UserUpdateDto } from './dto/userUpdate.dto';
import { BulkDeleteUserDto } from './dto/bulkDeleteUser.dto';
import { BulkUpdateUserDto } from './dto/bulkUpdateUser.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() payload: UserDto) {
    try {
      return commonResponse(
        true,
        'User Create Successfull.',
        await this.userService.create(payload),
      );
    } catch (e) {
      return commonResponse(false, 'User Create Error', e);
    }
  }

  @Post('bulkCreate')
  @ApiBody({ type: [UserDto] })
  async bulkCreate(@Body() payload: UserDto[]) {
    try {
      return commonResponse(
        true,
        'User Bulk Create Successfull.',
        await this.userService.bulkCreate(payload),
      );
    } catch (e) {
      return commonResponse(false, 'User Bulk Create Error', e);
    }
  }

  @Post('login')
  async login(@Body() payload: UserLoginDto) {
    try {
      return commonResponse(
        true,
        'User Login Successfull.',
        await this.userService.login(payload),
      );
    } catch (e) {
      return commonResponse(false, 'User Login Error', e);
    }
  }

  @Post('resetPassword')
  async resetPassword(@Body() payload: UserPasswordResetDto) {
    try {
      return await this.userService.resetPassword(payload);
    } catch (e) {
      return commonResponse(false, 'User Reset Password Error', e);
    }
  }

  @Post('refreshToken')
  async refreshToken(@Body() payload: RefreshTokenUser) {
    try {
      return await this.userService.refreshToken(payload);
    } catch (e) {
      return commonResponse(false, 'User Refresh Token Error', e);
    }
  }

  @Get()
  async filter(@Query() param: filterUser) {
    try {
      return commonResponse(
        true,
        'User Filter Successfull.',
        await this.userService.filter(param),
      );
    } catch (e) {
      return commonResponse(false, 'User Filer Error', e);
    }
  }

  @Put('bulkUpdate')
  async bulkUpdate(@Body() payload: BulkUpdateUserDto) {
    try {
      return commonResponse(
        true,
        'User Bulk Update Successfull.',
        await this.userService.bulkUpdate(payload),
      );
    } catch (e) {
      return commonResponse(false, 'User Bulk Update Error', e);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() payload: UserUpdateDto) {
    try {
      return commonResponse(
        true,
        'User Update Successfull.',
        await this.userService.update(id, payload),
      );
    } catch (e) {
      return commonResponse(false, 'User Update Error', e);
    }
  }

  @Delete('bulkDelete')
  async bulkDelete(@Body() payload: BulkDeleteUserDto) {
    try {
      return commonResponse(
        true,
        'User Bulk Delete Successfull.',
        await this.userService.bulkRemove(payload.ids),
      );
    } catch (e) {
      return commonResponse(false, 'User Bulk Delete Error', e);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return commonResponse(
        true,
        'User Delete Successfull.',
        await this.userService.remove(id),
      );
    } catch (e) {
      return commonResponse(false, 'User Delete Error', e);
    }
  }
}
