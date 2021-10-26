import { ApiProperty } from '@nestjs/swagger';

export class CreateDepartmentDto {
  @ApiProperty()
  isActive?: boolean;

  @ApiProperty()
  name?: string;

  @ApiProperty()
  thumb?: string;
}
