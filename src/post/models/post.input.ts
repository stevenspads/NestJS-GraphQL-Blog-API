import { Field, GraphQLISODateTime, InputType } from "@nestjs/graphql";
import { CategoryInput } from "./../../category/models/category.input";

@InputType()
export class PostInput {
  @Field(() => Number, { nullable: true })
  readonly id: number;

  @Field(() => GraphQLISODateTime, { nullable: true })
  readonly date: Date;

  @Field(() => String)
  readonly title: string;

  @Field(() => String, { nullable: true })
  readonly body: string;

  @Field(() => CategoryInput, { nullable: true })
  readonly category: CategoryInput;
}
