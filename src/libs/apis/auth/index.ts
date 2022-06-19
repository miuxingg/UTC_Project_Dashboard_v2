import { AxiosInstance } from 'axios';
import { IPaginationOutput } from '../../types';
import { BaseQuery } from '../../utils/buildQueries';

import {
  IAuthenticated,
  IAuthLocal,
  IEmployee,
  IEmployeeCreare,
  IProfile,
} from './types';

export class AuthApi {
  constructor(private axiosInstance: AxiosInstance) {}

  async refreshToken(refreshToken: string): Promise<IAuthenticated> {
    const { data } = await this.axiosInstance.post('/auth/refresh-token', {
      refresh_token: refreshToken,
    });
    return data;
  }

  async loginLocal(user: IAuthLocal): Promise<any> {
    try {
      const { data } = await this.axiosInstance.post('/auth/login-admin', user);
      return { statusCode: 200, data };
    } catch (error) {
      return error;
    }
  }

  async logout(): Promise<void> {
    await this.axiosInstance.post('/auth/logout');
  }

  async registerLocal(user: IAuthLocal): Promise<void> {
    const { data } = await this.axiosInstance.post('/auth/register', user);
    return data;
  }

  async getProfile(): Promise<IProfile> {
    const { data } = await this.axiosInstance.get('/auth/profile');
    return data;
  }

  async getEmployee(
    queries?: BaseQuery
  ): Promise<IPaginationOutput<IEmployee>> {
    const { data } = await this.axiosInstance.get('/auth/employee', {
      params: { ...queries },
    });
    return data;
  }

  async createEmployeeAccount(input: IEmployeeCreare) {
    const { data } = await this.axiosInstance.post(
      '/auth/account-employee',
      input
    );
    return data;
  }

  async getEmployeeById(id: string) {
    const { data } = await this.axiosInstance.get(`/auth/employee/${id}`);
    return data;
  }

  async updateEmployee(id: string, inp: IEmployeeCreare) {
    const { data } = await this.axiosInstance.put(`/auth/employee/${id}`, inp);
    return data;
  }

  async deleteEmployee(id: string) {
    const { data } = await this.axiosInstance.delete(`/auth/employee/${id}`);
    return data;
  }

  async forgotPassword(input: { email: string }) {
    const { data } = await this.axiosInstance.post(
      '/auth/forgot-password',
      input
    );
    return data;
  }
}
