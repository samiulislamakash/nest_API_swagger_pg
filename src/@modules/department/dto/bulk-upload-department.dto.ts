import { UpdateDepartmentDto } from './update-department.dto';
import { ApiProperty } from '@nestjs/swagger';
export class BulkUploadDepartment {
  @ApiProperty()
  ids: string[];

  @ApiProperty()
  department: UpdateDepartmentDto;
}
