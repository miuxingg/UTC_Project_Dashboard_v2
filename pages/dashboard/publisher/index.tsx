import {
  FormControl,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { NextPage } from 'next';
import { Card, CardBody, CardTitle, Row, Col } from 'reactstrap';
import Table, {
  ColumnDefinitionType,
} from '../../../src/components/elements/Table';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import TableWarpper from '../../../src/components/collections/TableWrapper';
import { getServerSideWithProtectedRoute } from '../../../src/libs/hocs/getServerSideWithProtectedRoute';
import { deleteCategory, getAllCategory } from '../../../src/redux/category';
import { useCallback, useEffect, useState } from 'react';
import { apiSdk } from '../../../src/libs/apis';
import { useDispatch, useSelector } from 'react-redux';
import { ROUTERS } from '../../../src/configs/navigators';
import { useRouter } from 'next/router';
import PopupConfirm from '../../../src/components/elements/PopupConfirm';
import {
  getAllPublishers,
  setPublishers,
  updatePublisherStatus,
} from '../../../src/redux/publisher';
import { allPublisher } from '../../../src/redux/publisher/selectors';
import { DocumentStatus } from '../../../src/configs/types';

export interface IAction {
  onUpdate?: () => void;
  onDelete?: () => void;
  onChange?: (value: DocumentStatus) => void;
}

export interface ISponsor {
  stt: number;
  name: string;
  status: DocumentStatus;
  action: IAction;
}

export const CellAction: React.FC<IAction> = ({ onUpdate, onDelete }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Grid container spacing={2} justifyContent='center'>
        <Grid item onClick={onUpdate} style={{ cursor: 'pointer' }}>
          <CreateIcon />
        </Grid>
        <Grid item onClick={onDelete} style={{ cursor: 'pointer' }}>
          <DeleteIcon />
        </Grid>
      </Grid>
    </div>
  );
};

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
    header: 'Tên nhà sản xuất',
    width: '35%',
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
    width: '35%',
  },
];
const CategoryPage: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const publishers = useSelector(allPublisher);
  const [search, setSearch] = useState<string>('');

  const [isPopupConfirm, setIsPopupConfirm] = useState<boolean>(false);
  const [currentId, setCurrentId] = useState<string>('');
  const handleUpdate = (id) => {
    router.push(`${ROUTERS.publisher.path}/${id}`);
  };
  const handleDeleteClick = (id) => {
    setIsPopupConfirm(true);
    setCurrentId(id);
  };
  const handleDeleteComfirm = useCallback(() => {
    if (currentId) {
      dispatch(
        updatePublisherStatus({
          id: currentId,
          input: {
            status: DocumentStatus.Rejected,
          },
        })
      );
    }
  }, [dispatch, currentId]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(
      getAllPublishers({
        limit: rowsPerPage,
        offset: page * rowsPerPage,
        search: search,
      })
    );
  }, [rowsPerPage, page]);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const categoriesData = publishers.items.map(({ id, name, status }, i) => {
    return {
      stt: i + 1,
      name: name,
      status,
      action: {
        onUpdate: () => {
          handleUpdate(id);
        },
        onDelete: () => {
          handleDeleteClick(id);
        },
        onChange: (value: DocumentStatus) => {
          dispatch(
            updatePublisherStatus({
              id: id,
              input: {
                status: value,
              },
            })
          );
        },
      },
    };
  });
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    dispatch(
      getAllPublishers({
        limit: rowsPerPage,
        offset: page * rowsPerPage,
        search: e.target.value,
      })
    );
  };

  return (
    <TableWarpper
      name='Nhà xuất bản'
      isCreate
      onCreateClick={() => router.push(ROUTERS.publisherCreate.path)}
      onSearchChange={handleSearchChange}
      isBoxSearch
    >
      <Table
        data={categoriesData}
        columns={columns}
        totalCount={publishers.total}
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
    const publishers = await apiSdk.publisherApis.getAllPublisher({
      limit: 5,
      offset: 0,
    });
    store.dispatch(setPublishers(publishers));
    return {
      props: {},
    };
  }
);

export default CategoryPage;
