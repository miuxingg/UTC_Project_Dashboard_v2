import { TRootState } from '..';

export const statisticSelector = (state: TRootState) => {
  return (
    state.statistic.statistics ?? {
      totalMoney: 0,
      numberOfBooksSold: 0,
      booksAvailable: 0,
      booksInventory: 0,
    }
  );
};

export const datasetSelector = (state: TRootState) => {
  return state.statistic.dataset ?? { money: {}, quantity: {} };
};
