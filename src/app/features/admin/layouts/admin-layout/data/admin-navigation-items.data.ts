import { AdminNavigationItem } from '../models/admin-navigation-item.model';

export const ADMIN_NAVIGATION_ITEMS: readonly AdminNavigationItem[] = [
  { path: '/admin', label: 'نمای کلی', icon: 'dashboard' },
  { path: '/admin/products', label: 'محصولات', icon: 'inventory_2' },
  { path: '/admin/orders', label: 'سفارش‌ها', icon: 'shopping_bag' },
  { path: '/admin/customers', label: 'مشتریان', icon: 'group' },
  { path: '/admin/settings', label: 'تنظیمات', icon: 'settings' },
];
