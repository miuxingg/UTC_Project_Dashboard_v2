// import { ORGANIZATION_ROLES, SYSTEM_ROLES } from '@givenow/consts';
import { Roles } from './roles.config';

type TRouteName =
  | 'dashboard'
  | 'employee'
  | 'emplyeeCreate'
  | 'category'
  | 'categoryCreate'
  | 'product'
  | 'productCreate'
  | 'login'
  | 'manageOrder'
  | 'publisher'
  | 'publisherCreate'
  | 'blog'
  | 'blogCreate'
  | 'voucher'
  | 'voucherCreate';

interface IRouteProperties {
  title: string;
  path: string;
  roles?: string[];
  protect?: boolean;
  icon?: string;
  hide?: boolean;
}
export const ROUTERS: Record<TRouteName, IRouteProperties> = {
  login: {
    title: 'Login',
    path: '/login',
    roles: [Roles.System, Roles.Manager],
    hide: true,
  },
  dashboard: {
    title: 'Dashboard',
    path: '/',
    icon: 'bi bi-speedometer2',
    roles: [Roles.System, Roles.Manager],
  },
  employee: {
    title: 'Employee',
    path: '/dashboard/employee',
    icon: 'bi bi-patch-check',
    roles: [Roles.System],
  },
  emplyeeCreate: {
    title: 'Employee create',
    path: '/dashboard/employee/create',
    icon: 'bi bi-patch-check',
    roles: [Roles.System],
    hide: true,
  },
  category: {
    title: 'Category',
    path: '/dashboard/category',
    icon: 'bi bi-patch-check',
    roles: [Roles.Manager],
  },
  categoryCreate: {
    title: 'Category Create',
    path: '/dashboard/category/create',
    icon: 'bi bi-patch-check',
    roles: [Roles.Manager],
    hide: true,
  },
  product: {
    title: 'Product',
    path: '/dashboard/product',
    icon: 'bi bi-patch-check',
    roles: [Roles.Manager],
  },
  productCreate: {
    title: 'Category Create',
    path: '/dashboard/product/create',
    icon: 'bi bi-patch-check',
    roles: [Roles.Manager],
    hide: true,
  },
  manageOrder: {
    title: 'Order Management',
    path: '/dashboard/manage-order',
    icon: 'bi bi-patch-check',
    roles: [Roles.Manager],
  },
  publisher: {
    title: 'Publisher',
    path: '/dashboard/publisher',
    icon: 'bi bi-patch-check',
    roles: [Roles.Manager],
  },
  publisherCreate: {
    title: 'Publisher',
    path: '/dashboard/publisher/create/',
    icon: 'bi bi-patch-check',
    roles: [Roles.Manager],
    hide: true,
  },
  blog: {
    title: 'Blog',
    path: '/dashboard/blog',
    icon: 'bi bi-patch-check',
    roles: [Roles.Manager],
  },
  blogCreate: {
    title: 'Blog',
    path: '/dashboard/blog/create/',
    icon: 'bi bi-patch-check',
    roles: [Roles.Manager],
    hide: true,
  },
  voucher: {
    title: 'Voucher',
    path: '/dashboard/voucher',
    icon: 'bi bi-patch-check',
    roles: [Roles.Manager],
  },
  voucherCreate: {
    title: 'Voucher',
    path: '/dashboard/voucher/create/',
    icon: 'bi bi-patch-check',
    roles: [Roles.Manager],
    hide: true,
  },
};
