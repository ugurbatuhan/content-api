import { HydratedDocument } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ContentDocument = HydratedDocument<Content>;

@Schema()
export class Content {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [String], required: true })
  tags: string[];

  @Prop({ type: Number, required: true })
  gradeLevel: number;

  @Prop({ type: Number, required: true })
  minDuration: number;

  @Prop({ type: Number, required: true })
  maxDuration: number;

  @Prop({ type: Boolean, required: true })
  priority: boolean;
}

export const ContentSchema = SchemaFactory.createForClass(Content);
