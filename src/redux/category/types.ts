import { ICategoryApi } from '../../libs/apis/category/types';
import { IPaginationOutput } from '../../libs/types';

export interface ICategoryState {
  categories?: IPaginationOutput<ICategoryApi>;
  category?: ICategoryApi;
}
