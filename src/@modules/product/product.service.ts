import { Product } from './entities/product.entity';
import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/@base/base.service';

@Injectable()
export class ProductService extends BaseService<Product> {}
