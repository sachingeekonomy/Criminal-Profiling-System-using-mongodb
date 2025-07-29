import { BadGatewayException, BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Address, AddressDocument } from './schemas/address.schema';
import { CreateAddressDto } from './dto/create-address.dto';
import { CriminalsService } from 'src/criminals/criminals.service';
import { error } from 'console';

@Injectable()
export class AddressesService {
  constructor(
    @InjectModel(Address.name) private addressModel: Model<AddressDocument>,
    private readonly criminalsService: CriminalsService,) { }

  async create(createAddressDto: CreateAddressDto) {
    try {
      const criminal = await this.criminalsService.findOne(createAddressDto.criminalId);
      if (!criminal) {
        throw new NotFoundException(`Criminal with ID ${createAddressDto.criminalId} not found`);
      }
      const createdAddress = this.addressModel.create(createAddressDto);
      return createdAddress;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

async findAll() {
  try {
    return await this.addressModel.find();
  } catch (error) {
    throw new BadGatewayException(error.message);
  }
}

  async findOne(id: string){
    const address = await this.addressModel.findById(id).exec();
    if (!address) {
      throw new NotFoundException(`Address with ID ${id} not found`);
    }
    return address;
  }
} 