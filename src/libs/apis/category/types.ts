import { DocumentStatus } from '../../../configs/types';

export interface ICategoryApi {
  id: string;
  name: string;
  status: DocumentStatus;
}

export interface ICategoryCreate {
  name: string;
}

export interface ICategoryUpdate {
  name?: string;
  status?: DocumentStatus;
}
