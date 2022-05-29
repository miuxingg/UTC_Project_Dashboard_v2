import { IBlogApi } from '../../libs/apis/blog/types';
import { ICategoryApi } from '../../libs/apis/category/types';
import { IPaginationOutput } from '../../libs/types';

export interface IBlogState {
  allBlogs?: IPaginationOutput<IBlogApi>;
}
