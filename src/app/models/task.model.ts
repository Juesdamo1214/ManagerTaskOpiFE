import { Importance } from './importance.enum';
export class Task{
  title?: string;
  description?: string;
  expiredTime?: Date;
  importance?: Importance;
}
