import { Department } from './../../department/entities/department.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('categorys')
export class Category {
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

  @ManyToOne(
    () => Department,
    department => department.category,
  )
  department?: Department;
}
