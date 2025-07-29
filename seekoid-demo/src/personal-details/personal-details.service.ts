import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PersonalDetail, PersonalDetailDocument } from './schemas/personal-detail.schema';
import { CreatePersonalDetailDto } from './dto/create-personal-detail.dto';
import { CriminalsService } from 'src/criminals/criminals.service';

@Injectable()
export class PersonalDetailsService {
  constructor(
    @InjectModel(PersonalDetail.name) private personalDetailModel: Model<PersonalDetailDocument>,
    private readonly criminalService: CriminalsService
  ) { }

  async create(createPersonalDetailDto: CreatePersonalDetailDto) {
    try {
      const criminalId = await this.criminalService.findOne(createPersonalDetailDto.criminalId)
      if (!criminalId) {
        throw new NotFoundException(`Criminal with ID ${createPersonalDetailDto.criminalId} not found`);
      }
      const createdPersonalDetail = this.personalDetailModel.create(createPersonalDetailDto);
      return createdPersonalDetail
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message)
    }
  }

  async findAll() {
    try {
      const personalDetails =
        await this.personalDetailModel.find().exec();
      return personalDetails;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string){
    const personalDetail = await this.personalDetailModel.findById(id).exec();
    if (!personalDetail) {
      throw new NotFoundException(`Personal detail with ID ${id} not found`);
    }
    return personalDetail;
  }
} 