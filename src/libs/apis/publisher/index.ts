/* eslint-disable require-jsdoc */
import { AxiosInstance } from 'axios';
import { IPaginationOutput } from '../../../configs/types';
import { BaseQuery } from '../../utils/buildQueries';
import { ICategoryCreate, ICategoryUpdate } from '../category/types';
import { IPublisherApi } from './types';

export class PublisherApi {
  constructor(private axiosInstance: AxiosInstance) {}

  async getAllPublisher(
    queries?: BaseQuery
  ): Promise<IPaginationOutput<IPublisherApi>> {
    const { data } = await this.axiosInstance.get('/publisher', {
      params: { ...queries },
    });
    return data;
  }

  async createPublisher(input: ICategoryCreate) {
    const { data } = await this.axiosInstance.post('/publisher', input);
    return data;
  }

  async getPublisherById(id: string) {
    const { data } = await this.axiosInstance.get(`/publisher/${id}`);
    return data;
  }

  async updatePublisher(id: string, input: ICategoryCreate) {
    const { data } = await this.axiosInstance.put(`/publisher/${id}`, input);
    return data;
  }

  async updatePublisherStatus(id: string, input: ICategoryUpdate) {
    const { data } = await this.axiosInstance.put(
      `/publisher/status/${id}`,
      input
    );
    return data;
  }
}
