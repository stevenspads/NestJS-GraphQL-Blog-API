import { Injectable } from '@nestjs/common';
import { PaginationArgs } from './models/pagination.args';
import { PostInput } from './models/post.input';
import { PostObject } from './models/post.object';
import { PostValidator } from './post.validator';
import { PostRepository } from './repository/post.repository';

@Injectable()
export class PostService {
  constructor(private postRepository: PostRepository, private postValidator: PostValidator) {}

  async create(postInput: PostInput): Promise<PostObject> {
    await this.postValidator.validateCreate(postInput);

    return await this.postRepository.create(postInput);
  }

  async findAll(args?: PaginationArgs): Promise<Array<PostObject>> {
    return await this.postRepository.findAll(args);
  }

  async findOne(id: number): Promise<PostObject> {
    await this.postValidator.validateId(id);

    return await this.postRepository.findOne(id);
  }

  async delete(id: number): Promise<PostObject> {
    await this.postValidator.validateId(id);

    return await this.postRepository.delete(id);
  }

  async update(id: number, postInput: PostInput): Promise<PostObject> {
    await this.postValidator.validateUpdate(id, postInput);
    
    // { new: true } => we want the new, updated document to be returned 
    return await this.postRepository.update(id, postInput, { new: true });
  }
}
