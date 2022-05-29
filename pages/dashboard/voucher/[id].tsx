import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VoucherForm from '../../../src/containers/VoucherForm';
import { apiSdk } from '../../../src/libs/apis';
import { getServerSideWithProtectedRoute } from '../../../src/libs/hocs/getServerSideWithProtectedRoute';
import { getVoucherById, updateVoucher } from '../../../src/redux/voucher';
import { voucherByIdSelector } from '../../../src/redux/voucher/selectors';

const VoucherUpdatePage: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;
  const currentVoucher = useSelector(voucherByIdSelector);

  const handleSubmitForm = (values: any) => {
    if (id && values) {
      dispatch(
        updateVoucher({
          id: id as string,
          input: {
            ...values,
          },
        })
      );
      router.back();
    }
  };
  return (
    <VoucherForm
      onSubmitForm={handleSubmitForm}
      initial={{
        name: currentVoucher?.name,
        priceDiscound: currentVoucher.priceDiscound,
        startDate: new Date(currentVoucher.startDate),
        endDate: new Date(currentVoucher.endDate),
      }}
    />
  );
};

export const getServerSideProps = getServerSideWithProtectedRoute(
  async (ctx, store) => {
    const { id } = ctx.query;
    const voucher = await apiSdk.voucherApis.getVoucherById(id as string);
    store.dispatch(getVoucherById(voucher));
    return {
      props: {},
    };
  }
);
export default VoucherUpdatePage;
