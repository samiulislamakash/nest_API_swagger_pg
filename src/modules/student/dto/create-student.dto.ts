import { Teacher } from './../../teacher/entities/teacher.entity';
import { Grade } from './../../grade/entities/grade.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDto {
  @ApiProperty()
  firstName?: string;

  @ApiProperty()
  lastName?: string;

  @ApiProperty()
  phone_number?: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ required: false })
  grade?: string;

  @ApiProperty({ required: false })
  teacher?: string[];
}
