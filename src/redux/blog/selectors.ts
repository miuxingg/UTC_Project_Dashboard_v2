import { TRootState } from '..';

export const allBlogSelector = (state: TRootState) => {
  return state.blog.allBlogs ?? { total: 0, items: [] };
};

export const currentBlogSelector = (state: TRootState) => {
  return state.blog.blog ?? { id: '', title: '', content: '', image: '' };
};
