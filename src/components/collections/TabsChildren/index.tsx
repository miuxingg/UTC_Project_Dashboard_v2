import {
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  Box,
} from '@mui/material';
import React from 'react';
import { Table } from 'reactstrap';
import { IPaginationOutput } from '../../../configs/types';
import { IOrderOutput } from '../../../libs/apis/order/types';
import { transfromOrderHistory } from '../../../redux/order/dto';
import HistoryLine from './HistoryLine';

interface ITabsChildren {
  isAction?: boolean;
  orderHistory: IPaginationOutput<IOrderOutput>;
  onPrimaryButton?: (id: string) => void;
  onSecondButton?: (id: string) => void;
}
const TabsChirdlen: React.FC<ITabsChildren> = ({
  isAction,
  orderHistory,
  onPrimaryButton,
  onSecondButton,
}) => {
  return (
    <Box width='100%' my={4} style={{ backgroundColor: '#eee' }}>
      {orderHistory?.total ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>STT</TableCell>
                <TableCell align='center'>Mã đơn hàng</TableCell>
                <TableCell align='center'>Ngày tạo</TableCell>
                <TableCell align='center'>Địa chỉ nhận</TableCell>
                <TableCell align='center'>Tổng tiền</TableCell>
                <TableCell align='center'>Giảm giá</TableCell>
                <TableCell align='center'>Đã thanh toán</TableCell>
                {isAction ? (
                  <TableCell align='center'>Thao tác</TableCell>
                ) : null}
              </TableRow>
            </TableHead>
            <HistoryLine
              lines={transfromOrderHistory(orderHistory?.items || [])}
              isAction={isAction}
              onPrimaryButton={onPrimaryButton}
              onSecondButton={onSecondButton}
            />
          </Table>
        </TableContainer>
      ) : (
        <Box display='flex' justifyContent='center' py={2}>
          <Box display='flex' flexDirection='column' alignItems='center'>
            <img src='/images/empty.png' alt='' />
            <span>Đơn hàng trống</span>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default TabsChirdlen;
