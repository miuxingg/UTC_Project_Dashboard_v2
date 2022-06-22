import { AxiosInstance } from 'axios';
import { IPaginationOutput } from '../../types';
import { BaseQuery } from '../../utils/buildQueries';
import { ICategoryApi, ICategoryCreate, ICategoryUpdate } from './types';

export class CategoryApi {
  constructor(private axiosInstance: AxiosInstance) {}

  async getAllCategory(
    queries?: BaseQuery
  ): Promise<IPaginationOutput<ICategoryApi>> {
    const { data } = await this.axiosInstance.get('/category', {
      params: { ...queries },
    });
    return data;
  }

  async getAllCategoryByAdmin(
    queries?: BaseQuery
  ): Promise<IPaginationOutput<ICategoryApi>> {
    const { data } = await this.axiosInstance.get('/category/admin', {
      params: { ...queries },
    });
    return data;
  }

  async createCategory(input: ICategoryCreate) {
    const { data } = await this.axiosInstance.post('/category', input);
    return data;
  }

  async deleteCategory(id: string, input: ICategoryUpdate) {
    const { data } = await this.axiosInstance.put(
      `/category/status/${id}`,
      input
    );
    return data;
  }

  async updateCategory(id: string, input: ICategoryCreate) {
    const { data } = await this.axiosInstance.put(`/category/${id}`, input);
    return data;
  }

  async getCategoryById(id: string) {
    const { data } = await this.axiosInstance.get(`/category/${id}`);
    return data;
  }
}
