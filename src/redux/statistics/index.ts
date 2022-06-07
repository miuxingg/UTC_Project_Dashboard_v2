import { createGenericSlice } from '../../libs/utils/createGenericSlice';
import { IStatisticsState } from './types';

export const initialState: IStatisticsState = {};

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
  extraReducers: (builder) => {},
});

export const { getStatistic, getDataset } = statisticsSlice.actions;

export default statisticsSlice.reducer;
