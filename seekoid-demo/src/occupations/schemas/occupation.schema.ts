
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type OccupationDocument = Occupation & Document;

@Schema({ timestamps: true })
export class Occupation {
  @Prop({ type: Types.ObjectId, ref: 'Criminal', required: true })
  criminalId: Types.ObjectId;

  @Prop({ trim: true })
  occupation?: string;

  @Prop({ trim: true })
  currentIncomeSource?: string;

  @Prop({ trim: true })
  employerName?: string;

  @Prop({ trim: true })
  employerAddress?: string;

  @Prop({ trim: true })
  previousOccupation?: string;
}

export const OccupationSchema = SchemaFactory.createForClass(Occupation); 