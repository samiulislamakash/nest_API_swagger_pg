import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/@base/base.service';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService extends BaseService<Product> {
  constructor(
    @InjectRepository(Product)
    public readonly _repository: Repository<Product>,
  ) {
    super(_repository);
  }
}
