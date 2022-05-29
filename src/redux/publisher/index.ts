import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiSdk } from '../../libs/apis';
import { ICategoryCreate } from '../../libs/apis/category/types';
import { BaseQuery } from '../../libs/utils/buildQueries';
import { createGenericSlice } from '../../libs/utils/createGenericSlice';
import { setError, setSuccess } from '../app';
import { IPublisherState } from './types';

export const initialState: IPublisherState = {};

export const getAllPublishers = createAsyncThunk(
  'getAllPublishers',
  async (queries?: BaseQuery) => {
    const data = await apiSdk.publisherApis.getAllPublisher(queries);
    return data;
  }
);

export const createPublisher = createAsyncThunk(
  'createPublisher',
  async (input: ICategoryCreate, { dispatch }) => {
    try {
      const data = await apiSdk.publisherApis.createPublisher(input);
      dispatch(setSuccess({ message: 'Thêm một nhà xuất bản thành công' }));
      return data;
    } catch (error) {
      dispatch(setError({ message: 'Thêm một nhà xuất bản thất bại' }));
    }
  }
);

export const updatePublisher = createAsyncThunk(
  'updatePublisher',
  async ({ id, input }: any, { dispatch }) => {
    try {
      const result = await apiSdk.publisherApis.updatePublisher(id, input);

      if (result) {
        dispatch(setSuccess({ message: 'Cập nhật nhà xuất bản thành công' }));
        return result;
      } else {
        dispatch(setError({ message: 'Cập nhật nhà xuất bản thất bại' }));
      }
    } catch (error) {
      dispatch(setError({ message: 'Cập nhật nhà xuất bản thất bại' }));
    }
  }
);

export const updatePublisherStatus = createAsyncThunk(
  'updatePublisherStatus',
  async ({ id, input }: any, { dispatch }) => {
    try {
      const result = await apiSdk.publisherApis.updatePublisherStatus(
        id,
        input
      );

      if (result) {
        dispatch(
          setSuccess({ message: 'Cập nhật trạng thái nhà xuất bản thành công' })
        );
        return result;
      } else {
        dispatch(setError({ message: 'Cập nhật nhà xuất bản thất bại' }));
      }
    } catch (error) {
      console.log(error);
      dispatch(setError({ message: 'Cập nhật nhà xuất bản thất bại' }));
    }
  }
);

export const publisherSlice = createGenericSlice({
  name: 'publisher',
  initialState,
  reducers: {
    setPublishers(state, action) {
      state.allPublisher = {
        items: action.payload.items,
        total: action.payload.total,
      };
    },

    getPublisherById(state, action) {
      state.publisher = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllPublishers.fulfilled, (state, action) => {
      state.allPublisher = {
        items: action.payload.items,
        total: action.payload.total,
      };
    });

    builder.addCase(updatePublisher.fulfilled, (state, action) => {
      state.allPublisher = {
        items: (state?.allPublisher.items || []).map((item) =>
          item.id !== action.payload.id
            ? item
            : { ...item, name: action.payload.name }
        ),
        total: state?.allPublisher?.total || 0,
      };
    });

    builder.addCase(updatePublisherStatus.fulfilled, (state, action) => {
      state.allPublisher = {
        items: (state?.allPublisher.items || []).map((item) =>
          item.id !== action.payload.id
            ? item
            : { ...item, status: action.payload.status }
        ),
        total: state?.allPublisher?.total || 0,
      };
    });
  },
});

export const { setPublishers, getPublisherById } = publisherSlice.actions;

export default publisherSlice.reducer;
