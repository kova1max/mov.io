import { ApiProperty } from '@nestjs/swagger';

export class UpdateParameter {
  @ApiProperty({
    type: 'string',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  public readonly secret?: string;
}
