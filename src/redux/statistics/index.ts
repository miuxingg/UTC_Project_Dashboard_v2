import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiSdk } from '../../libs/apis';
import { IStatisticQuery } from '../../libs/apis/statistics/type';
import { createGenericSlice } from '../../libs/utils/createGenericSlice';
import { IStatisticsState } from './types';

export const initialState: IStatisticsState = {};

export const getStatisticByQuery = createAsyncThunk(
  'getStatisticByQuery',
  async (queries?: IStatisticQuery) => {
    const data = await apiSdk.statisticsApis.getDataset(queries);
    return data;
  }
);

export const statisticsSlice = createGenericSlice({
  name: 'statistic',
  initialState,
  reducers: {
    getStatistic(state, action) {
      state.statistics = action.payload;
    },
    getDataset(state, action) {
      state.dataset = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getStatisticByQuery.fulfilled, (state, action) => {
      state.dataset = action.payload;
    });
  },
});

export const { getStatistic, getDataset } = statisticsSlice.actions;

export default statisticsSlice.reducer;
