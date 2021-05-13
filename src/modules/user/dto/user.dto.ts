import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  firstName: string;

  @ApiProperty({ required: false })
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
