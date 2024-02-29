import { Injectable, NotFoundException } from "@nestjs/common";
import { Todo } from "./entity/todo.entity";
import { CreateTodoInput, UpdateTodoInput } from "./dto";

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    {
      id: 1,
      description: "Prueba 1",
      done: false,
    },
    {
      id: 2,
      description: "Prueba 2",
      done: false,
    },
    {
      id: 3,
      description: "Prueba 3",
      done: false,
    },
  ];

  get totalTodos(): number {
    return this.todos.length;
  }

  get completedTodos(): number {
    return this.todos.filter(todo => todo.done === true).length;
  }

  get uncompletedTodos(): number {
    return this.todos.filter(todo => todo.done === false).length;
  }

  findAll(status?: boolean): Todo[] {
    if (status !== undefined) {
      return this.todos.filter(todo => todo.done === status);
    }
    return this.todos;
  }

  findOne(id: number): Todo {
    const todo = this.todos.find((todo) => todo.id === id);

    if (!todo) {
      throw new NotFoundException("Todo with this id does not exist");
    }

    return todo;
  }

  create(createTodoInput: CreateTodoInput): Todo {
    const todo = new Todo();
    todo.description = createTodoInput.description;
    todo.id = Math.max(...this.todos.map(todo => todo.id), 0) + 1;
    this.todos.push(todo);
    return todo;
  }

  update(updateTodoInput: UpdateTodoInput): Todo {
    const todoToUpdate = this.findOne(updateTodoInput.id);
    if (updateTodoInput.description) {
      todoToUpdate.description = updateTodoInput.description;
    }
    if (updateTodoInput.done !== undefined) {
      todoToUpdate.done = updateTodoInput.done;
    }

    this.todos = this.todos.map(todo => {
      if (todo.id === updateTodoInput.id) {
        return todoToUpdate;
      }
      return todo;
    });

    return todoToUpdate;
  }

  delete(id: number): boolean {
    this.findOne(id);
    this.todos = this.todos.filter(todo => todo.id !== id);

    return true;
  }
}
