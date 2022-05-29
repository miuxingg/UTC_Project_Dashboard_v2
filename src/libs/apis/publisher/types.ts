import { DocumentStatus } from '../../../configs/types';

export interface IPublisherApi {
  id: string;
  name: string;
  status: DocumentStatus;
}
