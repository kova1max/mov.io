import { ApiProperty } from '@nestjs/swagger';

export class UserFindParameter {
  @ApiProperty({ type: 'string', example: 'J. K. Rowling', required: false })
  public readonly fullName?: string;

  @ApiProperty({ type: 'string', example: 'sessions', required: false })
  public relations?: string;
}
