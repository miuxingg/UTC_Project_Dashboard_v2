import { DocumentStatus } from '../../../configs/types';
import { ICategoryApi } from '../category/types';

export interface IBookApi {
  id: string;
  name: string;
  price: number;
  priceUnDiscount: number;
  description: string;
  author: string;
  category: ICategoryApi[];
  cloudTag: string[];
  thumbnail: string;
  images: string[];
  publishers: ICategoryApi[];
  status: string;
  quantity: number;
  summary?: string;
  isCombo?: boolean;
  books?: IBookInCombo[];
  isFavorite?: boolean;
  documentStatus?: DocumentStatus;
  rating?: number;
}

export interface IBookInCombo {
  id: string;
  name: string;
  thumbnail: string;
  author: string;
}

export interface ICreateBookApi {
  name: string;
  author: string;
  cloudTag: string[];
  description: string;
  price: number;
  priceUnDiscount: number;
  thumbnail: string;
  category: string[];
  status: string;
  images: string[];
  quantity: number;
  isCombo: boolean;
  books: string[];
  summary: string;
  publishers: string[];
}

export interface IUpdateStatusApi {
  documentStatus: DocumentStatus;
}
