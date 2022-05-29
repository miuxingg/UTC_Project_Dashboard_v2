/* eslint-disable require-jsdoc */
import { Pagination } from '@mui/material';
import { AxiosInstance } from 'axios';
import { IPaginationOutput } from '../../../configs/types';
import { BookQueries } from '../../utils/buildQueries';
import { IBookApi, ICreateBookApi, IUpdateStatusApi } from './types';

export class BookApi {
  constructor(private axiosInstance: AxiosInstance) {}

  async getAllBook(
    queries?: BookQueries
  ): Promise<IPaginationOutput<IBookApi>> {
    const { data } = await this.axiosInstance.get('/books', {
      params: { ...queries },
    });
    return data;
  }

  async createProduct(input: ICreateBookApi): Promise<IBookApi> {
    const { data } = await this.axiosInstance.post('/books/', input);
    return data;
  }

  async getBookById(id: string): Promise<IBookApi> {
    const { data } = await this.axiosInstance.get('/books/' + id);
    return data;
  }

  async updateBook(id: string, input: ICreateBookApi) {
    const { data } = await this.axiosInstance.put(`/books/${id}`, input);
    return data;
  }

  async updateStatus(id: string, input: IUpdateStatusApi) {
    const { data } = await this.axiosInstance.put(
      `/books/document-status/${id}`,
      input
    );
    return data;
  }
}
