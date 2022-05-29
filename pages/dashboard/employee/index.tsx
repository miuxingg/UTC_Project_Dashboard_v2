import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableWarpper from '../../../src/components/collections/TableWrapper';
import PopupConfirm from '../../../src/components/elements/PopupConfirm';
import {
  ColumnDefinitionType,
  Table,
} from '../../../src/components/elements/Table';
import { ROUTERS } from '../../../src/configs/navigators';
import { apiSdk } from '../../../src/libs/apis';
import { getServerSideWithProtectedRoute } from '../../../src/libs/hocs/getServerSideWithProtectedRoute';
import { getEmployee } from '../../../src/redux/auth';
import {
  deleteAccountEmployee,
  setEmployee,
} from '../../../src/redux/auth/action';
import { employeeSelector } from '../../../src/redux/auth/selectors';
import { CellAction, IAction } from '../publisher';

export interface ISponsor {
  stt: number;
  name: string;
  email: string;
  role: string;
  action: IAction;
}

const columns: ColumnDefinitionType<ISponsor>[] = [
  {
    key: 'stt',
    header: 'STT',
    width: '5%',
  },
  {
    key: 'name',
    header: 'Tên',
    width: '30%',
  },
  {
    key: 'email',
    header: 'Email',
    width: '30%',
  },
  {
    key: 'role',
    header: 'Chức vụ',
    width: '15%',
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
    width: '20%',
  },
];

const EmployeePage: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [currentId, setCurrentId] = useState<string>('');

  const [isPopupConfirm, setIsPopupConfirm] = useState<boolean>(false);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const employee = useSelector(employeeSelector);

  const handleDeleteComfirm = useCallback(() => {
    if (currentId) {
      dispatch(deleteAccountEmployee(currentId));
    }
  }, [dispatch, currentId]);

  const datas = useMemo(() => {
    return employee.items.map((item, i) => {
      return {
        stt: i + 1,
        role: item.roles,
        email: item.email,
        name: `${item.firstName} ${item.lastName}`,
        action: {
          onUpdate: () => {
            router.push(`${ROUTERS.employee.path}/${item.id}`);
          },
          onDelete: () => {
            setIsPopupConfirm(true);
            setCurrentId(item.id);
          },
        },
      };
    });
  }, [employee]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmployee({ search: e.target.value }));
  };
  return (
    <TableWarpper
      name='Quản lý nhân viên'
      isCreate
      onCreateClick={() => router.push(ROUTERS.emplyeeCreate.path)}
      onSearchChange={handleSearchChange}
      isBoxSearch
    >
      <Table
        data={datas}
        columns={columns}
        totalCount={employee.total}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {isPopupConfirm ? (
        <PopupConfirm
          open={true}
          title='Xác nhận'
          content='Bạn có chắc chắn xoá nhân viên này?'
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
    const employee = await apiSdk.authApis.getEmployee({ limit: 5 });
    store.dispatch(getEmployee(employee));
    return {
      props: {},
    };
  }
);
export default EmployeePage;
