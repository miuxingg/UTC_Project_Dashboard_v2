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
  | 'voucherCreate'
  | 'config';

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
    title: 'Đăng nhập',
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
    title: 'Nhân viên',
    path: '/dashboard/employee',
    icon: 'bi bi-patch-check',
    roles: [Roles.System],
  },
  emplyeeCreate: {
    title: 'Tạo nhân viên',
    path: '/dashboard/employee/create',
    icon: 'bi bi-patch-check',
    roles: [Roles.System],
    hide: true,
  },
  category: {
    title: 'Thể loại',
    path: '/dashboard/category',
    icon: 'bi bi-patch-check',
    roles: [Roles.Manager],
  },
  categoryCreate: {
    title: 'Tạo thể loại',
    path: '/dashboard/category/create',
    icon: 'bi bi-patch-check',
    roles: [Roles.Manager],
    hide: true,
  },
  product: {
    title: 'Sản phẩm',
    path: '/dashboard/product',
    icon: 'bi bi-patch-check',
    roles: [Roles.Manager],
  },
  productCreate: {
    title: 'Tạo sản phẩm',
    path: '/dashboard/product/create',
    icon: 'bi bi-patch-check',
    roles: [Roles.Manager],
    hide: true,
  },
  manageOrder: {
    title: 'Quản lý đơn hàng',
    path: '/dashboard/manage-order',
    icon: 'bi bi-patch-check',
    roles: [Roles.Manager],
  },
  publisher: {
    title: 'Nhà xuất bản',
    path: '/dashboard/publisher',
    icon: 'bi bi-patch-check',
    roles: [Roles.Manager],
  },
  publisherCreate: {
    title: 'Tạo nhà xuất bản',
    path: '/dashboard/publisher/create/',
    icon: 'bi bi-patch-check',
    roles: [Roles.Manager],
    hide: true,
  },
  blog: {
    title: 'Bài viết',
    path: '/dashboard/blog',
    icon: 'bi bi-patch-check',
    roles: [Roles.Manager],
  },
  blogCreate: {
    title: 'Tạo bài viết',
    path: '/dashboard/blog/create/',
    icon: 'bi bi-patch-check',
    roles: [Roles.Manager],
    hide: true,
  },
  voucher: {
    title: 'Giảm giá',
    path: '/dashboard/voucher',
    icon: 'bi bi-patch-check',
    roles: [Roles.Manager],
  },
  voucherCreate: {
    title: 'Tạo giảm giá',
    path: '/dashboard/voucher/create/',
    icon: 'bi bi-patch-check',
    roles: [Roles.Manager],
    hide: true,
  },
  config: {
    title: 'Thiết lập',
    path: '/dashboard/config/',
    icon: 'bi bi-patch-check',
    roles: [Roles.System],
  },
};
