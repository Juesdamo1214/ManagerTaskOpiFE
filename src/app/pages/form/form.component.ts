import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Importance } from '../../models/importance.enum';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  importance = Importance
  @Input() task!: Task;
  @Output() submitEvent = new EventEmitter<Task>()

  isNewTask: boolean = true;

  onSubmit() {
    this.submitEvent.emit(this.task);
  }
}
