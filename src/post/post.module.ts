import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostResolver } from './post.resolver';
import { PostValidator } from './post.validator';
import { PostRepository } from './repository/post.repository';
import { PostService } from './post.service';
import { PostSchema } from './repository/post.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Post', schema: PostSchema }])
  ],
  controllers: [],
  providers: [
    PostService,
    PostRepository,
    PostResolver,
    PostValidator,
  ],
})
export class PostModule {}