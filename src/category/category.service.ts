import { Injectable } from '@nestjs/common';
import { CategoryObject } from './models/category.object';
import { CategoryInput } from './models/category.input';
import { CategoryRepository } from './repository/category.repository';
import { CategoryValidator } from './category.validator';

@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository, private categoryValidator: CategoryValidator) {}

  async create(categoryInput: CategoryInput): Promise<CategoryObject> {
    await this.categoryValidator.validateCreate(categoryInput);

    return this.categoryRepository.create(categoryInput);
  }

  async findAll(): Promise<Array<CategoryObject>> {
    return this.categoryRepository.findAll();
  }

  async findOne(id: number): Promise<CategoryObject> {
    await this.categoryValidator.validateId(id);

    return await this.categoryRepository.findOne(id);
  }

  async delete(id: number): Promise<CategoryObject> {
    await this.categoryValidator.validateId(id);

    return await this.categoryRepository.delete(id);
  }

  async update(id: number, categoryInput: CategoryInput): Promise<CategoryObject> {
    await this.categoryValidator.validateUpdate(id, categoryInput);

    // { new: true } => we want the new, updated document to be returned 
    return await this.categoryRepository.update(id, categoryInput, { new: true });
  }
}
