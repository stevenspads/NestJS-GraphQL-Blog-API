import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Category } from './../../category/repository/category.schema';

export type PostDocument = Post & Document;

@Schema({ timestamps: true })
export class Post {
  @Prop({ required: true, unique: true })
  id: number;

  @Prop({ required: true })
  date: Date;
  
  @Prop({ required: true, unique: true })
  title: string;  

  @Prop({ required: true })
  body: string;  

  @Prop({ required: true })
  category: Category;  
}

export const PostSchema = SchemaFactory.createForClass(Post);
