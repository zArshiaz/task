import { Routes } from '@angular/router';

import { authChildGuard } from '../../core/auth/auth.guard';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    canActivateChild: [authChildGuard],
    loadComponent: () =>
      import('./layouts/admin-layout/admin-layout.component').then((m) => m.AdminLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./pages/products/products.component').then((m) => m.ProductsComponent),
      },
      {
        path: 'orders',
        loadComponent: () =>
          import('./pages/placeholder/admin-placeholder.component').then(
            (m) => m.AdminPlaceholderComponent,
          ),
        data: {
          title: 'سفارش‌ها',
          description: 'سفارش‌های جدید و وضعیت ارسال آن‌ها را اینجا مدیریت کنید.',
          icon: 'shopping_bag',
        },
      },
      {
        path: 'customers',
        loadComponent: () =>
          import('./pages/placeholder/admin-placeholder.component').then(
            (m) => m.AdminPlaceholderComponent,
          ),
        data: {
          title: 'مشتریان',
          description: 'اطلاعات مشتریان و سابقه خرید آن‌ها در این بخش قرار می‌گیرد.',
          icon: 'group',
        },
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./pages/placeholder/admin-placeholder.component').then(
            (m) => m.AdminPlaceholderComponent,
          ),
        data: {
          title: 'تنظیمات',
          description: 'تنظیمات عمومی فروشگاه و حساب کاربری را از اینجا تغییر دهید.',
          icon: 'settings',
        },
      },
    ],
  },
];
