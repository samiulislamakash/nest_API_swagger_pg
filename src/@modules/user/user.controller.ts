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
  create(@Body() payload: UserDto) {
    return this.userService.create(payload);
  }

  @Post('bulkCreate')
  @ApiBody({ type: [UserDto] })
  bulkCreate(@Body() payload: UserDto[]) {
    return this.userService.bulkCreate(payload);
  }

  @Post('login')
  login(@Body() payload: UserLoginDto) {
    return this.userService.login(payload);
  }

  @Post('resetPassword')
  resetPassword(@Body() payload: UserPasswordResetDto) {
    return this.userService.resetPassword(payload);
  }

  @Post('refreshToken')
  refreshToken(@Body() payload: RefreshTokenUser) {
    return this.userService.refreshToken(payload);
  }

  @Get()
  filter(@Query() param: filterUser) {
    return this.userService.filter(param);
  }

  @Put('bulkUpdate')
  bulkUpdate(@Body() payload: BulkUpdateUserDto) {
    return this.userService.bulkUpdate(payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UserUpdateDto) {
    return this.userService.update(id, payload);
  }

  @Delete('bulkDelete')
  bulkDelete(@Body() payload: BulkDeleteUserDto) {
    return this.userService.bulkRemove(payload.ids);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
