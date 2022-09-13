import {Todo} from "../models/todo";
import {Injectable} from "@angular/core";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {ToDoService} from "../services/to-do.service";

import {catchError, from, mergeMap, of, tap} from "rxjs";
import {NewRecord} from "./records.store";


export interface TodoStateModel {
  todos: Todo[];
  isLoading: boolean;

}

export class DelTodo {
  static readonly type = "[Todo] delTodo"

  constructor(public todo: Todo) {
  }

}


export class AddTodo {
  static readonly type = "[Todo] addTodo"

  constructor(public todo: Todo) {
  }

}

export class GetTodos {
  static readonly type = "[Todo] getTodos"

  constructor() {
  }

}

export class UpdateTodos {
  static readonly type = "[Todo] updateTodos"

  constructor(public todo: Todo) {
  }

}



@State<TodoStateModel>({
  name: "todo",
  defaults: {
    todos: [],
    isLoading: false
  }
})

@Injectable()
export class TodoState {
  constructor(private toDoService: ToDoService) {
  }

  @Action(AddTodo, {cancelUncompleted: false})
  addTodo(ctx: StateContext<TodoStateModel>, action: AddTodo) {
    const state = ctx.getState()
    ctx.patchState({isLoading: true, todos: [...state.todos, action.todo]} )
    return this.toDoService.add(action.todo)
      .pipe(
        tap(todo => {
          ctx.patchState({isLoading: false, todos: [...state.todos, todo]} )
        }),
        catchError(err => {
          alert(err);
          ctx.patchState({isLoading: false, todos: state.todos} )
          return  from([])}),
        mergeMap(_ => ctx.dispatch([new NewRecord({record: action.todo.title, color: 'bg-success'})]))
      )
  }


  @Action(GetTodos)
  getTodo(ctx: StateContext<TodoStateModel>, action: GetTodos) {
    ctx.patchState({isLoading: true})
    return this.toDoService.getTodo()
      .pipe(
        tap(todos => {
          const state = ctx.getState()
          ctx.patchState({isLoading: false, todos: todos} )
        }),
        mergeMap(_ => ctx.dispatch([]))
      )
  }



  @Action(DelTodo)
  del(ctx: StateContext<TodoStateModel>, action: DelTodo) {
    ctx.patchState({isLoading: true})

    console.log('1')

    return this.toDoService.remove(action.todo)
      .pipe(
        tap(todos => {
          const state = ctx.getState()
          ctx.patchState({isLoading: false, todos: state.todos.filter(todo => todo != action.todo)} )
        }),
        mergeMap(_ => {
          return ctx.dispatch([new NewRecord({record: action.todo.title, color: 'bg-danger'})])
        }
        )
      )

  }


  @Action(UpdateTodos)
  update(ctx: StateContext<TodoStateModel>, action: UpdateTodos) {
    const state = ctx.getState()
    ctx.patchState({isLoading: true})
    return this.toDoService.toggleCompleted(action.todo)
      .pipe(
        tap(todos => {
          const state = ctx.getState()
          console.log(state.todos)
          ctx.patchState({isLoading: false, todos: state.todos.map((todo) => {
            if (todo.id === action.todo.id) {
              return {...todo, ...action.todo};
            }
            return todo;
          } ) } )
        }),
        mergeMap(_ => ctx.dispatch([]))
      )

  }

  @Selector()
  static todos(state: TodoStateModel): Todo[]{
    return state.todos
  }

  @Selector()
  static isLoading(state: TodoStateModel): boolean{
    return state.isLoading
  }

  @Selector()
  static lengthTodos(state: TodoStateModel): number{
    return state.todos.length
  }

}
