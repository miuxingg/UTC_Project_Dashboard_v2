import { TRootState } from '..';

export const allCategoriesSelector = (state: TRootState) => {
  return state.category.categories ?? { total: 0, items: [] };
};

export const categoryByIdSelector = (state: TRootState) => {
  return state.category.category ?? { id: '', name: '' };
};
