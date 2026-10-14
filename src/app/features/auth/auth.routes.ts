import { Routes } from '@angular/router';

import { guestChildGuard } from '../../core/auth/auth.guard';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    canActivateChild: [guestChildGuard],
    loadComponent: () =>
      import('./layouts/auth-layout/auth-layout.component').then((m) => m.AuthLayoutComponent),
    children: [
      {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then((m) => m.LoginComponent),
      },
      { path: '', pathMatch: 'full', redirectTo: 'login' },
    ],
  },
];
