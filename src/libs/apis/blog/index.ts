import { AxiosInstance } from 'axios';
import { IPaginationOutput } from '../../types';
import { BaseQuery } from '../../utils/buildQueries';
import { IBlogApi, IBlogCreate } from './types';

export class BlogApi {
  constructor(private axiosInstance: AxiosInstance) {}

  async createBlog(input: IBlogCreate) {
    const { data } = await this.axiosInstance.post('/blog', input);
    return data;
  }

  async getAllBlog(queries?: BaseQuery): Promise<IPaginationOutput<IBlogApi>> {
    const { data } = await this.axiosInstance.get('/blog', {
      params: { ...queries },
    });
    return data;
  }
}
