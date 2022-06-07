import { IDataset, IStatistic } from '../../libs/apis/statistics/type';

export interface IStatisticsState {
  statistics?: IStatistic;
  dataset?: IDataset;
}
