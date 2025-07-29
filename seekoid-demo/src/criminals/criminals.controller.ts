import { Controller, Get, Post, Body, Param, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { CriminalsService } from './criminals.service';
import { CreateCriminalDto } from './dto/create-criminal.dto';

@ApiTags('criminals')
@Controller('criminals')
export class CriminalsController {
  constructor(private readonly criminalsService: CriminalsService) { }

  @Post()
  async create(@Body() createCriminalDto: CreateCriminalDto) {
    const criminal = await this.criminalsService.create(createCriminalDto);
    return {
      status: HttpStatus.CREATED,
      message: 'Criminal created successfully',
      data: criminal,
    };
  }


  @Get()
 async findAll() {
    try {
      const criminals = await this.criminalsService.findAll();
      return {
        status: HttpStatus.FOUND,
        data: criminals
      }
    } catch (error) {
      throw error;
    }
  }

    @Get(':id')
    async findOne(@Param('id') id: string) {
      try {
     const criminal=await this.criminalsService.findOne(id);
     return{
      status:HttpStatus.FOUND,
      data:criminal
     }
    }catch(error){
      throw error;
    }
  }
  } 