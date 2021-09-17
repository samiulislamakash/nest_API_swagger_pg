import { ApiProperty } from '@nestjs/swagger';

export class UpdateDepartmentDto {
  @ApiProperty({ required: false })
  isActive?: boolean;

  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({ required: false })
  thumb?: string;
}
