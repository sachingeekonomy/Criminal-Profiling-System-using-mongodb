import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FamilyDetailsService } from './family-details.service';
import { CreateFamilyDetailDto } from './dto/create-family-detail.dto';
import { FamilyDetail } from './schemas/family-detail.schema';

@ApiTags('family-details')
@Controller('family-details')
export class FamilyDetailsController {
  constructor(private readonly familyDetailsService: FamilyDetailsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new family detail record' })
  @ApiResponse({ status: 201, description: 'Family detail created successfully', type: FamilyDetail })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createFamilyDetailDto: CreateFamilyDetailDto): Promise<FamilyDetail> {
    return this.familyDetailsService.create(createFamilyDetailDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all family details' })
  @ApiResponse({ status: 200, description: 'List of all family details', type: [FamilyDetail] })
  findAll(): Promise<FamilyDetail[]> {
    return this.familyDetailsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a family detail by ID' })
  @ApiResponse({ status: 200, description: 'Family detail found', type: FamilyDetail })
  @ApiResponse({ status: 404, description: 'Family detail not found' })
  findOne(@Param('id') id: string): Promise<FamilyDetail> {
    return this.familyDetailsService.findOne(id);
  }

  @Get('criminal/:criminalId')
  @ApiOperation({ summary: 'Get family details by criminal ID' })
  @ApiResponse({ status: 200, description: 'Family details found for criminal', type: [FamilyDetail] })
  findByCriminalId(@Param('criminalId') criminalId: string): Promise<FamilyDetail[]> {
    return this.familyDetailsService.findByCriminalId(criminalId);
  }
} 