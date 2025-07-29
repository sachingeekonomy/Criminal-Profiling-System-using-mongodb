import { IsString, IsOptional, IsMongoId } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEducationDetailDto {
  @ApiProperty({ 
    description: 'MongoDB ObjectId of the criminal this education detail belongs to',
    example: '507f1f77bcf86cd799439011',
    format: 'ObjectId'
  })
  @IsMongoId()
  criminalId: string;

  @ApiPropertyOptional({ 
    description: 'School education details including institution name and completion status',
    example: 'St. Mary\'s High School, Mumbai - Completed 10th standard in 2005',
    maxLength: 300
  })
  @IsOptional()
  @IsString()
  school?: string;

  @ApiPropertyOptional({ 
    description: 'Pre-University Course (PUC) or 11th-12th standard education details',
    example: 'Delhi Public School, Science Stream - Completed 12th standard in 2007',
    maxLength: 300
  })
  @IsOptional()
  @IsString()
  puc?: string;

  @ApiPropertyOptional({ 
    description: 'Graduation or higher education details including degree and institution',
    example: 'Bachelor of Engineering in Computer Science, Mumbai University - Completed in 2011',
    maxLength: 400
  })
  @IsOptional()
  @IsString()
  graduation?: string;

  @ApiPropertyOptional({ 
    description: 'Current occupation and primary source of income',
    example: 'Unemployed, Previously worked as Software Developer at Tech Corp',
    maxLength: 300
  })
  @IsOptional()
  @IsString()
  presentOccupationAndSourceOfIncome?: string;

  @ApiPropertyOptional({ 
    description: 'Name of current or last employer',
    example: 'Tech Solutions Pvt Ltd, ABC Corporation',
    maxLength: 200
  })
  @IsOptional()
  @IsString()
  employerName?: string;

  @ApiPropertyOptional({ 
    description: 'Address of current or last employer',
    example: '123 Business Park, Tech Street, Bangalore, Karnataka 560001',
    maxLength: 500
  })
  @IsOptional()
  @IsString()
  employerAddress?: string;

  @ApiPropertyOptional({ 
    description: 'Previous occupation or job history',
    example: 'Software Developer, Sales Executive, Student',
    maxLength: 300
  })
  @IsOptional()
  @IsString()
  previousOccupation?: string;
} 