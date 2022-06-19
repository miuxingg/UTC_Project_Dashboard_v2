import { IBlogApi } from '../blog/types';
export interface IShopInfomation {
  email: string;
  numberPhone: string;
  address: string;
}
export interface IConfigApi {
  id: string;
  blog: IBlogApi[];
  shippingMoney?: number;
  shopInfomation?: IShopInfomation;
}

export interface IConfigCreate {
  blog?: string[];
  shippingMoney?: number;
  shopInfomation?: IShopInfomation;
}
