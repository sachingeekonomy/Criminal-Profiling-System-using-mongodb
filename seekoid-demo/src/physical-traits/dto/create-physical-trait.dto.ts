import { IsMongoId, IsOptional, IsNumber, IsString, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePhysicalTraitDto {

  @ApiProperty({ type: String, description: 'ID of the associated criminal', example: '60d0fe4f5311236168a109ca' })
  @IsMongoId()
  criminalId: string;

  @ApiPropertyOptional({ type: Number, description: 'Height of the individual in centimeters', example: 175 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  height?: number;

  @ApiPropertyOptional({ type: Number, description: 'Weight of the individual in kilograms', example: 70 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  weight?: number;

  @ApiPropertyOptional({ type: String, description: 'Complexion of the individual', example: 'Fair' })
  @IsOptional()
  @IsString()
  complexion?: string;

  @ApiPropertyOptional({ type: String, description: 'Eye color of the individual', example: 'Brown' })
  @IsOptional()
  @IsString()
  eyeColor?: string;

  @ApiPropertyOptional({ type: String, description: 'Description of the hair', example: 'Short black hair' })
  @IsOptional()
  @IsString()
  hairDescription?: string;

  @ApiPropertyOptional({ type: String, description: 'Beard description', example: 'Full beard' })
  @IsOptional()
  @IsString()
  beard?: string;

  @ApiPropertyOptional({ type: String, description: 'Moustache description', example: 'Thin moustache' })
  @IsOptional()
  @IsString()
  moustache?: string;

  @ApiPropertyOptional({ type: String, description: 'Identification mark(s) on the individual', example: 'Scar on left cheek' })
  @IsOptional()
  @IsString()
  identificationMark?: string;
} 