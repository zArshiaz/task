import { AdminNavigationItem } from '../models/admin-navigation-item.model';

export const ADMIN_NAVIGATION_ITEMS: readonly AdminNavigationItem[] = [
  { path: '/admin', label: 'نمای کلی', icon: 'dashboard' },
  { path: '/admin/products', label: 'محصولات', icon: 'inventory_2' },
];
