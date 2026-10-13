import { OrderStatus } from './order-status.enum';

export interface OrderStatusPresentation {
  readonly label: string;
  readonly classes: string;
}

export const ORDER_STATUS_PRESENTATION: Readonly<Record<OrderStatus, OrderStatusPresentation>> = {
  [OrderStatus.Processing]: {
    label: 'در حال پردازش',
    classes: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  },
  [OrderStatus.Shipped]: {
    label: 'ارسال شده',
    classes: 'bg-cyan-50 text-cyan-700 ring-cyan-600/20',
  },
  [OrderStatus.Completed]: {
    label: 'تکمیل شده',
    classes: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  },
  [OrderStatus.Cancelled]: {
    label: 'لغو شده',
    classes: 'bg-rose-50 text-rose-700 ring-rose-600/20',
  },
};
