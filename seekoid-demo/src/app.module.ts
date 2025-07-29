import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CriminalsModule } from './criminals/criminals.module';
import { AddressesModule } from './addresses/addresses.module';
import { PersonalDetailsModule } from './personal-details/personal-details.module';
import { EducationDetailsModule } from './education-details/education-details.module';
import { FamilyDetailsModule } from './family-details/family-details.module';
import { GovernmentIdsModule } from './government-ids/government-ids.module';
import { PhysicalTraitsModule } from './physical-traits/physical-traits.module';
import { OccupationsModule } from './occupations/occupations.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:password@localhost:27017/criminal-profiling?authSource=admin'),
    CriminalsModule,
    AddressesModule,
    PersonalDetailsModule,
    EducationDetailsModule,
    FamilyDetailsModule,
    GovernmentIdsModule,
    PhysicalTraitsModule,
    OccupationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
