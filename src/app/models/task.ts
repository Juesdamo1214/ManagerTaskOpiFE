import { Importance } from "./importance.enum";
import { status } from "./status.enum";

export interface ITask {
  idTask: string;
  idUser: string;
  title: string;
  status: status;
  importance: Importance;
  expirationDate: Date,
  description: string,
  user: null
}
