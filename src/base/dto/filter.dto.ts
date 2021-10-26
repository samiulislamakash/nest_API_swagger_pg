import { ApiProperty } from '@nestjs/swagger';
export class Filter {
  @ApiProperty({ example: 'Anything', required: false })
  searchTerm: string;

  @ApiProperty({ example: 'uuid', required: false })
  id: string;

  @ApiProperty({ example: 10, required: false })
  take: number;

  @ApiProperty({ example: 1, required: false })
  page: number;
}
