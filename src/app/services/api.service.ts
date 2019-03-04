import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Todo } from '../models/todo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  todo_api = 'http://127.0.0.1:5000/api/v1/resources'

  constructor(private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  // Get All Todos
  getTodos() {
    const url = `${this.todo_api}/todos/all`;
    
    return this.http.get(url);
  }

  // Create New Todo
  createTodo(todo: Todo): Observable<Todo> {
    const url = `${this.todo_api}/new`;

    return this.http.post<Todo>(url, todo, this.httpOptions);
  }

  // Delete Todo
  deleteTodo(todo: Todo | number): Observable<Todo> {
    const id = typeof todo === 'number' ? todo : todo.id;
    const url = `${this.todo_api}/todos/${id}`;

    return this.http.delete<Todo>(url, this.httpOptions);
  }

  // Complete Todo
  completeTodo(todo: Todo | number): Observable<Todo> {
    const id = typeof todo === 'number' ? todo : todo.id;
    console.log(id);
    const url = `${this.todo_api}/todos/complete?id=${id}`;

    return this.http.get<Todo>(url);
  }
}
