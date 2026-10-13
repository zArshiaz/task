import { ChangeDetectionStrategy, Component } from '@angular/core';

import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { DASHBOARD_STATS, RECENT_ORDERS } from './data/dashboard.data';
import { DashboardMonthlyPerformanceComponent } from './components/dashboard-monthly-performance/dashboard-monthly-performance.component';
import { DashboardRecentOrdersComponent } from './components/dashboard-recent-orders/dashboard-recent-orders.component';
import { DashboardStatCardComponent } from './components/dashboard-stat-card/dashboard-stat-card.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    DashboardStatCardComponent,
    DashboardMonthlyPerformanceComponent,
    DashboardRecentOrdersComponent,
    PageHeaderComponent,
  ],
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  protected readonly stats = DASHBOARD_STATS;
  protected readonly recentOrders = RECENT_ORDERS;
}
