import { Field, GraphQLISODateTime, ObjectType } from "@nestjs/graphql";
import { CategoryObject } from "./../../category/models/category.object";

@ObjectType()
export class PostObject {
  @Field(() => Number, { nullable: true })
  readonly id: number;

  @Field(() => GraphQLISODateTime, { nullable: true })
  readonly date: Date;

  @Field(() => String)
  readonly title: string;

  @Field(() => String, { nullable: true })
  readonly body: string;

  @Field(() => CategoryObject, { nullable: true })
  readonly category: CategoryObject;
}
