import { ApiProperty } from '@nestjs/swagger';

export class UserUpdateParameter {
  @ApiProperty({ type: 'string', example: 'J. K. Rowling', required: false })
  public readonly fullName?: string;
}
