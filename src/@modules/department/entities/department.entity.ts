import { Category } from 'src/@modules/category/entities/category.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('departments')
export class Department {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @Column({ nullable: true, default: false })
  isActive?: boolean;

  @Column()
  name?: string;

  @Column({ nullable: true, default: null })
  thumb?: string;

  @OneToMany(
    () => Category,
    category => category.department,
  )
  category?: Category[];
}
