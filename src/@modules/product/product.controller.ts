import { commonResponse } from 'src/@utils/outputResponse.utils';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { BulkUpdateProductDto } from './dto/bulk-update-product.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Patch,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Filter } from 'src/@common/dto/filter.dto';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  modelRelations: string[] = [];

  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() payload: CreateProductDto): Promise<any> {
    try {
      return commonResponse(
        true,
        'Product Create Successfull.',
        await this.productService._create(payload, this.modelRelations),
      );
    } catch (e) {
      return commonResponse(false, 'Product Create Error', e);
    }
  }

  @Post('bulkCreate')
  @ApiBody({ type: [CreateProductDto] })
  async bulkCreate(@Body() payload: CreateProductDto[]): Promise<any> {
    try {
      return commonResponse(
        true,
        'Product Bulk Create Successfull.',
        await this.productService._bulkCreate(payload, this.modelRelations),
      );
    } catch (e) {
      return commonResponse(false, 'Product Bulk Create Error', e);
    }
  }

  @Patch('bulkUpdate')
  async bulkUpdate(@Body() payload: BulkUpdateProductDto): Promise<any> {
    try {
      return commonResponse(
        true,
        'Product Bulk Update Successfull.',
        await this.productService._bulkUpdate(payload, this.modelRelations),
      );
    } catch (e) {
      return commonResponse(false, 'Product Bulk Update Error', e);
    }
  }

  @Delete('bulkDelete')
  async bulkDelete(@Body() payload: string[]): Promise<any> {
    try {
      return commonResponse(
        true,
        'Product Bulk Delete Successfull.',
        await this.productService._bulkDelete(payload),
      );
    } catch (e) {
      return commonResponse(false, 'Product Bulk Delete Error', e);
    }
  }

  @Get()
  async filter(@Query() query: Filter): Promise<any> {
    try {
      return commonResponse(
        true,
        'Product Filter Successfull.',
        await this.productService._filter(query, this.modelRelations),
      );
    } catch (e) {
      return commonResponse(false, 'Product Filter Error', e);
    }
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<any> {
    try {
      return commonResponse(
        true,
        'Product GetById Successfull.',
        await this.productService._getById(id, this.modelRelations),
      );
    } catch (e) {
      return commonResponse(false, 'Product GetById Error', e);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() payload: UpdateProductDto,
  ): Promise<any> {
    try {
      return commonResponse(
        true,
        'Product Update Successfull.',
        await this.productService._update(id, payload, this.modelRelations),
      );
    } catch (e) {
      return commonResponse(false, 'Product Update Error', e);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<any> {
    try {
      return commonResponse(
        true,
        'Product Delete Successfull.',
        await this.productService._remove(id),
      );
    } catch (e) {
      return commonResponse(false, 'Product Delete Error', e);
    }
  }
}
