import { AxiosInstance } from 'axios';
import { IDataset, IStatistic } from './type';

export class StatisticApi {
  constructor(private axiosInstance: AxiosInstance) {}

  async getStatistics(): Promise<IStatistic> {
    const { data } = await this.axiosInstance.get('/order/statistics');
    return data;
  }

  async getDataset(): Promise<IDataset> {
    const { data } = await this.axiosInstance.get('/order/statistics/dataset');
    return data;
  }
}
