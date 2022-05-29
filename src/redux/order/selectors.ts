import { TRootState } from '..';

export const allOrdersByStatusSelector = (state: TRootState) => {
  return state.order.ordersByStatus ?? { total: 0, items: [] };
};
