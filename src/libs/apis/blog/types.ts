import { DocumentStatus } from '../../../configs/types';

export interface IBlogApi {
  id: string;
  title: string;
  content: string;
  status?: DocumentStatus;
}

export interface IBlogCreate {
  title: string;
  content: string;
}
