import { InternalServerErrorException } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PostInput } from './models/post.input';
import { PostObject } from './models/post.object';
import { PostService } from './post.service';
import { PaginationArgs } from './models/pagination.args';

@Resolver()
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => PostObject)
  async post(@Args('id') id: number): Promise<PostObject> {
    try {
      return await this.postService.findOne(id);      
    } catch (error) {
      throw new InternalServerErrorException('Get post error');
    }
  }

  @Query(() => [PostObject])
  async posts(@Args() paginationArgs?: PaginationArgs): Promise<Array<PostObject>> {
    try {
      return this.postService.findAll(paginationArgs);
    } catch (error) {
      throw new InternalServerErrorException('Get posts error');
    }
  }

  @Mutation(() => PostObject)
  async createPost(@Args('input') input: PostInput): Promise<PostObject> {
    return await this.postService.create(input);
  }

  @Mutation(() => PostObject)
  async updatePost(@Args('id') id: number, @Args('input') input: PostInput): Promise<PostObject> {
    return await this.postService.update(id, input);
  }

  @Mutation(() => PostObject)
  async deletePost(@Args('id') id: number): Promise<PostObject> {
    return await this.postService.delete(id);
  }

}
