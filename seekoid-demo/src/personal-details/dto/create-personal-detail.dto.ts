import { IsString, IsOptional, IsMongoId, IsEnum, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SmokingHabit, DrinkingHabit, DrugHabit } from '../../common/enums';

export class CreatePersonalDetailDto {
  @ApiProperty({ 
    description: 'MongoDB ObjectId of the criminal this personal detail belongs to',
    example: '507f1f77bcf86cd799439011',
    format: 'ObjectId'
  })
  @IsMongoId()
  criminalId: string;

  @ApiPropertyOptional({ 
    description: 'Skin complexion or skin tone of the criminal',
    example: 'Fair, Wheatish, Dark, Olive',
    maxLength: 50
  })
  @IsOptional()
  @IsString()
  complexion?: string;

  @ApiPropertyOptional({ 
    description: 'Eye color of the criminal',
    example: 'Brown, Blue, Green, Hazel, Black',
    maxLength: 30
  })
  @IsOptional()
  @IsString()
  eyeColor?: string;

  @ApiPropertyOptional({ 
    description: 'Detailed description of hair including color, length, and style',
    example: 'Black, short, straight hair',
    maxLength: 100
  })
  @IsOptional()
  @IsString()
  hairDescription?: string;

  @ApiPropertyOptional({ 
    description: 'Description of beard if present',
    example: 'Full beard, Goatee, Clean shaven, Stubble',
    maxLength: 50
  })
  @IsOptional()
  @IsString()
  beard?: string;

  @ApiPropertyOptional({ 
    description: 'Description of moustache if present',
    example: 'Handlebar moustache, Clean shaven, Thin moustache',
    maxLength: 50
  })
  @IsOptional()
  @IsString()
  moustache?: string;

  @ApiPropertyOptional({ 
    description: 'Native or first language of the criminal',
    example: 'Hindi, English, Marathi, Tamil',
    maxLength: 50
  })
  @IsOptional()
  @IsString()
  motherTongue?: string;

  @ApiPropertyOptional({ 
    type: [String], 
    description: 'Languages that the criminal can speak or understand',
    example: ['Hindi', 'English', 'Marathi'],
    maxItems: 10
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  knownLanguages?: string[];

  @ApiPropertyOptional({ 
    enum: SmokingHabit, 
    description: 'Smoking habits and frequency',
    example: SmokingHabit.NO
  })
  @IsOptional()
  @IsEnum(SmokingHabit)
  smoking?: SmokingHabit;

  @ApiPropertyOptional({ 
    enum: DrinkingHabit, 
    description: 'Alcohol consumption habits and frequency',
    example: DrinkingHabit.OCCASIONAL
  })
  @IsOptional()
  @IsEnum(DrinkingHabit)
  drinking?: DrinkingHabit;

  @ApiPropertyOptional({ 
    enum: DrugHabit, 
    description: 'Drug usage habits and frequency',
    example: DrugHabit.NO
  })
  @IsOptional()
  @IsEnum(DrugHabit)
  drugs?: DrugHabit;

  @ApiPropertyOptional({ 
    description: 'Information about sexual habits or preferences',
    example: 'Married, Single, Divorced',
    maxLength: 100
  })
  @IsOptional()
  @IsString()
  sexualHabits?: string;

  @ApiPropertyOptional({ 
    type: [String], 
    description: 'Hobbies and recreational activities',
    example: ['Reading', 'Gaming', 'Sports', 'Music'],
    maxItems: 15
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  hobbies?: string[];

  @ApiPropertyOptional({ 
    type: [String], 
    description: 'Vices or negative habits',
    example: ['Gambling', 'Aggressive behavior', 'Lying'],
    maxItems: 10
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  vices?: string[];
} 