import { TRootState } from '..';

export const allBlogSelector = (state: TRootState) => {
  return state.blog.allBlogs ?? { total: 0, items: [] };
};
