import { ApiProperty } from '@nestjs/swagger';

export class UserPasswordResetDto {
  @ApiProperty()
  token: string;

  @ApiProperty()
  oldPassword: string;

  @ApiProperty()
  newPassword: string;
}
