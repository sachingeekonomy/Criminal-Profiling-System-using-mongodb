import { IsString, IsOptional, IsMongoId } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAddressDto {
  @ApiProperty({ 
    description: 'MongoDB ObjectId of the criminal this address belongs to',
    example: '507f1f77bcf86cd799439011',
    format: 'ObjectId'
  })
  @IsMongoId()
  criminalId: string;

  @ApiPropertyOptional({ 
    description: 'Address as mentioned in government-issued identification documents',
    maxLength: 500
  })
  @IsOptional()
  @IsString()
  addressAsPerGovtId?: string;

  @ApiPropertyOptional({ 
    description: 'Current residential address where the criminal currently lives',
    maxLength: 500
  })
  @IsOptional()
  @IsString()
  currentAddress?: string;

  @ApiPropertyOptional({ 
    description: 'Other known addresses or locations associated with the criminal',
    example: '789 Pine Road, Rural Village, Karnataka 560001; 321 Elm Street, Industrial Zone, Chennai 600001',
    maxLength: 1000
  })
  @IsOptional()
  @IsString()
  otherKnownAddress?: string;

  @ApiPropertyOptional({ 
    description: 'Permanent or registered address of the criminal',
    example: '654 Maple Drive, Hometown Village, Uttar Pradesh 226001',
    maxLength: 500
  })
  @IsOptional()
  @IsString()
  permanentAddress?: string;
} 