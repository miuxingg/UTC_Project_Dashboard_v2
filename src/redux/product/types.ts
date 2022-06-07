import { IPaginationOutput } from '../../configs/types';
import { IBookApi } from '../../libs/apis/product/types';

export interface IBookState {
  bookDetail?: IBookApi;
  allBooks?: IPaginationOutput<IBookApi>;
  bestSaler?: IPaginationOutput<IBookApi>;
}
