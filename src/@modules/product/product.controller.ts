import { ApiTags } from '@nestjs/swagger';
import { BulkUpdateProductDto } from './dto/bulk-update-product.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { BaseController } from 'src/@base/base.controller';

@ApiTags('Product')
@Controller('product')
export class ProductController extends BaseController<
  CreateProductDto,
  UpdateProductDto,
  BulkUpdateProductDto
> {
  constructor(private readonly productService: ProductService) {
    super(productService, ['']);
  }
}
