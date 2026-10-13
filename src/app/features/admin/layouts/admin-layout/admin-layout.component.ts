import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterOutlet } from '@angular/router';

import { AuthStore } from '../../../../core/auth/auth.store';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { AdminSidebarComponent } from './components/admin-sidebar/admin-sidebar.component';
import { ADMIN_NAVIGATION_ITEMS } from './data/admin-navigation-items.data';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, MatSidenavModule, AdminHeaderComponent, AdminSidebarComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminLayoutComponent {
  protected readonly authStore = inject(AuthStore);
  protected readonly navigationItems = ADMIN_NAVIGATION_ITEMS;

  private readonly router = inject(Router);

  protected logout(): void {
    this.authStore.logout();
    void this.router.navigate(['/auth/login']);
  }
}
