import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    example: 1,
  })
  readonly page: number;
}

export interface PaginationResponse {
  total: number;
  take: number;
  skip: number;
  page: number;
}
