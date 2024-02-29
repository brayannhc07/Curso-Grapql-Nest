import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

@InputType()
export class CreateTodoInput {
  @Field(() => String, { description: "What needs to be done?" })
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  description: string;
}