import { IPaginationOutput } from '../../configs/types';
import { IPublisherApi } from '../../libs/apis/publisher/types';

export interface IPublisherState {
  allPublisher?: IPaginationOutput<IPublisherApi>;
  publisher?: IPublisherApi;
}
