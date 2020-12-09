import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ConfigService } from '../../src/config/config.service';
import { ConfigModule } from '../../src/config/config.module';
import { INestApplication } from '@nestjs/common';
import { PostModule } from '../../src/post/post.module';
import { postsQuery, postQuery, createPost, createPostQuery, deletePostQuery, updatePost, updatePostQuery } from './post-queries';
import { Post } from '../../src/post/repository/post.schema';

describe('Posts (e2e)', () => {
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
        PostModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('createPost', () => {
    // delete test category if it exists
    request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: deletePostQuery(updatePost.id),
      });

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: createPostQuery,
      })
      .expect(({ body }) => {
        const post: Post = body.data.createPost;
        expect(post.id).toBe(createPost.id);
        expect(post.date).toBe(createPost.date.toISOString());
        expect(post.title).toBe(createPost.title);
        expect(post.body).toBe(createPost.body);
        expect(post.category).toEqual(          
          expect.objectContaining({
            id: createPost.category.id,
            name: createPost.category.name,
          }),
        );
      })
      .expect(200);
  });

  it('post', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: postQuery(createPost.id),
      })
      .expect(({ body }) => {
        const post: Post = body.data.post;
        expect(post.id).toBe(createPost.id);
        expect(post.date).toBe(createPost.date.toISOString());
        expect(post.title).toBe(createPost.title);
        expect(post.body).toBe(createPost.body);
        expect(post.category).toEqual(          
          expect.objectContaining({
            id: createPost.category.id,
            name: createPost.category.name,
          }),
        );
      })
      .expect(200);
  });

  it('posts', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: postsQuery,
      })
      .expect(({ body }) => {
        const posts: Array<Post> = body.data.posts;
        expect(posts.length).toBeGreaterThan(0);
        expect(posts).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: createPost.id,
              date: createPost.date.toISOString(),
              title: createPost.title,
              body: createPost.body,
              category: expect.objectContaining({
                id: createPost.category.id,
                name: createPost.category.name,
              }),
            }),
          ]),
        );
      })
      .expect(200);
  });

  it('updatePost', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: updatePostQuery(updatePost.id),
      })
      .expect(({ body }) => {
        const post: Post = body.data.updatePost;
        expect(post.id).toBe(updatePost.id);
        expect(post.date).toBe(updatePost.date.toISOString());
        expect(post.title).toBe(updatePost.title);
        expect(post.body).toBe(updatePost.body);
        expect(post.category).toEqual(          
          expect.objectContaining({
            id: updatePost.category.id,
            name: updatePost.category.name,
          }),
        );
      })
      .expect(200);
  });

  it('deletePost', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: deletePostQuery(updatePost.id),
      })
      .expect(({ body }) => {
        const post: Post = body.data.deletePost;
        expect(post.id).toBe(updatePost.id);
        expect(post.date).toBe(updatePost.date.toISOString());
        expect(post.title).toBe(updatePost.title);
        expect(post.body).toBe(updatePost.body);
        expect(post.category).toEqual(          
          expect.objectContaining({
            id: updatePost.category.id,
            name: updatePost.category.name,
          }),
        );
      })
      .expect(200);
  });
});
