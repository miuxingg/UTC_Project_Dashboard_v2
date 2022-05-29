export interface BaseQuery {
  limit?: number;
  offset?: number;
  search?: string;
}

export enum BookStatus {
  NONE = '',
  HOT = 'HOT',
  NEW = 'NEW',
}
export interface BookQueries extends BaseQuery {
  category?: string;
  startPrice?: number;
  endPrice?: number;
  cloudTag?: string;
  publisher?: string;
  status?: BookStatus;
}
