import { ICategoryApi } from '../../libs/apis/category/types';
import { IVoucherApi } from '../../libs/apis/voucher/types';
import { IPaginationOutput } from '../../libs/types';

export interface ICategoryState {
  vouchers?: IPaginationOutput<IVoucherApi>;
  voucher?: IVoucherApi;
}
