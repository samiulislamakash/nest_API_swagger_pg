import { UserUpdateDto } from './userUpdate.dto';
import { ApiProperty } from '@nestjs/swagger';

export class BulkUpdateUserDto {
  @ApiProperty()
  ids: string[];

  @ApiProperty()
  user: UserUpdateDto;
}
