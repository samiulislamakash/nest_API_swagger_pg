import { ApiBody, ApiTags } from '@nestjs/swagger';
import { filter } from './dto/filter.dto';
import { BulkUploadDepartment } from './dto/bulk-upload-department.dto';
import { BulkDelete } from './dto/bulk-delete.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  Patch,
} from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@ApiTags('Department')
@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  create(@Body() payload: CreateDepartmentDto) {
    return this.departmentService.create(payload);
  }

  @Post('bulkCreate')
  @ApiBody({ type: [CreateDepartmentDto] })
  bulkCreate(@Body() payload: CreateDepartmentDto[]) {
    return this.departmentService.bulkCreate(payload);
  }

  @Get()
  filter(@Query() param: filter) {
    return this.departmentService.filter(param);
  }

  @Patch('bulkUpdate')
  bulkUpdate(@Body() payload: BulkUploadDepartment) {
    return this.departmentService.bulkUpdate(payload);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() payload: UpdateDepartmentDto) {
    return this.departmentService.update(id, payload);
  }

  @Delete('bulkDelete')
  bulkDelete(@Body() payload: BulkDelete) {
    return this.departmentService.bulkRemove(payload.ids);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.departmentService.remove(id);
  }
}
