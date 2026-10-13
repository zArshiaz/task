import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { AuthStore } from '../../../../core/auth/auth.store';

interface NavigationItem {
  readonly path: string;
  readonly label: string;
  readonly icon: string;
}

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatButtonModule, MatIcon, MatSidenavModule],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminLayoutComponent {
  protected readonly authStore = inject(AuthStore);
  protected readonly isSidebarCollapsed = signal(false);
  protected readonly navigationItems: readonly NavigationItem[] = [
    { path: '/admin/dashboard', label: 'نمای کلی', icon: 'dashboard' },
    { path: '/admin/products', label: 'محصولات', icon: 'inventory_2' },
    { path: '/admin/orders', label: 'سفارش‌ها', icon: 'shopping_bag' },
    { path: '/admin/customers', label: 'مشتریان', icon: 'group' },
    { path: '/admin/settings', label: 'تنظیمات', icon: 'settings' },
  ];

  private readonly router = inject(Router);

  protected toggleSidebar(): void {
    this.isSidebarCollapsed.update((isCollapsed) => !isCollapsed);
  }

  protected logout(): void {
    this.authStore.logout();
    void this.router.navigate(['/auth/login']);
  }
}
