import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiSdk } from '../../libs/apis';
import { IBlogCreate } from '../../libs/apis/blog/types';
import { ICategoryCreate } from '../../libs/apis/category/types';
import { BaseQuery } from '../../libs/utils/buildQueries';
import { createGenericSlice } from '../../libs/utils/createGenericSlice';
import { setError, setSuccess } from '../app';
import { IBlogState } from './types';

export const initialState: IBlogState = {};

export const createBlog = createAsyncThunk(
  'createBlog',
  async (input: IBlogCreate, { dispatch }) => {
    try {
      const result = await apiSdk.blogApis.createBlog(input);
      dispatch(setSuccess({ message: 'Tạo blog thành công' }));
      return result;
    } catch (error) {
      dispatch(setError({ message: 'Tạo blog thất bại' }));
    }
  }
);

export const getAllBlogThunk = createAsyncThunk(
  'getAllBlogThunk',
  async (queries?: BaseQuery) => {
    return await apiSdk.blogApis.getAllBlog(queries);
  }
);
export const blogSlice = createGenericSlice({
  name: 'blog',
  initialState,
  reducers: {
    getAllBlogs(state, action) {
      state.allBlogs = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { getAllBlogs } = blogSlice.actions;

export default blogSlice.reducer;
