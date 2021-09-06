import { ApiProperty } from '@nestjs/swagger';

export class UserUpdateDto {
  @ApiProperty()
  firstName: string;

  @ApiProperty({ required: false })
  lastName: string;

  @ApiProperty()
  email: string;
}
