import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiSdk } from '../../libs/apis';
import { IConfigCreate } from '../../libs/apis/config/types';
import { createGenericSlice } from '../../libs/utils/createGenericSlice';
import { setError, setSuccess } from '../app';
import { IConfigState } from './types';

export const initialState: IConfigState = {};

export const updateConfig = createAsyncThunk(
  'updateConfig',
  async (input: IConfigCreate, { dispatch }) => {
    try {
      const data = await apiSdk.configApis.updateConfig(input);
      dispatch(setSuccess({ message: 'Thay đổi thành công' }));
      return data;
    } catch (error) {
      console.log(error);

      dispatch(setError({ message: 'Thay đổi thất bại' }));
    }
  }
);
export const configSlice = createGenericSlice({
  name: 'config',
  initialState,
  reducers: {
    getConfig(state, action) {
      state.config = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { getConfig } = configSlice.actions;

export default configSlice.reducer;
