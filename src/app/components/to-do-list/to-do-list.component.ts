import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Todo} from "../../models/todo";
import {AddTodo, DelTodo, GetTodos, TodoState} from "../../store/todo.store";
import {Select, Store} from "@ngxs/store";
import {Observable} from "rxjs";


@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent implements OnInit {
  constructor(public store: Store) {
  }

  todos: Todo[];
  newItemTitle = '';

  @Select(TodoState.todos)
  public todos$!: Observable<Todo[]>;

  @Select(TodoState.isLoading)
  public isLoading$!: Observable<boolean>;

  @Select(TodoState.lengthTodos)
  public lengthTodos$!: Observable<number>;



  ngOnInit(): void {
    this.todos$.subscribe(todo => this.todos = todo)
    this.getTodo()
  }

  getTodo(): void {
    this.store.dispatch(new GetTodos())
  }


  onDelItem(title: string) {
    setTimeout(() => {
      alert(title)
    }, 5 * 1000)


  }

  add() {
    this.store.dispatch(new AddTodo({
        isCompleted: false,
        title: this.newItemTitle,
        date: new Date()
      })
    )

    this.newItemTitle = ''

  }

  dellAll() {
    for (let model of this.todos){
      this.store.dispatch(new DelTodo(model))
    }




  }

  toggleCompleted(id: number | undefined) {
    let todo = this.todos.filter(e => e.id === id)

    if (todo[0]) {

      todo[0].isCompleted = !todo[0].isCompleted


    }


  }
}
