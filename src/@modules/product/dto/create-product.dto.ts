import { ApiProperty } from '@nestjs/swagger';
export class CreateProductDto {
  @ApiProperty({ example: 'Banana' })
  name: string;

  @ApiProperty({ example: 40.09 })
  price: number;
}
