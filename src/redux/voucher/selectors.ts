import { TRootState } from '..';

export const allVoucherSelector = (state: TRootState) => {
  return state.voucher.vouchers ?? { total: 0, items: [] };
};

export const voucherByIdSelector = (state: TRootState) => {
  return (
    state.voucher.voucher ?? {
      name: '',
      startDate: new Date(),
      endDate: new Date(),
      priceDiscound: 0,
    }
  );
};
