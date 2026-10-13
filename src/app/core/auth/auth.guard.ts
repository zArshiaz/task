import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';

import { AuthStore } from './auth.store';

const isAuthenticated = (): boolean => inject(AuthStore).isLoggedIn();

const redirectToLogin = () => inject(Router).createUrlTree(['/auth/login']);

export const authChildGuard: CanActivateChildFn = () =>
  isAuthenticated() ? true : redirectToLogin();
