import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FamilyDetail, FamilyDetailDocument } from './schemas/family-detail.schema';
import { CreateFamilyDetailDto } from './dto/create-family-detail.dto';

@Injectable()
export class FamilyDetailsService {
  constructor(
    @InjectModel(FamilyDetail.name) private familyDetailModel: Model<FamilyDetailDocument>,
  ) {}

  async create(createFamilyDetailDto: CreateFamilyDetailDto): Promise<FamilyDetail> {
    const createdFamilyDetail = new this.familyDetailModel(createFamilyDetailDto);
    return createdFamilyDetail.save();
  }

  async findAll(): Promise<FamilyDetail[]> {
    return this.familyDetailModel.find().exec();
  }

  async findByCriminalId(criminalId: string): Promise<FamilyDetail[]> {
    return this.familyDetailModel.find({ criminalId }).exec();
  }

  async findOne(id: string): Promise<FamilyDetail> {
    const familyDetail = await this.familyDetailModel.findById(id).exec();
    if (!familyDetail) {
      throw new NotFoundException(`Family detail with ID ${id} not found`);
    }
    return familyDetail;
  }
} 