import { UpdateCategoryDto } from './update-category.dto';
import { ApiProperty } from '@nestjs/swagger';
export class BulkUploadCategory {
  @ApiProperty()
  ids: string[];

  @ApiProperty()
  category: UpdateCategoryDto;
}
