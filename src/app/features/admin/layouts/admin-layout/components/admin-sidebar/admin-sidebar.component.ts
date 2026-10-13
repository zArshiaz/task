import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { AdminNavigationItem } from '../../models/admin-navigation-item.model';

@Component({
  selector: 'app-admin-sidebar',
  imports: [RouterLink, RouterLinkActive, MatButtonModule, MatIcon],
  templateUrl: './admin-sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminSidebarComponent {
  readonly navigationItems = input.required<readonly AdminNavigationItem[]>();
  readonly collapsed = input(false);
  readonly mobile = input(false);

  readonly isSidebarCollapsed = signal(false);

  readonly closeRequested = output<void>();
  readonly logoutRequested = output<void>();

  protected readonly isCollapsed = computed(() => !this.mobile() && this.isSidebarCollapsed());

  protected toggleSidebar(): void {
    this.isSidebarCollapsed.update((isCollapsed) => !isCollapsed);
  }
  protected handleNavigation(): void {
    if (this.mobile()) {
      this.closeRequested.emit();
    }
  }
}
