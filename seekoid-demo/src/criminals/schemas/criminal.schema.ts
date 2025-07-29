import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Gender } from '../../common/enums';

export type CriminalDocument = Criminal & Document;

@Schema({ timestamps: true })
export class Criminal {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ trim: true })
  aliasName?: string;

  @Prop({ trim: true })
  criminalImageUrl?: string;

  @Prop({ required: true, enum: Gender })
  gender: Gender;

  @Prop({ required: true, min: 0, max: 150 })
  age: number;

  @Prop({ type: Date })
  dob?: Date;

  @Prop({ trim: true })
  placeOfBirth?: string;
}

export const CriminalSchema = SchemaFactory.createForClass(Criminal); 