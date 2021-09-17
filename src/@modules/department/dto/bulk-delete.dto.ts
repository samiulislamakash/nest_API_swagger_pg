import { ApiProperty } from '@nestjs/swagger';
export class BulkDelete {
  @ApiProperty()
  ids: string[];
}
