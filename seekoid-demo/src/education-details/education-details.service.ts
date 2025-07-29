import { BadGatewayException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EducationDetail, EducationDetailDocument } from './schemas/education-detail.schema';
import { CreateEducationDetailDto } from './dto/create-education-detail.dto';
import { CriminalsService } from 'src/criminals/criminals.service';

@Injectable()
export class EducationDetailsService {
  constructor(
    @InjectModel(EducationDetail.name) private educationDetailModel: Model<EducationDetailDocument>,
    private readonly criminalService: CriminalsService,
  ) { }

  async create(createEducationDetailDto: CreateEducationDetailDto) {
    try {
      const criminal = await this.criminalService.findOne(createEducationDetailDto.criminalId)
      if (!criminal) {
        throw new NotFoundException(`Criminal with ID ${createEducationDetailDto.criminalId} not found`);

      }
      const createdEducationDetail = this.educationDetailModel.create(createEducationDetailDto);
      return createdEducationDetail
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadGatewayException(error.message)
    }
  }

  async findAll() {
    try {
      const education = await this.educationDetailModel.find().exec();
      return education;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const educationDetail = await this.educationDetailModel.findById(id).exec();
      if (!educationDetail) {
        throw new NotFoundException(`Education detail with ID ${id} not found`);
      }
      return educationDetail;
    } catch (error) {
      if(error instanceof HttpException){
        throw error;
      }
      throw new BadGatewayException(error.message)
    }
  }
} 