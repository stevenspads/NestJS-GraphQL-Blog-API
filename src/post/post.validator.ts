import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PostInput } from './models/post.input';
import { PostRepository } from './repository/post.repository';

@Injectable()
export class PostValidator {
  constructor(private postRepository: PostRepository) {}

  public async validateCreate(postInput: PostInput): Promise<void> {
    const idExists: boolean = await this.postRepository.checkifIdExists(postInput.id);
    if (idExists) {
      throw new InternalServerErrorException('A Post with this id already exists.');
    }

    await this.validateTitle(postInput);
  }

  public async validateUpdate(id: number, postInput: PostInput): Promise<void> {
    await this.validateId(id);

    await this.validateTitle(postInput, id);
  }

  // individual validate methods

  public async validateId(id: number) : Promise<void> {
    const exists: boolean = await this.postRepository.checkifIdExists(id);
    if (! exists) {
      throw new NotFoundException('Post not found.');
    }
  }

  private async validateTitle(postInput: PostInput, id?: number) : Promise<void> {
    const titleExists: boolean = await this.postRepository.checkifTitleExists(postInput.title, id);
    if (titleExists) {
      throw new InternalServerErrorException('A Post with this title already exists.');
    }
  }
}
