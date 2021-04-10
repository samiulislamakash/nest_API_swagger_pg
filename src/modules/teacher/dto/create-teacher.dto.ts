import { Subject } from './../../subject/entities/subject.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTeacherDto {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  phone_number: string;

  @ApiProperty()
  email: string;
}
