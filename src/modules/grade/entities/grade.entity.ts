import { Student } from './../../student/entities/student.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('greads')
export class Grade {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  letter: string;

  @OneToMany(
    () => Student,
    student => student.grade,
  )
  student: Student[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
