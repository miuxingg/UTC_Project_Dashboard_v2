import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiSdk } from '../../libs/apis';
import { IVoucherCreate, IVoucherUpdate } from '../../libs/apis/voucher/types';
import { BaseQuery } from '../../libs/utils/buildQueries';
import { createGenericSlice } from '../../libs/utils/createGenericSlice';
import { setError, setSuccess } from '../app';
import { ICategoryState } from './types';

export const initialState: ICategoryState = {};

export const getAllVoucherThunk = createAsyncThunk(
  'getAllVoucher',
  async (queries: BaseQuery) => {
    const data = await apiSdk.voucherApis.getAllVoucher(queries);
    return data;
  }
);

export const createVoucher = createAsyncThunk(
  'createVoucher',
  async (input: IVoucherCreate, { dispatch }) => {
    try {
      const data = await apiSdk.voucherApis.createVoucherApi(input);
      dispatch(setSuccess({ message: 'Tạo voucher thành công' }));
      return data;
    } catch (error) {
      dispatch(setError({ message: 'Tạo voucher thất bại' }));
    }
  }
);

export const updateVoucher = createAsyncThunk(
  'updateVoucher',
  async (
    { id, input }: { id: string; input: IVoucherUpdate },
    { dispatch }
  ) => {
    try {
      const data = await apiSdk.voucherApis.updateVoucher(id, input);
      dispatch(setSuccess({ message: 'Thay đổi voucher thành công' }));
      return data;
    } catch (error) {
      dispatch(setError({ message: 'Thay đổi voucher thất bại' }));
    }
  }
);
export const voucherSlice = createGenericSlice({
  name: 'voucher',
  initialState,
  reducers: {
    getvoucher(state, action) {
      state.vouchers = {
        items: action.payload.items,
        total: action.payload.total,
      };
    },

    getVoucherById(state, action) {
      state.voucher = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllVoucherThunk.fulfilled, (state, action) => {
      state.vouchers = {
        items: action.payload.items,
        total: action.payload.total,
      };
    });

    builder.addCase(updateVoucher.fulfilled, (state, action) => {
      state.vouchers = {
        items: (state?.vouchers?.items || []).map((voucher) => {
          return voucher.id === action.payload.id
            ? { ...action.payload }
            : { ...voucher };
        }),
        total: state?.vouchers?.total ?? 0,
      };
    });
  },
});

export const { getvoucher, getVoucherById } = voucherSlice.actions;

export default voucherSlice.reducer;
