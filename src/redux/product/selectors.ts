import { TRootState } from '..';

export const allBookByFilter = (state: TRootState) => {
  return state.books?.allBooks ?? { total: 0, items: [] };
};

export const bookBestSalerSelector = (state: TRootState) => {
  return state.books?.bestSaler ?? { total: 0, items: [] };
};

export const bookDetailSelector = (state: TRootState) => {
  return (
    state.books.bookDetail ?? {
      id: '',
      name: '',
      price: 0,
      priceUnDiscount: 0,
      description: '',
      author: '',
      category: [],
      publishers: [],
      cloudTag: [],
      thumbnail: '',
      images: [],
      status: '',
      quantity: 0,
      summary: '',
      isCombo: false,
      books: [],
      isFavorite: false,
      rating: 0,
    }
  );
};
