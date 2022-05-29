import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import rootReducer from './rootReducer';

const isDev = process.env.NODE_ENV !== 'production';

const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    devTools: isDev,
  });
};

export type TRootStore = ReturnType<typeof makeStore>;
export type TRootState = ReturnType<TRootStore['getState']>;

export const wrapper = createWrapper<TRootStore>(makeStore);
