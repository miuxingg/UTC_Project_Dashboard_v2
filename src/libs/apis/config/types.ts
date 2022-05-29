import { DocumentStatus } from '../../../configs/types';
import { IBlogApi } from '../blog/types';

export interface IConfigApi {
  id: string;
  blog: IBlogApi[];
}

export interface IConfigCreate {
  blog?: string[];
}
