import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OccupationsService } from './occupations.service';
import { CreateOccupationDto } from './dto/create-occupation.dto';

@Controller('occupations')
export class OccupationsController {
  constructor(private readonly occupationsService: OccupationsService) {}

  @Post()
  create(@Body() createOccupationDto: CreateOccupationDto) {
    return this.occupationsService.create(createOccupationDto);
  }

  @Get()
  findAll() {
    return this.occupationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.occupationsService.findOne(id);
  }

  @Get('criminal/:criminalId')
  findByCriminalId(@Param('criminalId') criminalId: string) {
    return this.occupationsService.findByCriminalId(criminalId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOccupationDto: Partial<CreateOccupationDto>) {
    return this.occupationsService.update(id, updateOccupationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.occupationsService.remove(id);
  }
} 