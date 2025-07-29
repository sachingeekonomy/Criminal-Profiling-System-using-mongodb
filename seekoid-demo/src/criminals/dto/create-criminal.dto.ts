import { IsString, IsEnum, IsNumber, IsOptional, IsDateString, Min, Max, IsUrl } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Gender } from '../../common/enums';

export class CreateCriminalDto {
  @ApiProperty({ 
    description: 'Full legal name of the criminal',
    example: 'John Michael Doe',
    minLength: 2,
    maxLength: 100
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({ 
    description: 'Alias, nickname, or alternative name used by the criminal',
    example: 'Johnny D, The Shadow',
    maxLength: 100
  })
  @IsOptional()
  @IsString()
  aliasName?: string;

  @ApiPropertyOptional({ 
    description: 'URL to the criminal\'s photograph or image',
    example: 'https://example.com/images/criminal-123.jpg',
    format: 'uri'
  })
  @IsOptional()
  @IsUrl()
  criminalImageUrl?: string;

  @ApiProperty({ 
    enum: Gender, 
    description: 'Gender identity of the criminal',
    example: Gender.MALE
  })
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({ 
    minimum: 0, 
    maximum: 150, 
    description: 'Current age of the criminal in years',
    example: 35
  })
  @IsNumber()
  @Min(0)
  @Max(150)
  age: number;

  @ApiPropertyOptional({ 
    description: 'Date of birth in ISO 8601 format',
    example: '1988-05-15',
    format: 'date'
  })
  @IsOptional()
  @IsDateString()
  dob?: string;

  @ApiPropertyOptional({ 
    description: 'Place or city where the criminal was born',
    example: 'Mumbai, Maharashtra',
    maxLength: 100
  })
  @IsOptional()
  @IsString()
  placeOfBirth?: string;
} 