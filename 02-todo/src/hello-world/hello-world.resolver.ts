import { Args, Float, Int, Query, Resolver } from "@nestjs/graphql";

@Resolver()
export class HelloWorldResolver {
  @Query(() => String, { description: "Returns 'Hello World!'", name: "hello" })
  helloWorld(): string {
    return "Hello World!";
  }

  @Query(() => Float, { name: "randomNumber" })
  getRandomNumber(): number {
    return Math.random() * 100;
  }

  @Query(() => Int, { name: "randomFromZeroTo", description: "From zero to argument TO (default 6)" })
  getRandomFromZeroTo(
    @Args("to", { type: () => Int, nullable: true }) to: number = 6,
  ): number {
    return Math.floor(Math.random() * to);
  }
}
