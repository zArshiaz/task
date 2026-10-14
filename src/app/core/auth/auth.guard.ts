import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';

import { AuthStore } from './auth.store';

const isAuthenticated = (): boolean => inject(AuthStore).isLoggedIn();

const redirectToLogin = () => inject(Router).createUrlTree(['/auth/login']);
const redirectToAdmin = () => inject(Router).createUrlTree(['/admin']);

export const authChildGuard: CanActivateChildFn = () =>
  isAuthenticated() ? true : redirectToLogin();

export const guestChildGuard: CanActivateChildFn = () =>
  isAuthenticated() ? redirectToAdmin() : true;
