import { ITask } from '../models/task';
import { Importance } from './importance.enum';
import { status } from './status.enum';

export class TaskUpdate implements ITask {
  idTask: string = '';
  idUser: string = '';
  title: string = '';
  status: status = 0;
  importance: Importance = Importance.low;
  expirationDate: Date = new Date();
  description: string = '';
  user: null = null;
}
