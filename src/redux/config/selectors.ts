import { TRootState } from '..';

export const configSelector = (state: TRootState) => {
  return state.config?.config;
};
