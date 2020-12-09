import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PostInput } from "./../models/post.input";
import { PaginationArgs } from "./../models/pagination.args";
import { PostObject } from "./../models/post.object";
import { Post, PostDocument } from "./../repository/post.schema";

@Injectable()
export class PostRepository {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  public async findAll(args?: PaginationArgs): Promise<Array<PostObject>> {
    if (args) { 
      return await this.findAllPaginated(args);
    }

    return await this.postModel.find().exec();
  }

  private async findAllPaginated(args: PaginationArgs): Promise<Array<PostObject>> {
    const { offset, limit, orderBy, sortOrder } = args;

    try {            
      return await this.postModel.find()
        .sort({ [orderBy]: sortOrder })
        .limit(limit)
        .skip(limit * offset)
        .exec();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async findOne(id: number): Promise<PostObject> {
    await this.checkifIdExists(id);

    return await this.postModel.findOne({ id }).exec();
  }

  public async create(postInput: PostInput): Promise<PostObject> {
    const created: PostDocument = new this.postModel(postInput);
    return await created.save();
  }

  public async delete(id: number): Promise<PostObject> {
    await this.checkifIdExists(id);

    return await this.postModel.findOneAndDelete({ id });
  }

  public async update(id: number, postInput: PostInput, options: any): Promise<PostObject> {
    await this.checkifIdExists(id);

    return await this.postModel.findOneAndUpdate({ id }, postInput, options);
  }

  public async checkifIdExists(id: number) : Promise<boolean> {
    return await this.postModel.exists({ id });    
  }

  public async checkifTitleExists(title: string, excludingId?: number) : Promise<boolean> {
    if (excludingId) {
      return await this.postModel.exists({ title, id: { $ne: excludingId } }); 
    }
    
    return await this.postModel.exists({ title });
  }

}
