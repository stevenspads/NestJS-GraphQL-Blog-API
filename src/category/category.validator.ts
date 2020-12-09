import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CategoryInput } from './models/category.input';
import { CategoryRepository } from './repository/category.repository';

@Injectable()
export class CategoryValidator {
  constructor(private categoryRepository: CategoryRepository) {}

  public async validateCreate(categoryInput: CategoryInput): Promise<void> {
    const idExists: boolean = await this.categoryRepository.checkifIdExists(categoryInput.id);
    if (idExists) {
      throw new InternalServerErrorException('A Category with this id already exists.');
    }

    await this.validateTitle(categoryInput);
  }

  public async validateUpdate(id: number, categoryInput: CategoryInput): Promise<void> {
    await this.validateId(id);

    await this.validateTitle(categoryInput, id);
  }

  // individual validate methods

  public async validateId(id: number) : Promise<void> {
    const exists: boolean = await this.categoryRepository.checkifIdExists(id);
    if (! exists) {
      throw new NotFoundException('Category not found.');
    }
  }

  private async validateTitle(categoryInput: CategoryInput, id?: number) : Promise<void> {
    const titleExists: boolean = await this.categoryRepository.checkifTitleExists(categoryInput.name, id);
    if (titleExists) {
      throw new InternalServerErrorException('A Category with this title already exists.');
    }
  }
}
