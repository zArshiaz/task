import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';

import { OrderStatusBadgeComponent } from '../../../../../../shared/components/order-status-badge/order-status-badge.component';
import { JalaliDatePipe } from '../../../../../../shared/pipes/jalali-date/jalali-date.pipe';
import { RecentOrder } from '../../models/recent-order.model';
import { MatSort, MatSortHeader } from '@angular/material/sort';

@Component({
  selector: 'app-dashboard-recent-orders',
  imports: [
    JalaliDatePipe,
    MatTableModule,
    OrderStatusBadgeComponent,
    RouterLink,
    MatSort,
    MatSortHeader,
  ],
  templateUrl: './dashboard-recent-orders.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardRecentOrdersComponent implements AfterViewInit {
  readonly orders = input.required<readonly RecentOrder[]>();
  readonly dataSource = new MatTableDataSource<RecentOrder>();
  @ViewChild(MatSort)
  sort!: MatSort;

  protected readonly displayedColumns: readonly string[] = [
    'id',
    'customer',
    'createdAt',
    'amount',
    'status',
  ];

  constructor() {
    effect(() => {
      this.dataSource.data = [...this.orders()];
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
}
