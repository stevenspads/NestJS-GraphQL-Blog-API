import { CategoryModel } from './../../category/models/category.interface';

export interface PostModel {
  id: number;
  date: Date;
  title: string;
  body: string;  
  category: CategoryModel;  
}
