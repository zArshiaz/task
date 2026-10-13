import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

interface DashboardStat {
  readonly label: string;
  readonly value: string;
  readonly change: string;
  readonly icon: string;
  readonly iconClasses: string;
}

interface RecentOrder {
  readonly id: string;
  readonly customer: string;
  readonly amount: string;
  readonly status: string;
  readonly statusClasses: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [MatIcon, RouterLink],
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  protected readonly stats: readonly DashboardStat[] = [
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

  protected readonly recentOrders: readonly RecentOrder[] = [
    {
      id: '#۱۰۴۸',
      customer: 'مریم احمدی',
      amount: '۲٬۴۵۰٬۰۰۰ تومان',
      status: 'در حال پردازش',
      statusClasses: 'bg-amber-50 text-amber-700',
    },
    {
      id: '#۱۰۴۷',
      customer: 'علی رضایی',
      amount: '۱٬۳۲۰٬۰۰۰ تومان',
      status: 'ارسال شده',
      statusClasses: 'bg-cyan-50 text-cyan-700',
    },
    {
      id: '#۱۰۴۶',
      customer: 'سارا کریمی',
      amount: '۸۹۰٬۰۰۰ تومان',
      status: 'تکمیل شده',
      statusClasses: 'bg-emerald-50 text-emerald-700',
    },
  ];
}
