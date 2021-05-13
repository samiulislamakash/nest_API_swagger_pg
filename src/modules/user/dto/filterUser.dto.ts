import { ApiProperty } from '@nestjs/swagger';

export class filterUser {
  @ApiProperty({ example: 'Anything', required: false })
  searchTerm: string;

  @ApiProperty({ example: 'User Id', required: false })
  id: string;

  @ApiProperty({ example: 1, required: false })
  take: number;

  @ApiProperty({ example: 10, required: false })
  page: number;
}
