import { UpdateCategoryDto } from './dto/update-category.dto';
import { BulkDelete } from './../department/dto/bulk-delete.dto';
import { filter } from './../department/dto/filter.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateCategoryDto } from './dto/create-category.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { BulkUploadCategory } from './dto/bulk-update-category.dto';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() payload: CreateCategoryDto) {
    return this.categoryService.create(payload);
  }

  @Post('bulkCreate')
  @ApiBody({ type: [CreateCategoryDto] })
  bulkCreate(@Body() payload: CreateCategoryDto[]) {
    return this.categoryService.bulkCreate(payload);
  }

  @Get()
  filter(@Query() param: filter) {
    return this.categoryService.filter(param);
  }

  @Patch('bulkUpdate')
  bulkUpdate(@Body() payload: BulkUploadCategory) {
    return this.categoryService.bulkUpdate(payload);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() payload: UpdateCategoryDto) {
    return this.categoryService.update(id, payload);
  }

  @Delete('bulkDelete')
  bulkDelete(@Body() payload: BulkDelete) {
    return this.categoryService.bulkRemove(payload.ids);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
