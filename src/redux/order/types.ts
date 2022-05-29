import { IPaginationOutput } from '../../configs/types';
import { IOrderOutput } from '../../libs/apis/order/types';

export interface IOrderState {
  ordersByStatus?: IPaginationOutput<IOrderOutput>;
}
