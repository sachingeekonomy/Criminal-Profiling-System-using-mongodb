import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EducationDetailsController } from './education-details.controller';
import { EducationDetailsService } from './education-details.service';
import { EducationDetail, EducationDetailSchema } from './schemas/education-detail.schema';
import { CriminalsModule } from 'src/criminals/criminals.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EducationDetail.name, schema: EducationDetailSchema },
    ]),CriminalsModule
  ],
  controllers: [EducationDetailsController],
  providers: [EducationDetailsService],
  exports: [EducationDetailsService],
})
export class EducationDetailsModule {} 