import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Injectable } from '@nestjs/common';
import { CommonService } from 'src/@common/common.service';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService extends CommonService<Product> {
  constructor(
    @InjectRepository(Product)
    public readonly _repository: Repository<Product>,
  ) {
    super(_repository);
  }
}
