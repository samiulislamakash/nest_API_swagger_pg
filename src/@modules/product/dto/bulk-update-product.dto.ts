import { CreateProductDto } from './create-product.dto';
import { ApiProperty } from '@nestjs/swagger';

export class BulkUpdateProductDto {
  @ApiProperty({ example: "['uuid']" })
  ids: string[];

  @ApiProperty()
  data: CreateProductDto;
}
