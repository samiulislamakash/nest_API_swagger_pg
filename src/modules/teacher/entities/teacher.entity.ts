import { Subject } from './../../subject/entities/subject.entity';
import { Student } from './../../student/entities/student.entity';
import {
  Column,
  CreateDateColumn,
  ManyToMany,
  UpdateDateColumn,
} from 'typeorm';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('teachers')
export class Teacher {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phone_number: string;

  @Column()
  email: string;

  @ManyToMany(
    () => Student,
    student => student.teacher,
  )
  student?: Student[];

  @ManyToMany(() => Subject)
  subject?: Subject[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
