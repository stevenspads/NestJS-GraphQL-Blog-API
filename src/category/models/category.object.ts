import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class CategoryObject {
  @Field(() => Number, { nullable: true })
  readonly id: number;

  @Field(() => String, { nullable: true })
  readonly name: string;
}
