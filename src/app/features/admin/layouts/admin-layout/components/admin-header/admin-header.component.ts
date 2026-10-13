import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-admin-header',
  imports: [MatButtonModule, MatIcon],
  templateUrl: './admin-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminHeaderComponent {
  readonly mobileMenuExpanded = input(false);
  readonly username = input<string | null>();

  readonly mobileMenuRequested = output<void>();

  protected readonly usernameInitial = computed(() => this.username()?.trim().charAt(0) || 'م');
}
