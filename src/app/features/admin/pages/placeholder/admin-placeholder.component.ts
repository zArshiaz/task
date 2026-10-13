import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-placeholder',
  imports: [MatIcon],
  templateUrl: './admin-placeholder.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminPlaceholderComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly data = this.route.snapshot.data;

  protected readonly title = typeof this.data['title'] === 'string' ? this.data['title'] : '';
  protected readonly description =
    typeof this.data['description'] === 'string' ? this.data['description'] : '';
  protected readonly icon =
    typeof this.data['icon'] === 'string' ? this.data['icon'] : 'construction';
}
