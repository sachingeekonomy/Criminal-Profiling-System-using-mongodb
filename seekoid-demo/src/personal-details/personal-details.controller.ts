import { Controller, Get, Post, Body, Param, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PersonalDetailsService } from './personal-details.service';
import { CreatePersonalDetailDto } from './dto/create-personal-detail.dto';
import { PersonalDetail } from './schemas/personal-detail.schema';

@ApiTags('personal-details')
@Controller('personal-details')
export class PersonalDetailsController {
  constructor(private readonly personalDetailsService: PersonalDetailsService) { }

  @Post()
  async create(@Body() createPersonalDetailDto: CreatePersonalDetailDto) {
    try {
      const PersonalDetails = await this.personalDetailsService.create(createPersonalDetailDto);
      return {
        status: HttpStatus.CREATED,
        dataa: PersonalDetails
      }
    } catch (error) {
      throw error;
    }
  }


  @Get()
  async findAll() {
    try {
      const personalDetails = await this.personalDetailsService.findAll();
      return {
        status: HttpStatus.FOUND,
        data: personalDetails
      }
    } catch (error) {
      throw error;
    }
  }

  
@Get(':id')
async findOne(@Param('id') id: string) {
  try {
    const personalDetail = await this.personalDetailsService.findOne(id);
    return {
      status: HttpStatus.OK,
      data: personalDetail,
    };
  } catch (error) {
    throw error;
  }
}


} 