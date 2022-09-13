import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import {Todo} from "../../models/todo";
import {ToDoService} from "../../services/to-do.service";
import {Select, Store} from "@ngxs/store";
import {DelTodo, GetTodos, TodoState, UpdateTodos} from "../../store/todo.store";
import {Observable} from "rxjs";


@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Output() delEvent = new EventEmitter();


  // todos: Todo[];
  //
  // @Select(TodoState.todos)
  // public todos$!: Observable<Todo[]>;

  @Input()
  model!: Todo;

  constructor(public store: Store) {

  }

  ngOnInit(): void {
    //this.todos$.subscribe(todo => this.todos = todo)


  }

  eventLink(itemTitle: string) {
    // this.delEvent.emit(itemTitle)
  }

  remove() {
    this.eventLink(this.model.title);
    // this.todoService.remove(this.model.id).subscribe(() => this.todoService.getTodo().subscribe());
    this.store.dispatch(new DelTodo(this.model))


  }


  toggleCompleted(event: any) {
    //this.model.isCompleted = !this.model.isCompleted
    // this.todoService.toggleCompleted(this.model).subscribe()
    //this.store.dispatch(new UpdateTodos(this.model))
    this.store.dispatch(new UpdateTodos({id: this.model.id, isCompleted: !this.model.isCompleted, title: this.model.title, date: this.model.date}))
    //this.store.dispatch(new DelTodo(666))
  }

}
