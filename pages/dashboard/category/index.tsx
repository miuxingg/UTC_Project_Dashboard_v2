import { Grid, Typography } from '@mui/material';
import { NextPage } from 'next';
import { Card, CardBody, CardTitle, Row, Col } from 'reactstrap';
import Table, {
  ColumnDefinitionType,
} from '../../../src/components/elements/Table';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import TableWarpper from '../../../src/components/collections/TableWrapper';
import { getServerSideWithProtectedRoute } from '../../../src/libs/hocs/getServerSideWithProtectedRoute';
import {
  deleteCategory,
  getAllCategory,
  setCategories,
} from '../../../src/redux/category';
import { useCallback, useEffect, useState } from 'react';
import { apiSdk } from '../../../src/libs/apis';
import { useDispatch, useSelector } from 'react-redux';
import { allCategoriesSelector } from '../../../src/redux/category/selectors';
import { ROUTERS } from '../../../src/configs/navigators';
import { useRouter } from 'next/router';
import PopupConfirm from '../../../src/components/elements/PopupConfirm';
import { DocumentStatus } from '../../../src/configs/types';
import { CellStatus } from '../publisher';

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

const columns: ColumnDefinitionType<ISponsor>[] = [
  {
    key: 'stt',
    header: 'STT',
    width: '5%',
  },
  {
    key: 'name',
    header: 'Tên thể loại',
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
  const categories = useSelector(allCategoriesSelector);
  const [search, setSearch] = useState<string>('');
  const [isPopupConfirm, setIsPopupConfirm] = useState<boolean>(false);
  const [currentId, setCurrentId] = useState<string>('');
  const handleUpdate = (id) => {
    router.push(`${ROUTERS.category.path}/${id}`);
  };
  const handleDeleteClick = (id) => {
    setIsPopupConfirm(true);
    setCurrentId(id);
  };
  const handleDeleteComfirm = useCallback(() => {
    if (currentId) {
      dispatch(
        deleteCategory({
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
      getAllCategory({
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

  const categoriesData = categories.items.map(({ id, name, status }, i) => {
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
            deleteCategory({
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
      getAllCategory({
        limit: rowsPerPage,
        offset: page * rowsPerPage,
        search: e.target.value,
      })
    );
  };

  return (
    <TableWarpper
      name='Thể loại'
      isCreate
      onCreateClick={() => router.push(ROUTERS.categoryCreate.path)}
      onSearchChange={handleSearchChange}
      isBoxSearch
    >
      <Table
        data={categoriesData}
        columns={columns}
        totalCount={categories.total}
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
    const categories = await apiSdk.categoryApis.getAllCategory();
    store.dispatch(setCategories(categories));
    return {
      props: {},
    };
  }
);

export default CategoryPage;
