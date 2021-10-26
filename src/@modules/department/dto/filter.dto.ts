import { ApiProperty } from '@nestjs/swagger';
export class filter {
  @ApiProperty({ example: 'Anything', required: false })
  searchTerm: string;

  @ApiProperty({ example: 'id', required: false })
  id: string;

  @ApiProperty({ example: 1, required: false })
  take: number;

  @ApiProperty({ example: 10, required: false })
  page: number;
}
