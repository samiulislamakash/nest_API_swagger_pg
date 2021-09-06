import { ApiProperty } from '@nestjs/swagger';
export class RefreshTokenUser {
  @ApiProperty()
  token: string;
}
