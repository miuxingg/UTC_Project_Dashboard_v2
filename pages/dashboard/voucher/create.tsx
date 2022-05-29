import React from 'react';
import { useDispatch } from 'react-redux';
import VoucherForm from '../../../src/containers/VoucherForm';
import { getServerSideWithProtectedRoute } from '../../../src/libs/hocs/getServerSideWithProtectedRoute';
import { createVoucher } from '../../../src/redux/voucher';

const CreateVoucher: React.FC = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values: any) => {
    dispatch(createVoucher({ ...values }));
  };
  return <VoucherForm onSubmitForm={handleSubmit} />;
};

export const getServerSideProps = getServerSideWithProtectedRoute(
  async (ctx, store) => {
    //   const voucher = await apiSdk.voucherApis.getAllVoucher({ limit: 10 });
    //   store.dispatch(getvoucher(voucher));
    return {
      props: {},
    };
  }
);

export default CreateVoucher;
