import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GovernmentId, GovernmentIdDocument } from './schemas/government-id.schema';
import { CreateGovernmentIdDto } from './dto/create-government-id.dto';

@Injectable()
export class GovernmentIdsService {
  constructor(
    @InjectModel(GovernmentId.name) private governmentIdModel: Model<GovernmentIdDocument>,
  ) {}

  async create(createGovernmentIdDto: CreateGovernmentIdDto): Promise<GovernmentId> {
    const createdGovernmentId = new this.governmentIdModel(createGovernmentIdDto);
    return createdGovernmentId.save();
  }

  async findAll(): Promise<GovernmentId[]> {
    return this.governmentIdModel.find().exec();
  }

  async findByCriminalId(criminalId: string): Promise<GovernmentId[]> {
    return this.governmentIdModel.find({ criminalId }).exec();
  }

  async findOne(id: string): Promise<GovernmentId> {
    const governmentId = await this.governmentIdModel.findById(id).exec();
    if (!governmentId) {
      throw new NotFoundException(`Government ID with ID ${id} not found`);
    }
    return governmentId;
  }
} 