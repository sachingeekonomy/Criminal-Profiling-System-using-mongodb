import { BadGatewayException, BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Criminal, CriminalDocument } from './schemas/criminal.schema';
import { CreateCriminalDto } from './dto/create-criminal.dto';

@Injectable()
export class CriminalsService {
  constructor(
    @InjectModel(Criminal.name) private criminalModel: Model<CriminalDocument>,
  ) { }

  async create(createCriminalDto: CreateCriminalDto) {
    try {
      const createdCriminal =  this.criminalModel.create(createCriminalDto);
      return createdCriminal;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to create criminal record.');
    }
  }


  async findAll() {
    try {
      return this.criminalModel.find().exec();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try{
    const criminal = await this.criminalModel.findById(id).exec();
    if (!criminal) {
      throw new NotFoundException(`Criminal with ID ${id} not found`);
    }
    return criminal;
  }catch (error){
    if (error instanceof HttpException){
      throw error
    }
    throw new BadGatewayException(error.message)
  }
}

} 