import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDto {
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  email: string;
  parantsInfo?: string;
  @ApiProperty()
  class: string;
  @ApiProperty()
  shift: string;
  @ApiProperty()
  department: string;
  @ApiProperty()
  phone_number: string;
}
