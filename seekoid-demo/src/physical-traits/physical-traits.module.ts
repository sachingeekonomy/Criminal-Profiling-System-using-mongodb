import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PhysicalTraitsController } from './physical-traits.controller';
import { PhysicalTraitsService } from './physical-traits.service';
import { PhysicalTrait, PhysicalTraitSchema } from './schemas/physical-trait.schema';
import { CriminalsModule } from 'src/criminals/criminals.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PhysicalTrait.name, schema: PhysicalTraitSchema },
    ]),CriminalsModule
  ],
  controllers: [PhysicalTraitsController],
  providers: [PhysicalTraitsService],
  exports: [PhysicalTraitsService],
})
export class PhysicalTraitsModule {} 