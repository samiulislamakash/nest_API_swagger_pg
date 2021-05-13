import { ApiProperty } from '@nestjs/swagger';

export class BulkDeleteUserDto {
  @ApiProperty()
  ids: string[];
}
