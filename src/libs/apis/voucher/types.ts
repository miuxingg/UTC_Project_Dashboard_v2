import { DocumentStatus } from '../../../configs/types';

export interface IVoucherApi {
  id: string;
  name: string;
  priceDiscound: number;
  documentStatus: DocumentStatus;
  startDate: Date;
  endDate: Date;
}

export interface IVoucherCreate {
  name?: string;
  priceDiscound?: number;
  startDate?: Date;
  endDate?: Date;
}

export interface IVoucherUpdate extends IVoucherCreate {
  documentStatus?: DocumentStatus;
}
