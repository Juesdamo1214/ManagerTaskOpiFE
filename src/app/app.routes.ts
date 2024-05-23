import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component'
import { FormTaskComponent } from './pages/form-task/form-task.component'
import { UpdateTaskComponent } from './pages/update-task/update-task.component'


export const routes: Routes = [
  {
    path: '',
    component : HomeComponent
  },
  {
    path: 'formTask',
    component : FormTaskComponent
  },
  {
    path: 'updateTask/:id',
    component : UpdateTaskComponent
  }
];
