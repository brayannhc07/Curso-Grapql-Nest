import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Todo } from "./entity/todo.entity";
import { TodoService } from "./todo.service";
import { StatusArgs, CreateTodoInput, UpdateTodoInput } from "./dto";
import { AggregationType } from "./types/aggregation.type";

@Resolver(() => Todo)
export class TodoResolver {

  constructor(private readonly todoService: TodoService) {
  }

  @Query(() => [Todo], { name: "todos" })
  findAll(
    @Args() statusArgs: StatusArgs,
  ): Todo[] {
    return this.todoService.findAll(statusArgs.status);
  }

  @Query(() => Todo, { name: "todo" })
  findOne(
    @Args("id", { type: () => Int }) id: number,
  ): Todo {
    return this.todoService.findOne(id);
  }

  @Mutation(() => Todo, { name: "createTodo" })
  createTodo(
    @Args("createTodoInput") createTodoInput: CreateTodoInput,
  ) {
    return this.todoService.create(createTodoInput);
  }


  @Mutation(() => Todo, { name: "updateTodo" })
  updateTodo(
    @Args("updateTodoInput") updateTodoInput: UpdateTodoInput,
  ) {
    return this.todoService.update(updateTodoInput);
  }

  @Mutation(() => Boolean)
  removeTodo(
    @Args("id", { type: () => Int }) id: number,
  ) {
    return this.todoService.delete(id);
  }

  // Aggregations
  @Query(() => Int, { name: "totalTodos" })
  totalTodos(): number {
    return this.todoService.totalTodos;
  }

  @Query(() => Int, { name: "completedTodos" })
  completedTodos(): number {
    return this.todoService.completedTodos;
  }

  @Query(() => Int, { name: "uncompletedTodos" })
  uncompletedTodos(): number {
    return this.todoService.uncompletedTodos;
  }

  @Query(() => AggregationType)
  aggregations(): AggregationType {
    return {
      completed: this.todoService.completedTodos,
      pending: this.todoService.uncompletedTodos,
      total: this.todoService.totalTodos,
    };
  }
}
