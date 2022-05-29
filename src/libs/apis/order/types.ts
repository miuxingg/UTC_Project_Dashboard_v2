import { BaseQuery } from '../../utils/buildQueries';
import { IBookApi } from '../product/types';

export interface IAddressApi {
  code: number;
  name: string;
}

export interface ShippingMethod {
  firstName?: string;
  lastName?: string;
  province?: IAddressApi;
  district?: IAddressApi;
  wards?: IAddressApi;
  privateHome?: string;
  phoneNumber?: string;
  email?: string;
  amount?: number;
}

export enum IPaymentMethod {
  VisaCard = 'VisaCard',
  COD = 'COD',
}

export enum IPaymentStatus {
  Pending = 'pending',
  Success = 'success',
  Rejected = 'rejected',
}

export enum IOrderStatus {
  Pending = 'pending',
  Success = 'success',
  Rejected = 'rejected',
  Shipping = 'shipping',
}
export interface IOrderLine {
  bookId: string;
  quantity: number;
  price: number;
}

export interface IOrderInput {
  totalMoney: number;
  discount: number;
  status: IOrderStatus;
  paymentStatus: IPaymentStatus;
  paymentMethod: IPaymentMethod;
  shippingMethod: ShippingMethod;
  orderLines: IOrderLine[];
}

export interface IGetOrderInput extends BaseQuery {
  status: IOrderStatus;
}

export interface IOrderLineOutput {
  id: string;
  price: number;
  quantity: number;
  book: IBookApi[];
}

export interface IOrderOutput {
  id: string;
  totalMoney: number;
  discount: number;
  paymentStatus: IPaymentStatus;
  status: string;
  shippingMethod: ShippingMethod;
  orderLines: IOrderLineOutput[];
  createdAt: Date;
}
