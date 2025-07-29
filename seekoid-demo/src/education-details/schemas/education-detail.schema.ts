import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type EducationDetailDocument = EducationDetail & Document;

@Schema({ timestamps: true })
export class EducationDetail {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Criminal', required: true })
  criminalId: MongooseSchema.Types.ObjectId;

  @Prop({ trim: true })
  school?: string;

  @Prop({ trim: true })
  puc?: string;

  @Prop({ trim: true })
  graduation?: string;

  @Prop({ trim: true })
  presentOccupationAndSourceOfIncome?: string;

  @Prop({ trim: true })
  employerName?: string;

  @Prop({ trim: true })
  employerAddress?: string;

  @Prop({ trim: true })
  previousOccupation?: string;
}

export const EducationDetailSchema = SchemaFactory.createForClass(EducationDetail); 