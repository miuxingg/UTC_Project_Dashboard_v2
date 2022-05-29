import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import TableWarpper from '../../../src/components/collections/TableWrapper';
import { ROUTERS } from '../../../src/configs/navigators';
import ManageOrder from '../../../src/containers/ManageOrder';
import { IOrderStatus } from '../../../src/libs/apis/order/types';
import { getOrderByStatus } from '../../../src/redux/order';

const OrderManagementPage: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrderByStatus({ status: IOrderStatus.Pending }));
  }, [dispatch]);
  return (
    <TableWarpper name='Quản lý đơn hàng'>
      <ManageOrder />
    </TableWarpper>
  );
};

export default OrderManagementPage;
