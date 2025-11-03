import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI') || 'mongodb://root:password@localhost:27017/criminal-profiling?authSource=admin',
      }),
      inject: [ConfigService],
    }),
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
