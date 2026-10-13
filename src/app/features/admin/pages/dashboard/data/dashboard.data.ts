import { DashboardStat } from '../models/dashboard-stat.model';
import { RecentOrder } from '../models/recent-order.model';
import { OrderStatus } from '../../../../../shared/models/order-status.enum';

export const DASHBOARD_STATS: readonly DashboardStat[] = [
  {
    label: 'فروش امروز',
    value: '۱۲٬۸۴۰٬۰۰۰ تومان',
    change: '۱۲٪ بیشتر از دیروز',
    icon: 'payments',
    iconClasses: 'bg-emerald-100 text-emerald-700',
  },
  {
    label: 'سفارش‌های جدید',
    value: '۴۸ سفارش',
    change: '۸ سفارش در انتظار',
    icon: 'shopping_bag',
    iconClasses: 'bg-cyan-100 text-cyan-700',
  },
  {
    label: 'مشتریان جدید',
    value: '۲۴ نفر',
    change: '۶٪ رشد این هفته',
    icon: 'person_add',
    iconClasses: 'bg-violet-100 text-violet-700',
  },
  {
    label: 'موجودی رو به اتمام',
    value: '۷ محصول',
    change: 'نیازمند بررسی',
    icon: 'inventory',
    iconClasses: 'bg-amber-100 text-amber-700',
  },
];

export const RECENT_ORDERS: readonly RecentOrder[] = [
  {
    id: 1048,
    customer: 'مریم احمدی',
    amount: '۲٬۴۵۰٬۰۰۰ تومان',
    createdAt: '2026-10-14T09:30:00',
    status: OrderStatus.Processing,
  },
  {
    id: 1047,
    customer: 'علی رضایی',
    amount: '۱٬۳۲۰٬۰۰۰ تومان',
    createdAt: '2026-10-13T16:45:00',
    status: OrderStatus.Shipped,
  },
  {
    id: 1046,
    customer: 'سارا کریمی',
    amount: '۸۹۰٬۰۰۰ تومان',
    createdAt: '2026-10-12T11:15:00',
    status: OrderStatus.Completed,
  },
];
