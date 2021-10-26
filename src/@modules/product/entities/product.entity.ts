import { BaseEntity } from 'src/@base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('products')
export class Product extends BaseEntity {
  @Column({ nullable: false })
  name: string;
  @Column({ nullable: false })
  price: number;
}
