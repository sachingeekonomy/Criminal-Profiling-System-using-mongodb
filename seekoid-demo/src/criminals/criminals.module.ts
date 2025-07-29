import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CriminalsController } from './criminals.controller';
import { CriminalsService } from './criminals.service';
import { Criminal, CriminalSchema } from './schemas/criminal.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Criminal.name, schema: CriminalSchema },
    ]),
  ],
  controllers: [CriminalsController],
  providers: [CriminalsService],
  exports: [CriminalsService],
})
export class CriminalsModule {} 