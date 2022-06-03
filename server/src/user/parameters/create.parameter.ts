import { ApiProperty } from '@nestjs/swagger';

export class CreateParameter {
  @ApiProperty({ type: 'string', example: 'J. K. Rowling' })
  public readonly fullName: string;
}
