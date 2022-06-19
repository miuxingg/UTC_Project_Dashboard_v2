import { AxiosInstance } from 'axios';
import { IDataset, IStatistic, IStatisticQuery } from './type';

export class StatisticApi {
  constructor(private axiosInstance: AxiosInstance) {}

  async getStatistics(): Promise<IStatistic> {
    const { data } = await this.axiosInstance.get('/order/statistics');
    return data;
  }

  async getDataset(queries?: IStatisticQuery): Promise<IDataset> {
    const { data } = await this.axiosInstance.get('/order/statistics/dataset', {
      params: { ...queries },
    });
    return data;
  }
}
