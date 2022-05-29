/* eslint-disable require-jsdoc */
import { AxiosInstance } from 'axios';
import { IPaginationOutput } from '../../../configs/types';
import { IGetOrderInput, IOrderInput, IOrderOutput } from './types';

export class OrderApi {
  constructor(private axiosInstance: AxiosInstance) {}

  async createOrder(dataCreate: IOrderInput): Promise<any> {
    const { data } = await this.axiosInstance.post('/order', { ...dataCreate });
    return data;
  }

  async getOrderByStatus(
    queries: IGetOrderInput
  ): Promise<IPaginationOutput<IOrderOutput>> {
    const { data } = await this.axiosInstance.get('/order/admin-order/', {
      params: { ...queries },
    });
    return data;
  }

  async updateOrderStatus(id: string, input: IGetOrderInput) {
    const { data } = await this.axiosInstance.put(`/order/${id}`, input);
    return data;
  }
}
