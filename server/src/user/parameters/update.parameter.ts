import { ApiProperty } from '@nestjs/swagger';

export class UpdateParameter {
  @ApiProperty({ type: 'string', example: 'J. K. Rowling', required: false })
  public readonly fullName?: string;
}
