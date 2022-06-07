export interface IStatistic {
  totalMoney: number;
  numberOfBooksSold: number;
  booksAvailable: number;
  booksInventory: number;
}

export interface IDataset {
  money: { [field: string]: number };
  quantity: { [field: string]: number };
}
