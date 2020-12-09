import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryResolver } from './category.resolver';
import { CategoryValidator } from './category.validator';
import { CategoryRepository } from './repository/category.repository';
import { CategoryService } from './category.service';
import { CategorySchema } from './repository/category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }])
  ],
  controllers: [],
  providers: [
    CategoryService,
    CategoryRepository,
    CategoryResolver,
    CategoryValidator,
  ],
})
export class CategoryModule {}