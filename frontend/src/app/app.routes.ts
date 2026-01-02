import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/hogares',
    pathMatch: 'full'
  },
  {
    path: 'hogares',
    loadComponent: () => import('./features/hogares/hogar-list/hogar-list').then(m => m.HogarListComponent)
  },
  {
    path: 'presupuestos/:mesId',
    loadComponent: () => import('./features/presupuestos/mes-view/mes-view').then(m => m.MesViewComponent)
  }
];
