import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITask } from '../models/task';
import { Task } from '../models/task.model';
import { TaskUpdate } from '../models/taskUpdate';
import { status } from '../models/status.enum';
import { Importance } from '../models/importance.enum';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};
@Injectable({
  providedIn: 'root'
})
export class ServiceTaskService {

  apiUrl: string = 'http://localhost:5273/api/Task'

  constructor(private http: HttpClient) { }

  getAllTaskList(): Observable<ITask[]>{
    return this.http.get<ITask[]>(this.apiUrl)
  }

  getFilterList(importance: Importance): Observable<ITask[]>{
    return this.http.get<ITask[]>(this.apiUrl+'/FilterImportance/'+ importance)
  }

  getById(id : string): Observable<Task>{
    return this.http.get<Task>(this.apiUrl+'/ById/'+id)
  }

  updateStateTask(id: string, status: status):Observable<status>{
    return this.http.put<status>(this.apiUrl+'/UpdateState/'+id, status, httpOptions)
  }

  updateTask(id : string, obj : Task) : Observable<Task>{
    return this.http.put<Task>(this.apiUrl+'/'+id, obj, httpOptions)
  }

  addNewTask (obj: Task): Observable<Task>{
    return this.http.post<Task>(this.apiUrl, obj, httpOptions)
  }

  deleteTask(id: string): Observable<ITask[]>{
    return this.http.delete<ITask[]>(this.apiUrl+'/'+id)
  }
}
