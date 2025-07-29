import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type AddressDocument = Address & Document;

@Schema({ timestamps: true ,versionKey: false})
export class Address {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Criminal', required: true })
  criminalId: MongooseSchema.Types.ObjectId;

  @Prop({ trim: true })
  govtAddress?: string;

  @Prop({ trim: true })
  currentAddress?: string;

  @Prop({ trim: true })
  otherKnownAddress?: string;

  @Prop({ trim: true })
  permanentAddress?: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address); 