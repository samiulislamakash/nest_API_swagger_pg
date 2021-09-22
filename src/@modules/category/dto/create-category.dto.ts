import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty()
  isActive?: boolean;

  @ApiProperty()
  name?: string;

  @ApiProperty()
  thumb?: string;

  @ApiProperty({ example: 'departmentId' })
  department?: string;
}
