import { Controller, Get, Post, Body, Param, HttpStatus, HttpException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { Address } from './schemas/address.schema';

@ApiTags('addresses')
@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) { }

  @Post()
  async create(@Body() createAddressDto: CreateAddressDto) {
    try {
      const address = await this.addressesService.create(createAddressDto);
      return {
        status: HttpStatus.CREATED,
        data: address
      }
    } catch (error) {
      throw error;
    }
  }

  @Get()
 async findAll(){
    try {
    const address= await this.addressesService.findAll();
    return {
 data:address
    }
  }catch(error){
  throw error
  }
}

  @Get(':id')
  async findOne(@Param('id') id: string){
    try {
   const address= await this.addressesService.findOne(id);
   return {
    data:address
   }
  } catch(error){
    throw error;
  }
  }
} 