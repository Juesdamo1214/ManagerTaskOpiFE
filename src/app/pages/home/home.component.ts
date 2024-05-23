import { Component, OnInit, computed, signal } from '@angular/core';
import { ServiceTaskService } from '../../service/service-task.service';
import { ITask } from '../../models/task';
import { Router } from '@angular/router';
import { status } from '../../models/status.enum';
import { Importance } from '../../models/importance.enum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  taskList: ITask[] = [];
  status: status = status.completed;
  importance = Importance;
  filter = signal<'all' | 'high' | 'half' | 'low'>('all')


  constructor(private serviceTask: ServiceTaskService, private router: Router) {}

  ngOnInit(): void {
    this.loadAllTask();
  }

  goToFormTask(){
    this.router.navigate(['/formTask'])
  }

  goToUpdateTask(id:string){
    this.router.navigate(['/updateTask',id])
  }
  getImportanceLabel(importance: Importance): string {
    switch (importance) {
      case Importance.low:
        return 'Low';
      case Importance.half:
        return 'Half';
      case Importance.high:
        return 'High';
      default:
        return '';
    }
  }

  taskByFilter = computed(() => {
    const filter = this.filter();
    const tasks = this.taskList;
    if(filter === 'high'){
        this.serviceTask.getFilterList(this.importance.high).subscribe((tasks: ITask[]) => {
          this.taskList = tasks;});
          console.log(this.taskList);
    }
    if(filter === 'half'){
      this.serviceTask.getFilterList(this.importance.half).subscribe((tasks: ITask[]) => {
        this.taskList = tasks;});
    }
    if(filter === 'low'){
      this.serviceTask.getFilterList(this.importance.low).subscribe((tasks: ITask[]) => {
        this.taskList = tasks;});
    }
    return tasks
  })

  updateState(id:string, statusE: status){
    if(statusE === status.completed) {
      this.serviceTask.updateStateTask(id, status.pending).subscribe(
        (data) =>{
          console.log(data)
          window.location.reload()
        },
        (error) => console.error(error));
    }else{
      this.serviceTask.updateStateTask(id, status.completed).subscribe(
        (data) =>{
          console.log(data)
          window.location.reload()
        },
        (error) => console.error(error));
    }
  }

  loadAllTask() {
    this.serviceTask.getAllTaskList().subscribe((tasks: ITask[]) => {
      this.taskList = tasks;
    });
  }

  changeFilter(filter: 'all' | 'high' | 'half' | 'low'){
    if(filter === 'high'){
      this.serviceTask.getFilterList(this.importance.high).subscribe((tasks: ITask[]) => {
        this.taskList = tasks;
      });
    } else if(filter === 'half'){
      this.serviceTask.getFilterList(this.importance.half).subscribe((tasks: ITask[]) => {
        this.taskList = tasks;
      });
    } else if(filter === 'low'){
      this.serviceTask.getFilterList(this.importance.low).subscribe((tasks: ITask[]) => {
        this.taskList = tasks;
      });
    } else if(filter === 'all'){
      this.serviceTask.getAllTaskList().subscribe((tasks: ITask[]) => {
        this.taskList = tasks;
      });
    }
  }

  DeleteTask(id:string){
    this.serviceTask.deleteTask(id).subscribe(
      (data) => {
        console.log(data)
        window.location.reload();
      },
      (error) => console.error(error)
    );
  }
}


