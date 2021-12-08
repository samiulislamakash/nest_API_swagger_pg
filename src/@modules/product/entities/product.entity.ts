import { CommonEntity } from 'src/@common/common.entity';
import { Column, Entity } from 'typeorm';

@Entity('products')
export class Product extends CommonEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  price: number;
}
