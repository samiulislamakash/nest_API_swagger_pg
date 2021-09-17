import { BulkDelete } from './../department/dto/bulk-delete.dto';
import { UpdateDepartmentDto } from './../department/dto/update-department.dto';
import { BulkUploadBrand } from './dto/bulk-upload-brand.dto';
import { filter } from './../department/dto/filter.dto';
import { CreateDepartmentDto } from './../department/dto/create-department.dto';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { BrandService } from './brand.service';

@ApiTags('Brand')
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  create(@Body() payload: CreateDepartmentDto) {
    return this.brandService.create(payload);
  }

  @Post('bulkCreate')
  @ApiBody({ type: [CreateDepartmentDto] })
  bulkCreate(@Body() payload: CreateDepartmentDto[]) {
    return this.brandService.bulkCreate(payload);
  }

  @Get()
  filter(@Query() param: filter) {
    return this.brandService.filter(param);
  }

  @Patch('bulkUpdate')
  bulkUpdate(@Body() payload: BulkUploadBrand) {
    return this.brandService.bulkUpdate(payload);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() payload: UpdateDepartmentDto) {
    return this.brandService.update(id, payload);
  }

  @Delete('bulkDelete')
  bulkDelete(@Body() payload: BulkDelete) {
    return this.brandService.bulkRemove(payload.ids);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandService.remove(id);
  }
}
