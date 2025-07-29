import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Occupation, OccupationDocument } from './schemas/occupation.schema';
import { CreateOccupationDto } from './dto/create-occupation.dto';

@Injectable()
export class OccupationsService {
  constructor(
    @InjectModel(Occupation.name)
    private occupationModel: Model<OccupationDocument>,
  ) {}

  async create(createOccupationDto: CreateOccupationDto): Promise<Occupation> {
    const createdOccupation = new this.occupationModel(createOccupationDto);
    return createdOccupation.save();
  }

  async findAll(): Promise<Occupation[]> {
    return this.occupationModel.find().exec();
  }

  async findOne(id: string): Promise<Occupation> {
    const occupation = await this.occupationModel.findById(id).exec();
    if (!occupation) {
      throw new NotFoundException(`Occupation with ID ${id} not found`);
    }
    return occupation;
  }

  async findByCriminalId(criminalId: string): Promise<Occupation> {
    const occupation = await this.occupationModel
      .findOne({ criminalId: new Types.ObjectId(criminalId) })
      .exec();
    if (!occupation) {
      throw new NotFoundException(`Occupation for criminal ID ${criminalId} not found`);
    }
    return occupation;
  }

  async update(id: string, updateOccupationDto: Partial<CreateOccupationDto>): Promise<Occupation> {
    const updatedOccupation = await this.occupationModel
      .findByIdAndUpdate(id, updateOccupationDto, { new: true })
      .exec();
    if (!updatedOccupation) {
      throw new NotFoundException(`Occupation with ID ${id} not found`);
    }
    return updatedOccupation;
  }

  async remove(id: string): Promise<void> {
    const result = await this.occupationModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Occupation with ID ${id} not found`);
    }
  }
} 