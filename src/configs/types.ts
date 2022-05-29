export enum DocumentStatus {
  Approved = 'Approved',
  Pending = 'Pending',
  Rejected = 'Rejected',
}

export interface IPaginationOutput<T> {
  total: number;
  items: T[];
}

export const shipAmount = 30000;
