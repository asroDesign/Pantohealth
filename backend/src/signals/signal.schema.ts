import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Signal extends Document {
  @Prop({ required: true })
  deviceId: string;

  @Prop({ required: true })
  time: number; // timestamp

  @Prop({ required: true })
  dataLength: number; // طول آرایه data

  @Prop({ required: true })
  dataVolume: number; // اندازه داده (مثلاً در بایت)

  @Prop({ type: Array, required: false }) // داده‌های خام اختیاری
  data: any[]; // [[time, [x, y, speed]], ...]
}

export const SignalSchema = SchemaFactory.createForClass(Signal);