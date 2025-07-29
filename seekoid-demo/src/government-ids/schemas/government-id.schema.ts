import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type GovernmentIdDocument = GovernmentId & Document;

@Schema({ timestamps: true })
export class GovernmentId {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Criminal', required: true })
  criminalId: MongooseSchema.Types.ObjectId;

  @Prop({ trim: true })
  aadharNumber?: string;

  @Prop({ trim: true })
  panNumber?: string;

  @Prop({ trim: true })
  voterIdNumber?: string;

  @Prop({ trim: true })
  voterIssuePlace?: string;

  @Prop({ trim: true })
  passportNumber?: string;

  @Prop({ trim: true })
  passportIssuePlace?: string;

  @Prop({ type: Date })
  passportExpiry?: Date;

  @Prop({ trim: true })
  visaDetails?: string;

  @Prop({ trim: true })
  drivingLicense?: string;

  @Prop({ trim: true })
  rationCard?: string;

  @Prop({ trim: true })
  rationCardIssuePlace?: string;
}

export const GovernmentIdSchema = SchemaFactory.createForClass(GovernmentId); 