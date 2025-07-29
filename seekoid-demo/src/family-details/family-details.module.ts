import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FamilyDetailsController } from './family-details.controller';
import { FamilyDetailsService } from './family-details.service';
import { FamilyDetail, FamilyDetailSchema } from './schemas/family-detail.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FamilyDetail.name, schema: FamilyDetailSchema },
    ]),
  ],
  controllers: [FamilyDetailsController],
  providers: [FamilyDetailsService],
  exports: [FamilyDetailsService],
})
export class FamilyDetailsModule {} 