import { NextPage } from 'next';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import TableWarpper from '../../../src/components/collections/TableWrapper';
import ManageOrder from '../../../src/containers/ManageOrder';
import { IOrderStatus } from '../../../src/libs/apis/order/types';
import { getOrderByStatus } from '../../../src/redux/order';

const OrderManagementPage: NextPage = () => {
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
