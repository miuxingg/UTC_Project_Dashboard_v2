import { TRootState } from '..';
import { IProfile } from '../../libs/apis/auth/types';

export const authSelector = (state: TRootState): boolean => {
  return !!state.auth.isAuthenticated;
};

export const profileSelector = (state: TRootState): IProfile | undefined =>
  state.auth.profile;

export const employeeSelector = (state: TRootState) => {
  return state.auth.employee;
};

export const employeeByIdSelector = (state: TRootState) => {
  return state.auth.employeeById;
};
