import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiSdk } from '../../libs/apis';
import {
  ICreateBookApi,
  IUpdateStatusApi,
} from '../../libs/apis/product/types';
import { BookQueries } from '../../libs/utils/buildQueries';
import { createGenericSlice } from '../../libs/utils/createGenericSlice';
import { setError, setSuccess } from '../app';
import { IBookState } from './types';

export const initialState: IBookState = {};

export const allBooksByFilter = createAsyncThunk(
  'allBooksByFilter',
  async (queries?: BookQueries) => {
    const data = await apiSdk.bookApis.getAllBook(queries);
    return data;
  }
);

export const createBook = createAsyncThunk(
  'createBook',
  async (input: ICreateBookApi, { dispatch }) => {
    try {
      const data = await apiSdk.bookApis.createProduct(input);
      dispatch(setSuccess({ message: 'Tạo sản phẩm thành công' }));
      return data;
    } catch (error) {
      dispatch(setSuccess({ message: 'Tạo sản phẩm thất bại' }));
    }
  }
);

export const bookById = createAsyncThunk('bookById', async (id: string) => {
  const data = await apiSdk.bookApis.getBookById(id);
  return data;
});

export const updateBook = createAsyncThunk(
  'updateBook',
  async (
    { id, input }: { id: string; input: ICreateBookApi },
    { dispatch }
  ) => {
    try {
      const data = await apiSdk.bookApis.updateBook(id, input);
      dispatch(setSuccess({ message: 'Thay đổi thành công' }));
      return data;
    } catch (error) {
      dispatch(setError({ message: 'Thay đổi thất bại' }));
    }
  }
);

export const updateStatusBook = createAsyncThunk(
  'updateStatusBook',
  async (
    { id, input }: { id: string; input: IUpdateStatusApi },
    { dispatch }
  ) => {
    try {
      const data = await apiSdk.bookApis.updateStatus(id, input);
      dispatch(setSuccess({ message: 'Thay đổi thành công' }));
      return data;
    } catch (error) {
      dispatch(setError({ message: 'Thay đổi thất bại' }));
    }
  }
);

export const bookSlice = createGenericSlice({
  name: 'books',
  initialState,
  reducers: {
    getAllBooks(state, action) {
      state.allBooks = {
        items: action.payload.items,
        total: action.payload.total,
      };
    },
    getBookById(state, action) {
      state.bookDetail = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(allBooksByFilter.fulfilled, (state, action) => {
      state.allBooks = {
        items: action.payload.items,
        total: action.payload.total,
      };
    });

    builder.addCase(createBook.fulfilled, (state, action) => {
      state.allBooks = {
        items: [...state.allBooks.items, action.payload],
        total: [...state.allBooks.items, action.payload].length,
      };
    });

    builder.addCase(bookById.fulfilled, (state, action) => {
      state.bookDetail = action.payload;
    });

    builder.addCase(updateStatusBook.fulfilled, (state, action) => {
      const newData = state.allBooks.items.map((book) => {
        return book.id === action.payload.id
          ? { ...book, documentStatus: action.payload.documentStatus }
          : book;
      });

      state.allBooks = {
        items: newData,
        total: state.allBooks.total,
      };
    });
  },
});

export const { getAllBooks, getBookById } = bookSlice.actions;

export default bookSlice.reducer;
