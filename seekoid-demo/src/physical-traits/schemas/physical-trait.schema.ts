import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PhysicalTraitDocument = PhysicalTrait & Document;

@Schema({ timestamps: true })
export class PhysicalTrait {
  @Prop({ type: Types.ObjectId, ref: 'Criminal', required: true })
  criminalId: Types.ObjectId;

  @Prop({ min: 0 })
  height?: number;

  @Prop({ min: 0 })
  weight?: number;

  @Prop({ trim: true })
  complexion?: string;

  @Prop({ trim: true })
  eyeColor?: string;

  @Prop({ trim: true })
  hairDescription?: string;

  @Prop({ trim: true })
  beard?: string;

  @Prop({ trim: true })
  moustache?: string;

  @Prop({ trim: true })
  identificationMark?: string;
}

export const PhysicalTraitSchema = SchemaFactory.createForClass(PhysicalTrait); 