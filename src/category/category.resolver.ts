import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { CategoryInput } from './models/category.input';
import { CategoryObject } from './models/category.object';

@Resolver()
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => CategoryObject)
  async category(@Args('id') id: number): Promise<CategoryObject> {
    try {
      const category: CategoryObject = await this.categoryService.findOne(id);
      
      if (! category) {
        throw new NotFoundException(id);
      }

      return category;  
    } catch (error) {
      throw new InternalServerErrorException('Get category error');
    }
  }

  @Query(() => [CategoryObject])
  async categories(): Promise<Array<CategoryObject>> {
    try {
      return this.categoryService.findAll();
    } catch (error) {
      throw new InternalServerErrorException('Get categories error');
    }
  }

  @Mutation(() => CategoryObject)
  async createCategory(@Args('input') input: CategoryInput): Promise<CategoryObject> {
    return await this.categoryService.create(input);
  }

  @Mutation(() => CategoryObject)
  async updateCategory(@Args('id') id: number, @Args('input') input: CategoryInput): Promise<CategoryObject> {
    return await this.categoryService.update(id, input);
  }

  @Mutation(() => CategoryObject)
  async deleteCategory(@Args('id') id: number): Promise<CategoryObject> {
    return await this.categoryService.delete(id);
  }

}
