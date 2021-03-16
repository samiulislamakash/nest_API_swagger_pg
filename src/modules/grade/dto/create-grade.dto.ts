import { ApiProperty } from '@nestjs/swagger';
export class CreateGradeDto {
  @ApiProperty()
  letter: string;
}
