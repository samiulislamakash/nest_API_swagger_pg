import { UpdateDepartmentDto } from './../../department/dto/update-department.dto';
import { ApiProperty } from '@nestjs/swagger';
export class BulkUploadBrand {
  @ApiProperty()
  ids: string[];

  @ApiProperty()
  brand: UpdateDepartmentDto;
}
