import { createAsyncThunk } from '@reduxjs/toolkit';

import { apiSdk } from '../../libs/apis';
import { IAuthLocal, IEmployeeCreare } from '../../libs/apis/auth/types';
import { BaseQuery } from '../../libs/utils/buildQueries';
import { removeToken, setToken } from '../../libs/utils/token';
import { setError, setSuccess } from '../app';

export const loginLocal = createAsyncThunk(
  'auth/loginLocal',
  async (user: IAuthLocal) => {
    const response = await apiSdk.authApis.loginLocal(user);
    if (response.statusCode === 200) {
      setToken(response.data);
      return response;
    }
    return response;
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  // await apiSdk.authApis.logout();
  removeToken();
});

export const getProfile = createAsyncThunk('auth/getProfile', async () => {
  return await apiSdk.authApis.getProfile();
});

export const setEmployee = createAsyncThunk(
  'auth/getEmployee',
  async (queries?: BaseQuery) => {
    try {
      const data = await apiSdk.authApis.getEmployee(queries);
      return data;
    } catch (error) {
      // dispatch(setError({ message: 'Lấy danh sách thất bại' }));
    }
  }
);

export const createAccountEmployee = createAsyncThunk(
  'auth/createAccountEmployee',
  async (input: IEmployeeCreare, { dispatch }) => {
    try {
      const data = await apiSdk.authApis.createEmployeeAccount(input);
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const updateAccountEmployee = createAsyncThunk(
  'auth/updateAccountEmployee',
  async (
    { id, input }: { input: IEmployeeCreare; id: string },
    { dispatch }
  ) => {
    try {
      const data = await apiSdk.authApis.updateEmployee(id, input);
      dispatch(setSuccess({ message: 'Thay đổi thành công' }));
      return data;
    } catch (error) {
      dispatch(setError({ message: 'Thay đổi thất bại' }));
      return error;
    }
  }
);

export const deleteAccountEmployee = createAsyncThunk(
  'auth/deleteAccountEmployee',
  async (id: string, { dispatch }) => {
    try {
      const data = await apiSdk.authApis.deleteEmployee(id);
      dispatch(setSuccess({ message: 'Xoá thành công' }));
      return data;
    } catch (error) {
      dispatch(setError({ message: 'Xoá thất bại' }));
      return error;
    }
  }
);

export const getEmployeeById = createAsyncThunk(
  'auth/getEmployeeById',
  async (id: string, { dispatch }) => {
    try {
      const data = await apiSdk.authApis.getEmployeeById(id);
      return data;
    } catch (error) {
      return error;
    }
  }
);
