import { OrderStatus } from '../../../../../shared/models/order-status.enum';

export interface RecentOrder {
  readonly id: number;
  readonly customer: string;
  readonly amount: string;
  readonly createdAt: string;
  readonly status: OrderStatus;
}
