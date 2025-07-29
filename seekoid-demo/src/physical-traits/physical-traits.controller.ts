import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { PhysicalTraitsService } from './physical-traits.service';
import { CreatePhysicalTraitDto } from './dto/create-physical-trait.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('physical-traits')
@Controller('physical-traits')
export class PhysicalTraitsController {
  constructor(private readonly physicalTraitsService: PhysicalTraitsService) {}

@Post()
 async create(@Body() createPhysicalTraitDto: CreatePhysicalTraitDto) {
  try {
    const physical= await this.physicalTraitsService.create(createPhysicalTraitDto);
    return{
      status:HttpStatus.CREATED,
      data : physical
    }
  } catch(error){
    throw error;
  }
 }

  @Get()
 async findAll() {
    const physical= await this.physicalTraitsService.findAll();
    return{
      status:HttpStatus.FOUND,
      data:physical
    }
  }

  @Get(':id')
 async findOne(@Param('id') id: string) {
    const physical= await this.physicalTraitsService.findOne(id);
    return {
      status:HttpStatus.FOUND,
      data:physical
    }
  }

} 