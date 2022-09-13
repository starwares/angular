import { Injectable } from '@angular/core';
import {Todo} from "../models/todo";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, BehaviorSubject, Subject} from "rxjs";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class ToDoService {

  private todoUrl = 'http://localhost:8080/api/Todo'


  constructor(private http: HttpClient) {
  }


  getTodo(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todoUrl)
  }


  add(todo: Todo): Observable<Todo> {
    todo.id = 0
    return this.http.post<Todo>(this.todoUrl, todo, httpOptions)

    }


  remove(todo: Todo): Observable<Todo>{
    return this.http.delete<Todo>(`${this.todoUrl}/${todo.id}`)
  }


  toggleCompleted(todo: Todo ): Observable<Todo> {
      return this.http.put<Todo>(this.todoUrl, todo)
    }








}
