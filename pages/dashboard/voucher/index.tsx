import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import dayjs from 'dayjs';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableWarpper from '../../../src/components/collections/TableWrapper';
import PopupConfirm from '../../../src/components/elements/PopupConfirm';
import Table, {
  ColumnDefinitionType,
} from '../../../src/components/elements/Table';
import { ROUTERS } from '../../../src/configs/navigators';
import { DocumentStatus } from '../../../src/configs/types';
import { apiSdk } from '../../../src/libs/apis';
import { getServerSideWithProtectedRoute } from '../../../src/libs/hocs/getServerSideWithProtectedRoute';
import {
  getAllVoucherThunk,
  getvoucher,
  updateVoucher,
} from '../../../src/redux/voucher';
import { allVoucherSelector } from '../../../src/redux/voucher/selectors';
import { CellAction } from '../category';
import { IAction } from '../publisher';

export interface ISponsor {
  stt: number;
  name: string;
  priceDiscound: number;
  startDate: string;
  endDate: string;
  status: DocumentStatus;
  action: IAction;
}

export const CellStatus: React.FC<{
  actions: IAction;
  status: DocumentStatus;
}> = ({ status, actions }) => {
  const [value, setValue] = useState(status);
  useEffect(() => {
    setValue(status);
  }, [status]);
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as DocumentStatus);
    actions?.onChange?.(event.target.value as DocumentStatus);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <Select
        value={value}
        onChange={handleChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
      >
        {Object.values(DocumentStatus).map((item) => {
          return <MenuItem value={item}>{item}</MenuItem>;
        })}
      </Select>
    </FormControl>
  );
};

const columns: ColumnDefinitionType<ISponsor>[] = [
  {
    key: 'stt',
    header: 'STT',
    width: '5%',
  },
  {
    key: 'name',
    header: 'Tên mã',
    width: '25%',
  },
  {
    key: 'priceDiscound',
    header: 'Số tiền',
    width: '10%',
  },
  {
    key: 'startDate',
    header: 'Ngày bắt đầu',
    width: '15%',
  },
  {
    key: 'endDate',
    header: 'Ngày kết thúc',
    width: '15%',
  },
  {
    key: 'status',
    header: 'Trạng thái',
    width: '15%',
    get: (action: ISponsor) => (
      <CellStatus actions={action.action} status={action.status} />
    ),
  },
  {
    key: 'action',
    header: 'Thao tác',
    get: (action: ISponsor) => (
      <CellAction
        onUpdate={action.action.onUpdate}
        onDelete={action.action.onDelete}
      />
    ),
    width: '15%',
  },
];

const VoucherPage: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentId, setCurrentId] = useState<string>('');

  const handleDeleteClick = (id) => {
    setIsPopupConfirm(true);
    setCurrentId(id);
  };
  const voucherSelector = useSelector(allVoucherSelector);

  const [isPopupConfirm, setIsPopupConfirm] = useState<boolean>(false);

  const handleDeleteComfirm = useCallback(() => {
    if (currentId) {
      dispatch(
        updateVoucher({
          id: currentId,
          input: {
            documentStatus: DocumentStatus.Rejected,
          },
        })
      );
    }
  }, [dispatch, currentId]);

  const voucherData = voucherSelector.items.map((item, i) => {
    return {
      stt: i + 1,
      name: item.name,
      priceDiscound: item.priceDiscound,
      startDate: dayjs(item.startDate).format('DD/MM/YYYY HH:mm'),
      endDate: dayjs(item.endDate).format('DD/MM/YYYY HH:mm'),
      status: item.documentStatus,
      action: {
        onUpdate: () => {
          //   handleUpdate(id);
          router.push(`${ROUTERS.voucher.path}/${item.id}`);
        },
        onDelete: () => {
          handleDeleteClick(item.id);
        },
        onChange: (value: DocumentStatus) => {
          dispatch(
            updateVoucher({
              id: item.id,
              input: {
                documentStatus: value,
              },
            })
          );
        },
      },
    };
  });

  useEffect(() => {
    dispatch(
      getAllVoucherThunk({
        limit: rowsPerPage,
        offset: page * rowsPerPage,
        search: search,
      })
    );
  }, [rowsPerPage, page]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    dispatch(
      getAllVoucherThunk({
        limit: rowsPerPage,
        offset: page * rowsPerPage,
        search: e.target.value,
      })
    );
  };

  return (
    <TableWarpper
      name='Giảm giá'
      isCreate
      onCreateClick={() => router.push(ROUTERS.voucherCreate.path)}
      onSearchChange={handleSearchChange}
      isBoxSearch
    >
      <Table
        data={voucherData}
        columns={columns}
        totalCount={voucherSelector.total}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {isPopupConfirm ? (
        <PopupConfirm
          open={true}
          title='Xác nhận'
          content='Bạn có chắc chắn xoá thể loại này?'
          onClose={() => {
            setIsPopupConfirm(false);
          }}
          onSubmit={() => {
            setIsPopupConfirm(false);
            handleDeleteComfirm();
          }}
        />
      ) : null}
    </TableWarpper>
  );
};

export const getServerSideProps = getServerSideWithProtectedRoute(
  async (ctx, store) => {
    const voucher = await apiSdk.voucherApis.getAllVoucher({ limit: 10 });
    store.dispatch(getvoucher(voucher));
    return {
      props: {},
    };
  }
);

export default VoucherPage;
