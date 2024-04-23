import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export type UserDocument = User & Document;
@Schema()
export class User {
  @Prop({ unique: true, uppercase: true, required: true, trim: true })
  name: string;

  @Prop({ unique: true, lowercase: true, required: true, trim: true })
  email: string;

  @Prop({ required: true, trim: true })
  username: string;
}

export const userSchema = SchemaFactory.createForClass(User);
