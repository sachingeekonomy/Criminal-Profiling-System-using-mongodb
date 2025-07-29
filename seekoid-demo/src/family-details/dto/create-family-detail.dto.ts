import { IsString, IsOptional, IsMongoId, IsNumber, IsArray, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateFamilyDetailDto {
  @ApiProperty({ 
    description: 'MongoDB ObjectId of the criminal this family detail belongs to',
    example: '507f1f77bcf86cd799439011',
    format: 'ObjectId'
  })
  @IsMongoId()
  criminalId: string;

  @ApiPropertyOptional({ 
    description: 'Full name of the criminal\'s father',
    example: 'Ram Kumar Sharma',
    maxLength: 100
  })
  @IsOptional()
  @IsString()
  fatherName?: string;

  @ApiPropertyOptional({ 
    description: 'Occupation or profession of the father',
    example: 'Retired Government Employee, Business Owner, Farmer',
    maxLength: 100
  })
  @IsOptional()
  @IsString()
  fatherOccupation?: string;

  @ApiPropertyOptional({ 
    minimum: 0, 
    description: 'Monthly/annual income of the father in Indian Rupees',
    example: 45000,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  fatherIncome?: number;

  @ApiPropertyOptional({ 
    description: 'Full name of the criminal\'s mother',
    example: 'Sita Devi Sharma',
    maxLength: 100
  })
  @IsOptional()
  @IsString()
  motherName?: string;

  @ApiPropertyOptional({ 
    description: 'Occupation or profession of the mother',
    example: 'Housewife, Teacher, Nurse',
    maxLength: 100
  })
  @IsOptional()
  @IsString()
  motherOccupation?: string;

  @ApiPropertyOptional({ 
    minimum: 0, 
    description: 'Monthly/annual income of the mother in Indian Rupees',
    example: 25000,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  motherIncome?: number;

  @ApiPropertyOptional({ 
    type: [String], 
    description: 'Names of siblings (brothers and sisters)',
    example: ['Rahul Sharma', 'Priya Sharma', 'Amit Sharma'],
    maxItems: 10
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  siblings?: string[];

  @ApiPropertyOptional({ 
    type: [String], 
    description: 'Occupations of siblings in the same order as siblings array',
    example: ['Engineer', 'Doctor', 'Student'],
    maxItems: 10
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  siblingsOccupation?: string[];

  @ApiPropertyOptional({ 
    type: [Number], 
    description: 'Income of siblings in Indian Rupees in the same order as siblings array',
    example: [60000, 80000, 0],
    maxItems: 10
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  siblingsIncome?: number[];

  @ApiPropertyOptional({ 
    description: 'Full name of the criminal\'s spouse (if married)',
    example: 'Anjali Sharma',
    maxLength: 100
  })
  @IsOptional()
  @IsString()
  spouseName?: string;

  @ApiPropertyOptional({ 
    description: 'Occupation or profession of the spouse',
    example: 'Teacher, Business Owner, Unemployed',
    maxLength: 100
  })
  @IsOptional()
  @IsString()
  spouseOccupation?: string;

  @ApiPropertyOptional({ 
    minimum: 0, 
    description: 'Monthly/annual income of the spouse in Indian Rupees',
    example: 35000,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  spouseIncome?: number;

  @ApiPropertyOptional({ 
    type: [String], 
    description: 'Names of children (if any)',
    example: ['Riya Sharma', 'Arjun Sharma'],
    maxItems: 10
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  children?: string[];
} 