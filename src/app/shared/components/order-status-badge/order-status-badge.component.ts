import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { ORDER_STATUS_PRESENTATION } from '../../models/order-status.data';
import { OrderStatus } from '../../models/order-status.enum';

@Component({
  selector: 'app-order-status-badge',
  templateUrl: './order-status-badge.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderStatusBadgeComponent {
  readonly status = input.required<OrderStatus>();

  protected readonly label = computed(() => ORDER_STATUS_PRESENTATION[this.status()].label);
  protected readonly classes = computed(() => ORDER_STATUS_PRESENTATION[this.status()].classes);
}
