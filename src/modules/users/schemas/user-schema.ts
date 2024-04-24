import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema({})
export class User extends Document {
  @Prop({ unique: true, uppercase: true, required: true, trim: true })
  name: string;

  @Prop({ unique: true, lowercase: true, required: true, trim: true })
  email: string;

  @Prop({ required: true, trim: true })
  username: string;
}

export const userSchema = SchemaFactory.createForClass(User);
userSchema.index({ entityId: 1 });
