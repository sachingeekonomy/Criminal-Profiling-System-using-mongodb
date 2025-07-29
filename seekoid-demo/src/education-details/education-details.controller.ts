import { Controller, Get, Post, Body, Param, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EducationDetailsService } from './education-details.service';
import { CreateEducationDetailDto } from './dto/create-education-detail.dto';
import { EducationDetail } from './schemas/education-detail.schema';

@ApiTags('education-details')
@Controller('education-details')
export class EducationDetailsController {
  constructor(private readonly educationDetailsService: EducationDetailsService) { }

  @Post()

  async create(@Body() createEducationDetailDto: CreateEducationDetailDto) {
    try {
      const education = await this.educationDetailsService.create(createEducationDetailDto);
      return {
        status: HttpStatus.CREATED,
        data: education
      }
    } catch (error) {
      throw error
    }
  }

  @Get()
  async findAll() {
    const education = await this.educationDetailsService.findAll();
    return {
      status:HttpStatus.FOUND,
      data:education
    }
  }

  @Get(':id')
 async findOne(@Param('id') id: string) {
   const education= await this.educationDetailsService.findOne(id);
   return {
    status:HttpStatus.FOUND,
    data:education
   }
  }
} 