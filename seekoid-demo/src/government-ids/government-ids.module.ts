import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GovernmentIdsController } from './government-ids.controller';
import { GovernmentIdsService } from './government-ids.service';
import { GovernmentId, GovernmentIdSchema } from './schemas/government-id.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: GovernmentId.name, schema: GovernmentIdSchema },
    ]),
  ],
  controllers: [GovernmentIdsController],
  providers: [GovernmentIdsService],
  exports: [GovernmentIdsService],
})
export class GovernmentIdsModule {} 