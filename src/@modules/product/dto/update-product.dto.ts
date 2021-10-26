import { ApiProperty } from '@nestjs/swagger';
export class UpdateProductDto {
  @ApiProperty({ example: 'Banana', required: false })
  name?: string;

  @ApiProperty({ example: 40.09, required: false })
  price?: number;
}
