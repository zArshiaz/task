import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MatPaginatorIntl } from '@angular/material/paginator';
import type { MatSnackBarConfig } from '@angular/material/snack-bar';

import { environment } from '../environments/environment';
import { API_BASE_URL } from './core/config/api-base-url.token';
import { routes } from './app.routes';
import { authInterceptor } from './core/auth/auth.interceptor';
import { PersianPaginatorIntl } from './shared/config/persian-paginator-intl';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouter(routes),
    { provide: API_BASE_URL, useValue: environment.apiBaseUrl },
    { provide: MatPaginatorIntl, useExisting: PersianPaginatorIntl },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: { duration: 3500 } satisfies MatSnackBarConfig,
    },
  ],
};
