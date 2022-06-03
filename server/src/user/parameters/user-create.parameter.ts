import { ApiProperty } from '@nestjs/swagger';

export class UserCreateParameter {
  @ApiProperty({ type: 'string', example: 'J. K. Rowling' })
  public readonly fullName: string;
}
