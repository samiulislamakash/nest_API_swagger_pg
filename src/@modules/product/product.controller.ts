import { ApiTags, ApiBody } from '@nestjs/swagger';
import { BulkUpdateProductDto } from './dto/bulk-update-product.dto';
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
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Filter } from 'src/@base/dto/filter.dto';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  modelRelations: string[] = [];

  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() payload: CreateProductDto): Promise<any> {
    return this.productService._create(payload, this.modelRelations);
  }

  @Post('bulkCreate')
  @ApiBody({ type: [CreateProductDto] })
  bulkCreate(@Body() payload: CreateProductDto[]): Promise<any> {
    return this.productService._bulkCreate(payload, this.modelRelations);
  }

  @Patch('bulkUpdate')
  bulkUpdate(@Body() payload: BulkUpdateProductDto): Promise<any> {
    console.log(payload);
    return this.productService._bulkUpdate(payload, this.modelRelations);
  }

  @Delete('bulkDelete')
  bulkDelete(@Body() payload: string[]): Promise<any> {
    return this.productService._bulkDelete(payload);
  }

  @Get()
  filter(@Query() query: Filter): Promise<any> {
    console.log(query);
    return this.productService._filter(query, this.modelRelations);
  }

  @Get(':id')
  getById(@Param('id') id: string): Promise<any> {
    return this.productService._getById(id, this.modelRelations);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() payload: UpdateProductDto,
  ): Promise<any> {
    return this.productService._update(id, payload, this.modelRelations);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<any> {
    return this.productService._remove(id);
  }
}
