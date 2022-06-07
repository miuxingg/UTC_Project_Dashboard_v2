import { IBlogApi } from '../../libs/apis/blog/types';
import { IPaginationOutput } from '../../libs/types';

export interface IBlogState {
  allBlogs?: IPaginationOutput<IBlogApi>;
  blog?: IBlogApi;
}
