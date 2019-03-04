import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { Todo } from './models/todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'todoui';

  todos: any = [];
  private todo;

  constructor(private apiService: ApiService) { 
  }

  ngOnInit() {
    this.getAllTodos();
  }

  getAllTodos() {
    this.apiService.getTodos()  
      .subscribe((res) => {
        for (let i = 0; i <= res['content'].length - 1; i++) {
          console.log(res['content']);
          this.todos.push(res['content'][i]);
        }
      });
  }

  addNewTodo() {
    console.log();

    let newTodo = {
      'id': 'id',
      'text': this.todo,
      'complete': false
    }
    
    return this.apiService.createTodo(newTodo)
      .subscribe(this.todos.push(newTodo))
    
  }

  deleteTodo(todo: Todo): void {
   this.todos = this.todos.filter(t => t !== todo);
   this.apiService.deleteTodo(todo)
    .subscribe(); 
  }

  completeTodo(todo: Todo): void {
    this.apiService.completeTodo(todo)
      .subscribe();
  }

}
