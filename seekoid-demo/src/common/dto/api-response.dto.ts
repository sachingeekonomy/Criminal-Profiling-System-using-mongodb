import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseDto<T> {
  @ApiProperty({ description: 'Response status code' })
  statusCode: number;

  @ApiProperty({ description: 'Response message' })
  message: string;

  @ApiProperty({ description: 'Response data' })
  data?: T;

  @ApiProperty({ description: 'Error details if any' })
  error?: string;
}

export class PaginatedResponseDto<T> {
  @ApiProperty({ description: 'Array of items' })
  items: T[];

  @ApiProperty({ description: 'Total number of items' })
  total: number;

  @ApiProperty({ description: 'Current page number' })
  page: number;

  @ApiProperty({ description: 'Number of items per page' })
  limit: number;

  @ApiProperty({ description: 'Total number of pages' })
  totalPages: number;
}

export class ErrorResponseDto {
  @ApiProperty({ description: 'HTTP status code' })
  statusCode: number;

  @ApiProperty({ description: 'Error message' })
  message: string;

  @ApiProperty({ description: 'Error type' })
  error: string;

  @ApiProperty({ description: 'Timestamp of the error' })
  timestamp: string;
}

export class HealthCheckResponseDto {
  @ApiProperty({ description: 'Health status', example: 'ok' })
  status: string;

  @ApiProperty({ description: 'Current timestamp', example: '2024-01-15T10:30:00.000Z' })
  timestamp: string;

  @ApiProperty({ description: 'Application uptime in seconds', example: 3600 })
  uptime: number;

  @ApiProperty({ description: 'API version', example: '1.0.0' })
  version: string;

  @ApiProperty({ description: 'Environment', example: 'development' })
  environment: string;
} 