import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
   
  {
    path: 'inicio',
    loadComponent: () => import('./pages/inicio/inicio.page').then( m => m.InicioPage)
  },
  {
    path: 'tarefa',
    loadComponent: () => import('./pages/tarefa/tarefa.page').then( m => m.TarefaPage)
  },
  {
    path: 'add-tarefa',
    loadComponent: () => import('./pages/add-tarefa/add-tarefa.page').then( m => m.AddTarefaPage)
  },
  {
    path: 'add-tarefas/:id',
    loadComponent: () => import('./pages/add-tarefa/add-tarefa.page').then( m => m.AddTarefaPage)
  },
];
