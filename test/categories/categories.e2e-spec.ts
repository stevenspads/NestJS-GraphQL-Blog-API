import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ConfigService } from '../../src/config/config.service';
import { ConfigModule } from '../../src/config/config.module';
import { INestApplication } from '@nestjs/common';
import { CategoryModule } from './../../src/category/category.module';
import { categoriesQuery, categoryQuery, createCategory, createCategoryQuery, deleteCategoryQuery, updateCategory, updateCategoryQuery } from './category-queries';
import { Category } from './../../src/category/repository/category.schema';

describe('Categories (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
            uri: configService.config.mongoUrl,
          }),
          inject: [ConfigService],
        }),
        GraphQLModule.forRoot({
          autoSchemaFile: join(process.cwd(), 'src/schema/schema.gql'),
        }),
        CategoryModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('createCategory', () => {
    // delete test category if it exists
    request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: deleteCategoryQuery(updateCategory.id),
      });

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: createCategoryQuery,
      })
      .expect(({ body }) => {
        const category: Category = body.data.createCategory;
        expect(category.id).toBe(createCategory.id);
        expect(category.name).toBe(createCategory.name);
      })
      .expect(200);
  });

  it('category', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: categoryQuery(createCategory.id),
      })
      .expect(({ body }) => {
        const category: Category = body.data.category;
        expect(category.id).toBe(createCategory.id);
        expect(category.name).toBe(createCategory.name);
      })
      .expect(200);
  });

  it('categories', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: categoriesQuery,
      })
      .expect(({ body }) => {
        const categories: Array<Category> = body.data.categories;
        expect(categories.length).toBeGreaterThan(0);
        expect(categories).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: createCategory.id,
              name: createCategory.name,
            }),
          ]),
        );
      })
      .expect(200);
  });

  it('updateCategory', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: updateCategoryQuery(updateCategory.id),
      })
      .expect(({ body }) => {
        const category: Category = body.data.updateCategory;
        expect(category.id).toBe(updateCategory.id);
        expect(category.name).toBe(updateCategory.name);
      })
      .expect(200);
  });

  it('deleteCategory', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: deleteCategoryQuery(updateCategory.id),
      })
      .expect(({ body }) => {
        const category: Category = body.data.deleteCategory;
        expect(category.id).toBe(updateCategory.id);
        expect(category.name).toBe(updateCategory.name);
      })
      .expect(200);
  });
});
