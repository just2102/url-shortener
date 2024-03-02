import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Url {
  _id: string;

  @Prop({ required: true })
  originalLink: string;

  @Prop({ required: true })
  shortLink: string;

  @Prop({ required: true })
  userId: string;
}

export type UrlDocument = HydratedDocument<Url>;
export const UrlSchema = SchemaFactory.createForClass(Url);
