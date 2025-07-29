import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PhysicalTrait, PhysicalTraitDocument } from './schemas/physical-trait.schema';
import { CreatePhysicalTraitDto } from './dto/create-physical-trait.dto';
import { CriminalsService } from 'src/criminals/criminals.service';

@Injectable()
export class PhysicalTraitsService {
  constructor(
    @InjectModel(PhysicalTrait.name)
    private physicalTraitModel: Model<PhysicalTraitDocument>,
    private readonly criminalService: CriminalsService
  ) { }

  async create(createPhysicalTraitDto: CreatePhysicalTraitDto) {
    try {
      const criminal = await this.criminalService.findOne(createPhysicalTraitDto.criminalId)
      if (!criminal) {
        throw new NotFoundException(`Criminal with ID ${createPhysicalTraitDto.criminalId} not found`);

      }
      const createdPhysicalTrait = new this.physicalTraitModel(createPhysicalTraitDto);
      return createdPhysicalTrait;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message)
    }
  }

  async findAll() { 
    try {
   const physical= await this.physicalTraitModel.find().exec();
   return physical;
  } catch(error){
    throw error;
  }
}

  async findOne(id: string) {
    try{
    const physicalTrait = await this.physicalTraitModel.findById(id).exec();
    if (!physicalTrait) {
      throw new NotFoundException(`Physical trait with ID ${id} not found`);
    }
    return physicalTrait;
  }catch (err){
    throw err;
  }
}
} 