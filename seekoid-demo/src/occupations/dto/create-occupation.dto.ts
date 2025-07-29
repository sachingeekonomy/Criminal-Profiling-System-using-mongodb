import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateOccupationDto {
  @IsMongoId()
  criminalId: string;

  @IsOptional()
  @IsString()
  occupation?: string;

  @IsOptional()
  @IsString()
  currentIncomeSource?: string;

  @IsOptional()
  @IsString()
  employerName?: string;

  @IsOptional()
  @IsString()
  employerAddress?: string;

  @IsOptional()
  @IsString()
  previousOccupation?: string;
} 