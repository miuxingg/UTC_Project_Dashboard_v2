import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiSdk } from '../../libs/apis';
import { IGetOrderInput, IOrderInput } from '../../libs/apis/order/types';
import { createGenericSlice } from '../../libs/utils/createGenericSlice';
import { setError, setSuccess } from '../app';
import { IOrderState } from './types';

export const initialState: IOrderState = {};

export const createOrder = createAsyncThunk(
  'createOrder',
  async (orderInput: IOrderInput) => {
    try {
      const data = await apiSdk.orderApis.createOrder(orderInput);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getOrderByStatus = createAsyncThunk(
  'getOrderByStatus',
  async (queries: IGetOrderInput) => {
    try {
      const data = await apiSdk.orderApis.getOrderByStatus(queries);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  'updateOrderStatus',
  async (
    { id, input }: { id: string; input: IGetOrderInput },
    { dispatch }
  ) => {
    try {
      const data = await apiSdk.orderApis.updateOrderStatus(id, input);
      dispatch(setSuccess({ message: 'Thay đổi thành công' }));
      return data;
    } catch (err) {
      dispatch(setError({ message: 'Thay đổi thất bại' }));
    }
  }
);

export const orderSlice = createGenericSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrderByStatus.fulfilled, (state, action) => {
      state.ordersByStatus = action.payload;
    });

    builder.addCase(updateOrderStatus.fulfilled, (state, action) => {
      state.ordersByStatus = {
        items: state.ordersByStatus.items.filter((item) => {
          return item.id !== action.payload.id;
        }),
        total: state.ordersByStatus.total,
      };
    });
  },
});

// export const {} = bookSlice.actions;

export default orderSlice.reducer;
