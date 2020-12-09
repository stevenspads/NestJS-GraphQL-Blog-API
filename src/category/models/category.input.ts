import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CategoryInput {
  @Field(() => Number, { nullable: true })
  readonly id: number;

  @Field(() => String, { nullable: true })
  readonly name: string;
}
