import { ArgsType, Field, Int, registerEnumType } from "@nestjs/graphql";

export enum SortOrder {
  DESC = 'desc',
  ASC = 'asc',
}

registerEnumType(SortOrder, {
  name: 'SortOrder',
});

@ArgsType()
export class PaginationArgs {
  @Field(() => Int, { nullable: true })
  readonly offset?: number;

  @Field(() => Int, { nullable: true })
  readonly limit?: number;

  @Field(() => String, { nullable: true })
  readonly orderBy?: string;

  @Field(() => SortOrder, { nullable: true })
  readonly sortOrder?: SortOrder;
}
