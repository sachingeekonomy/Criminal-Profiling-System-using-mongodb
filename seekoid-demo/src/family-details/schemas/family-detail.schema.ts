import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type FamilyDetailDocument = FamilyDetail & Document;

@Schema({ timestamps: true })
export class FamilyDetail {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Criminal', required: true })
  criminalId: MongooseSchema.Types.ObjectId;

  @Prop({ trim: true })
  fatherName?: string;

  @Prop({ trim: true })
  fatherOccupation?: string;

  @Prop({ min: 0 })
  fatherIncome?: number;

  @Prop({ trim: true })
  motherName?: string;

  @Prop({ trim: true })
  motherOccupation?: string;

  @Prop({ min: 0 })
  motherIncome?: number;

  @Prop({ type: [String] })
  siblings?: string[];

  @Prop({ type: [String] })
  siblingsOccupation?: string[];

  @Prop({ type: [Number] })
  siblingsIncome?: number[];

  @Prop({ trim: true })
  spouseName?: string;

  @Prop({ trim: true })
  spouseOccupation?: string;

  @Prop({ min: 0 })
  spouseIncome?: number;

  @Prop({ type: [String] })
  children?: string[];
}

export const FamilyDetailSchema = SchemaFactory.createForClass(FamilyDetail); 