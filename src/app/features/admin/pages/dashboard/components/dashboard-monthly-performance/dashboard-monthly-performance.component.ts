import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard-monthly-performance',
  imports: [MatIconModule],
  templateUrl: './dashboard-monthly-performance.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardMonthlyPerformanceComponent {
  protected readonly monthlyGoalProgress = 72;
}
