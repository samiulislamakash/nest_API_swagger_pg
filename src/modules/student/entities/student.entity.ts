import { Teacher } from './../../teacher/entities/teacher.entity';
import { Grade } from 'src/modules/grade/entities/grade.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column()
  phone_number: string;

  @Column()
  email: string;

  @ManyToOne(
    () => Grade,
    grede => grede.student,
  )
  grade: Grade;

  @ManyToMany(
    () => Teacher,
    teacher => teacher.student,
  )
  teacher: Teacher[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
