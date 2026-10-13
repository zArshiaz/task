import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { DashboardStat } from '../../models/dashboard-stat.model';

@Component({
  selector: 'app-dashboard-stat-card',
  imports: [MatIconModule],
  templateUrl: './dashboard-stat-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardStatCardComponent {
  readonly stat = input.required<DashboardStat>();
}
