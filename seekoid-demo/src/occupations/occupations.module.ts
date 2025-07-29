import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OccupationsController } from './occupations.controller';
import { OccupationsService } from './occupations.service';
import { Occupation, OccupationSchema } from './schemas/occupation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Occupation.name, schema: OccupationSchema },
    ]),
  ],
  controllers: [OccupationsController],
  providers: [OccupationsService],
  exports: [OccupationsService],
})
export class OccupationsModule {} 