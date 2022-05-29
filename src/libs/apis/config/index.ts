import { AxiosInstance } from 'axios';
import { IPaginationOutput } from '../../types';
import { BaseQuery } from '../../utils/buildQueries';
import { IConfigApi, IConfigCreate } from './types';

export class ConfigApi {
  constructor(private axiosInstance: AxiosInstance) {}

  async getConfig(queries?: BaseQuery): Promise<IConfigApi> {
    const { data } = await this.axiosInstance.get('/configs', {
      params: { ...queries },
    });
    return data;
  }

  async updateConfig(input: IConfigCreate) {
    const { data } = await this.axiosInstance.post('/configs', input);
    return data;
  }
}
