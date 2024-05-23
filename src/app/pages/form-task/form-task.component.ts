import { Component,OnInit } from '@angular/core';
import { Task } from '../../models/task.model';
import { FormsModule } from '@angular/forms';
import { ServiceTaskService } from '../../service/service-task.service';
import { Importance } from '../../models/importance.enum';
import { FormComponent } from '../form/form.component'
import { Router } from '@angular/router';


@Component({
  selector: 'app-form-task',
  standalone: true,
  imports: [ FormsModule, FormComponent ],
  templateUrl: './form-task.component.html',
  styleUrl: './form-task.component.css'
})
export class FormTaskComponent {

  importance = Importance
  task = new Task();
  isNewTask: boolean = true;

  constructor(private serviceTask: ServiceTaskService,private router: Router) {}

  addTask(task: any) {
    const formatTask = {
      ...task,
      importance: parseInt(task.importance)
    }
    this.serviceTask.addNewTask(formatTask).subscribe(
        (data) => {
            console.log(data)
            this.router.navigate(['/']);
        },
        (error) => {
            console.error(error);
        }
    );
}
}
