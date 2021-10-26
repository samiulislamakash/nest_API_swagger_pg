import { ApiProperty } from '@nestjs/swagger';
export class UpdateCategoryDto {
  @ApiProperty({ required: false })
  isActive?: boolean;

  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({ required: false })
  thumb?: string;

  @ApiProperty({ required: false })
  department?: string;
}
