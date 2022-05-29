import { TRootState } from '..';

export const allPublisher = (state: TRootState) => {
  return state?.publisher?.allPublisher ?? { total: 0, items: [] };
};

export const publisherByIdSelector = (state: TRootState) => {
  return state.publisher.publisher ?? { id: '', name: '' };
};
