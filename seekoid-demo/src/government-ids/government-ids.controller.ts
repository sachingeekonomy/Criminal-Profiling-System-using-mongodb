import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GovernmentIdsService } from './government-ids.service';
import { CreateGovernmentIdDto } from './dto/create-government-id.dto';
import { GovernmentId } from './schemas/government-id.schema';

@ApiTags('government-ids')
@Controller('government-ids')
export class GovernmentIdsController {
  constructor(private readonly governmentIdsService: GovernmentIdsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new government ID record' })
  @ApiResponse({ status: 201, description: 'Government ID created successfully', type: GovernmentId })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createGovernmentIdDto: CreateGovernmentIdDto): Promise<GovernmentId> {
    return this.governmentIdsService.create(createGovernmentIdDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all government IDs' })
  @ApiResponse({ status: 200, description: 'List of all government IDs', type: [GovernmentId] })
  findAll(): Promise<GovernmentId[]> {
    return this.governmentIdsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a government ID by ID' })
  @ApiResponse({ status: 200, description: 'Government ID found', type: GovernmentId })
  @ApiResponse({ status: 404, description: 'Government ID not found' })
  findOne(@Param('id') id: string): Promise<GovernmentId> {
    return this.governmentIdsService.findOne(id);
  }

  @Get('criminal/:criminalId')
  @ApiOperation({ summary: 'Get government IDs by criminal ID' })
  @ApiResponse({ status: 200, description: 'Government IDs found for criminal', type: [GovernmentId] })
  findByCriminalId(@Param('criminalId') criminalId: string): Promise<GovernmentId[]> {
    return this.governmentIdsService.findByCriminalId(criminalId);
  }
} 