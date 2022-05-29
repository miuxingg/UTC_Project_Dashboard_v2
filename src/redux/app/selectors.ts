import { TRootState } from '..';
import { IAppMessage } from '.';

export const notificationSelector = (state: TRootState): IAppMessage =>
  state?.app?.notification ?? { message: '', open: false };
