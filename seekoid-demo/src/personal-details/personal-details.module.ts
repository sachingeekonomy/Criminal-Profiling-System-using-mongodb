import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PersonalDetailsController } from './personal-details.controller';
import { PersonalDetailsService } from './personal-details.service';
import { PersonalDetail, PersonalDetailSchema } from './schemas/personal-detail.schema';
import { CriminalsModule } from 'src/criminals/criminals.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PersonalDetail.name, schema: PersonalDetailSchema },
    ]),CriminalsModule
  ],
  controllers: [PersonalDetailsController],
  providers: [PersonalDetailsService],
  exports: [PersonalDetailsService],
})
export class PersonalDetailsModule {} 