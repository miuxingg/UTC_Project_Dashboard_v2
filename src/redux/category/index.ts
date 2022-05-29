import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiSdk } from '../../libs/apis';
import { ICategoryCreate } from '../../libs/apis/category/types';
import { BaseQuery } from '../../libs/utils/buildQueries';
import { createGenericSlice } from '../../libs/utils/createGenericSlice';
import { setError, setSuccess } from '../app';
import { ICategoryState } from './types';

export const initialState: ICategoryState = {};

export const getAllCategory = createAsyncThunk(
  'getAllCategory',
  async (queries: BaseQuery) => {
    const data = await apiSdk.categoryApis.getAllCategory(queries);
    return data;
  }
);

export const createCategory = createAsyncThunk(
  'createCategory',
  async (input: ICategoryCreate, { dispatch }) => {
    try {
      const result = await apiSdk.categoryApis.createCategory(input);
      dispatch(setSuccess({ message: 'Tạo thể loại thành công' }));
      return result;
    } catch (error) {
      dispatch(setError({ message: 'Tạo thể loại thất bại' }));
    }
  }
);

export const deleteCategory = createAsyncThunk(
  'deleteCategory',
  async ({ id, input }: any, { dispatch }) => {
    try {
      const result = await apiSdk.categoryApis.deleteCategory(id, input);
      if (result) {
        dispatch(setSuccess({ message: 'Cập nhật thể loại thành công' }));
        return result;
      } else {
        dispatch(setError({ message: 'Cập nhật thể loại thất bại' }));
      }
    } catch (error) {
      dispatch(setError({ message: 'Cập nhật thể loại thất bại' }));
    }
  }
);

export const updateCategory = createAsyncThunk(
  'updateCategory',
  async ({ id, input }: any, { dispatch }) => {
    try {
      const result = await apiSdk.categoryApis.updateCategory(id, input);

      if (result) {
        dispatch(setSuccess({ message: 'Cập nhật thể loại thành công' }));
        return result;
      } else {
        dispatch(setError({ message: 'Cập nhật thể loại thất bại' }));
      }
    } catch (error) {
      dispatch(setError({ message: 'Cập nhật thể loại thất bại' }));
    }
  }
);

export const categorySlice = createGenericSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategories(state, action) {
      state.categories = {
        items: action.payload.items,
        total: action.payload.total,
      };
    },

    getCategoryById(state, action) {
      state.category = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllCategory.fulfilled, (state, action) => {
      state.categories = {
        items: action.payload.items,
        total: action.payload.total,
      };
    });

    builder.addCase(createCategory.fulfilled, (state, action) => {
      state.categories = {
        items: [...(state?.categories.items || []), action.payload],
        total: state?.categories?.total + 1 || 0,
      };
    });

    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.categories = {
        items: (state?.categories.items || []).map((item) =>
          item.id !== action.payload.id
            ? { ...item }
            : { ...item, status: action.payload.status }
        ),
        total: state?.categories?.total - 1 || 0,
      };
    });

    builder.addCase(updateCategory.fulfilled, (state, action) => {
      state.categories = {
        items: (state?.categories.items || []).map((item) =>
          item.id !== action.payload.id
            ? item
            : { ...item, name: action.payload.name }
        ),
        total: state?.categories?.total || 0,
      };
    });
  },
});

export const { setCategories, getCategoryById } = categorySlice.actions;

export default categorySlice.reducer;
