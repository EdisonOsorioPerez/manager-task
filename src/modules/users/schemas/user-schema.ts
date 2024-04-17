import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({ unique: true, uppercase: true, required: true, trim: true })
  name: string;

  @Prop({ unique: true, lowercase: true, required: true, trim: true })
  email: string;

  @Prop({ required: true, trim: true })
  username: string;
}
