import { PayloadAction } from '@reduxjs/toolkit';

import { createGenericSlice } from '../../libs/utils/createGenericSlice';

export type ErrorType = 'error' | 'success' | 'warning' | undefined;
export interface IAppMessage {
  message?: string;
  open?: boolean;
  type?: ErrorType;
}

export interface IAppState {
  notification: IAppMessage;
}

const initialState: IAppState = {
  notification: {},
};

interface IError {
  message: string;
}

const appSlice = createGenericSlice({
  name: 'app',
  initialState,
  reducers: {
    setSuccess(state, action: PayloadAction<IAppMessage>) {
      state.notification = {
        message: action.payload?.message,
        open: true,
        type: 'success',
      };
    },
    setWarning(state, action: PayloadAction<IAppMessage>) {
      state.notification = {
        message: action.payload?.message,
        open: true,
        type: 'warning',
      };
    },
    setError(state, action: PayloadAction<IAppMessage>) {
      state.notification = {
        message: action.payload.message,
        open: true,
        type: 'error',
      };
    },

    clearMessage(state) {
      state.notification = {
        message: '',
        open: false,
        type: undefined,
      };
    },
  },
});

export const { setSuccess, setError, setWarning, clearMessage } =
  appSlice.actions;

export default appSlice.reducer;
