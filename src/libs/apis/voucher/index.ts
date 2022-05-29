import { AxiosInstance } from 'axios';
import { IPaginationOutput } from '../../types';
import { BaseQuery } from '../../utils/buildQueries';
import { IVoucherApi, IVoucherCreate, IVoucherUpdate } from './types';

export class VoucherApi {
  constructor(private axiosInstance: AxiosInstance) {}

  async getAllVoucher(
    queries?: BaseQuery
  ): Promise<IPaginationOutput<IVoucherApi>> {
    const { data } = await this.axiosInstance.get('/voucher/admin', {
      params: { ...queries },
    });
    return data;
  }

  async getVoucherById(id?: string): Promise<IVoucherApi> {
    const { data } = await this.axiosInstance.get(`/voucher/${id}`);
    return data;
  }

  async createVoucherApi(input: IVoucherCreate) {
    const { data } = await this.axiosInstance.post('/voucher/', input);
    return data;
  }

  async updateVoucher(id: string, input: IVoucherUpdate) {
    const { data } = await this.axiosInstance.put(`/voucher/${id}`, input);
    return data;
  }
}
