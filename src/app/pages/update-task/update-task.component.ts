import { Component, OnInit } from '@angular/core';
import { Importance } from '../../models/importance.enum';
import { Task } from '../../models/task.model';
import { ServiceTaskService } from '../../service/service-task.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router  } from '@angular/router';
import { FormComponent } from '../form/form.component';


@Component({
  selector: 'app-update-task',
  standalone: true,
  imports: [FormsModule, FormComponent],
  templateUrl: './update-task.component.html',
  styleUrl: './update-task.component.css',
})
export class UpdateTaskComponent {
  task = new Task();
  TaskUpdate = new Task()
  importance = Importance;
  taskId!: string;
  isNewTask: boolean = true;

  constructor(private serviceTask: ServiceTaskService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.taskId = params.get('id') ?? '';
      if (this.taskId) {
        this.isNewTask = false;
        this.serviceTask.getById(this.taskId).subscribe((task: Task) => {
        this.task = task;
      });
    }
    });
  }

  updateTask(update: Task) {
    this.TaskUpdate.description = update.description
    this.TaskUpdate.expiredTime = update.expiredTime
    this.TaskUpdate.importance = update.importance
    this.TaskUpdate.title = update.title
    console.log(this.taskId, this.TaskUpdate);
    this.serviceTask.updateTask(this.taskId, this.TaskUpdate).subscribe(
      (data) => {
          this.router.navigate(['/']);
      },
      (error) => {
          console.error(error);
      }
  );
  }
}
