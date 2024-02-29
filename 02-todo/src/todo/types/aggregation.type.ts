import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType({ description: "Todo aggregation type" })
export class AggregationType {
  @Field(() => Int)
  total: number;

  @Field(() => Int)
  pending: number;

  @Field(() => Int)
  completed: number;
}