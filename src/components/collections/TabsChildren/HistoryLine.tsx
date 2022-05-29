import * as React from 'react';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import dayjs from 'dayjs';
import {
  Box,
  Collapse,
  Grid,
  IconButton,
  styled,
  Table,
  TableHead,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { moneyFormat } from '../../../libs/utils';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const IconButtonMui = styled(IconButton)({
  ':focus': {
    outline: 'none',
  },
});

interface IHistoryBookDetail {
  id: string;
  thumbnail: string;
  name: string;
  price: number;
  author: string;
  quantity: number;
}

export interface IHistoryBookLine {
  stt?: number;
  id: string;
  createdAt: Date;
  address: string;
  total: number;
  paymentStatus: string;
  books: IHistoryBookDetail[];
  isAction?: boolean;
  onPrimaryButton?: (id: string) => void;
  onSecondButton?: (id: string) => void;
}

const Row: React.FC<IHistoryBookLine> = ({
  id,
  createdAt,
  address,
  total,
  books,
  stt,
  isAction,
  paymentStatus,
  onPrimaryButton,
  onSecondButton,
}) => {
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButtonMui
            aria-label='expand row'
            size='small'
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButtonMui>
        </TableCell>
        <TableCell component='th' scope='row' sx={{ width: '5%' }}>
          {stt}
        </TableCell>
        <TableCell align='center' sx={{ width: '20%' }}>
          {id}
        </TableCell>
        <TableCell align='center' sx={{ width: '10%' }}>
          {dayjs(createdAt).format('DD/MM/YYYY')}
        </TableCell>
        <TableCell align='center' sx={{ width: '35%' }}>
          <div style={{ fontWeight: 'bold' }}>{address.split('(@)')[0]}</div>
          {address.split('(@)')[1]}
        </TableCell>
        <TableCell align='center' sx={{ width: '10%' }}>
          {moneyFormat(total)}
        </TableCell>
        <TableCell sx={{ width: '15%' }}>{paymentStatus}</TableCell>
        {isAction ? (
          <TableCell align='center' sx={{ width: '15%' }}>
            <Grid container justifyContent='center' spacing={2}>
              <Grid item>
                <IconButton onClick={() => onPrimaryButton?.(id)}>
                  <CheckCircleIcon color='secondary' />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton onClick={() => onSecondButton?.(id)}>
                  <DeleteForeverIcon color='primary' />
                </IconButton>
              </Grid>
            </Grid>
          </TableCell>
        ) : null}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1 }} my={5}>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell align='center'>Ảnh</TableCell>
                    <TableCell align='center'>Tên</TableCell>
                    <TableCell align='center'>Tác giả</TableCell>
                    <TableCell align='center'>Số lượng</TableCell>
                    <TableCell align='center'>Tổng tiền</TableCell>
                    {/* <TableCell align="right">Total price ($)</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {books.map((book, i) => (
                    <TableRow key={i}>
                      <TableCell align='center'>
                        <img
                          src={book.thumbnail}
                          style={{ width: 50, height: 70 }}
                        />
                      </TableCell>
                      <TableCell align='center'>{book.name}</TableCell>
                      <TableCell align='center'>{book.author}</TableCell>
                      <TableCell align='center'>{book.quantity}</TableCell>
                      <TableCell align='center'>
                        {moneyFormat(book.price)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

interface IHistoryBook {
  lines: IHistoryBookLine[];
  isAction?: boolean;
  onPrimaryButton?: (id: string) => void;
  onSecondButton?: (id: string) => void;
}
export const HistoryLine: React.FC<IHistoryBook> = ({
  lines,
  isAction,
  onPrimaryButton,
  onSecondButton,
}) => {
  return (
    <>
      <TableBody>
        {lines.map((item, i) => {
          return (
            <Row
              {...item}
              key={i}
              isAction={isAction}
              onPrimaryButton={onPrimaryButton}
              onSecondButton={onSecondButton}
            />
          );
        })}
      </TableBody>
    </>
  );
};

export default HistoryLine;
