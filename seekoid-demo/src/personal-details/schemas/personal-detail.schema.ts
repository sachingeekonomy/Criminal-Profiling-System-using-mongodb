import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { SmokingHabit, DrinkingHabit, DrugHabit } from '../../common/enums';

export type PersonalDetailDocument = PersonalDetail & Document;

@Schema({ timestamps: true })
export class PersonalDetail {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Criminal', required: true })
  criminalId: MongooseSchema.Types.ObjectId;

  @Prop({ trim: true })
  caste?: string;

  @Prop({ trim: true })
  religion?: string;

  @Prop({ trim: true })
  motherTongue?: string;

  @Prop({ type: [String] })
  knownLanguages?: string[];

  @Prop({ enum: SmokingHabit })
  smoking?: SmokingHabit;

  @Prop({ enum: DrinkingHabit })
  drinking?: DrinkingHabit;

  @Prop({ enum: DrugHabit })
  drugs?: DrugHabit;

  @Prop({ trim: true })
  sexualHabits?: string;

  @Prop({ type: [String] })
  hobbies?: string[];

  @Prop({ type: [String] })
  vices?: string[];
}

export const PersonalDetailSchema = SchemaFactory.createForClass(PersonalDetail); 