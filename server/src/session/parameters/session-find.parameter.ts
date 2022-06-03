import { ApiProperty } from '@nestjs/swagger';

export class SessionFindParameter {
  @ApiProperty({
    type: 'string',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  public readonly secret?: string;

  @ApiProperty({ type: 'string', example: 'links', required: false })
  public relations?: string;
}
