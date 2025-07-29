import { IsString, IsOptional, IsMongoId, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateGovernmentIdDto {
  @ApiProperty({ 
    description: 'MongoDB ObjectId of the criminal this government ID belongs to',
    example: '507f1f77bcf86cd799439011',
    format: 'ObjectId'
  })
  @IsMongoId()
  criminalId: string;

  @ApiPropertyOptional({ 
    description: 'Aadhar number (12-digit unique identification number)',
    example: '123456789012',
    pattern: '^[0-9]{12}$',
    maxLength: 12
  })
  @IsOptional()
  @IsString()
  aadharNumber?: string;

  @ApiPropertyOptional({ 
    description: 'PAN (Permanent Account Number) for tax purposes',
    example: 'ABCDE1234F',
    pattern: '^[A-Z]{5}[0-9]{4}[A-Z]{1}$',
    maxLength: 10
  })
  @IsOptional()
  @IsString()
  panNumber?: string;

  @ApiPropertyOptional({ 
    description: 'Voter ID number issued by Election Commission',
    example: 'ABC1234567',
    maxLength: 20
  })
  @IsOptional()
  @IsString()
  voterIdNumber?: string;

  @ApiPropertyOptional({ 
    description: 'Place where the Voter ID was issued',
    example: 'Mumbai, Maharashtra',
    maxLength: 100
  })
  @IsOptional()
  @IsString()
  voterIssuePlace?: string;

  @ApiPropertyOptional({ 
    description: 'Passport number issued by Passport Office',
    example: 'A1234567',
    maxLength: 20
  })
  @IsOptional()
  @IsString()
  passportNumber?: string;

  @ApiPropertyOptional({ 
    description: 'Place where the passport was issued',
    example: 'Mumbai Passport Office, Maharashtra',
    maxLength: 100
  })
  @IsOptional()
  @IsString()
  passportIssuePlace?: string;

  @ApiPropertyOptional({ 
    description: 'Passport expiry date in ISO 8601 format',
    example: '2030-12-31',
    format: 'date'
  })
  @IsOptional()
  @IsDateString()
  passportExpiry?: string;

  @ApiPropertyOptional({ 
    description: 'Visa details including type, country, and validity',
    example: 'Tourist Visa - USA, Valid until 2024-06-15',
    maxLength: 200
  })
  @IsOptional()
  @IsString()
  visaDetails?: string;

  @ApiPropertyOptional({ 
    description: 'Driving license number issued by RTO',
    example: 'DL-0120110149646',
    maxLength: 20
  })
  @IsOptional()
  @IsString()
  drivingLicense?: string;

  @ApiPropertyOptional({ 
    description: 'Ration card number for food security',
    example: '123456789012345',
    maxLength: 20
  })
  @IsOptional()
  @IsString()
  rationCard?: string;

  @ApiPropertyOptional({ 
    description: 'Place where the ration card was issued',
    example: 'Food and Civil Supplies Office, Delhi',
    maxLength: 100
  })
  @IsOptional()
  @IsString()
  rationCardIssuePlace?: string;
} 