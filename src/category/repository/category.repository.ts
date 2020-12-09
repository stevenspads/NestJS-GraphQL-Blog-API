import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CategoryInput } from "./../models/category.input";
import { CategoryObject } from "./../models/category.object";
import { Category, CategoryDocument } from "./../repository/category.schema";

@Injectable()
export class CategoryRepository {
  constructor(@InjectModel(Category.name) private categoryModel: Model<CategoryDocument>) {}

  public async findAll(): Promise<Array<CategoryObject>> {
    return await this.categoryModel.find().exec();
  }

  public async findOne(id: number): Promise<CategoryObject> {
    await this.checkifIdExists(id);

    return await this.categoryModel.findOne({ id });
  }

  public async create(categoryInput: CategoryInput): Promise<CategoryObject> {
    const created = new this.categoryModel(categoryInput);
    return await created.save();
  }

  public async delete(id: number): Promise<CategoryObject> {
    await this.checkifIdExists(id);

    return await this.categoryModel.findOneAndDelete({ id });
  }

  public async update(id: number, categoryInput: CategoryInput, options: any): Promise<CategoryObject> {
    await this.checkifIdExists(id);

    return await this.categoryModel.findOneAndUpdate({ id }, categoryInput, options);
  }

  public async checkifIdExists(id: number) : Promise<boolean> {
    return await this.categoryModel.exists({ id });    
  }

  public async checkifTitleExists(title: string, excludingId?: number) : Promise<boolean> {
    if (excludingId) {
      return await this.categoryModel.exists({ title, id: { $ne: excludingId } }); 
    }
    
    return await this.categoryModel.exists({ title });
  }
}
