import {
  Box,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableWarpper from '../../../src/components/collections/TableWrapper';
import PopupConfirm from '../../../src/components/elements/PopupConfirm';
import {
  ColumnDefinitionType,
  Table,
} from '../../../src/components/elements/Table';
import { ROUTERS } from '../../../src/configs/navigators';
import { DocumentStatus } from '../../../src/configs/types';
import { apiSdk } from '../../../src/libs/apis';
import { ICategoryApi } from '../../../src/libs/apis/category/types';
import { getServerSideWithProtectedRoute } from '../../../src/libs/hocs/getServerSideWithProtectedRoute';
import {
  allBooksByFilter,
  getAllBooks,
  updateStatusBook,
} from '../../../src/redux/product';
import { allBookByFilter } from '../../../src/redux/product/selectors';
import { IAction, CellAction } from '../category/';

export interface IProduct {
  stt: number;
  thumbnail: string;
  name: string;
  author: string;
  price: number;
  publisher: ICategoryApi[];
  category: ICategoryApi[];
  quantity: number;
  status: DocumentStatus;
  action: IAction;
  id?: string;
}

export const CellThumbnail: React.FC<{ thumbnail: string }> = ({
  thumbnail,
}) => {
  return (
    <Box
      sx={{
        width: 70,
        height: 80,
        backgroundImage: `url(${thumbnail})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    />
  );
};

export const CellArray: React.FC<{ list: ICategoryApi[] }> = ({ list }) => {
  return (
    <>
      {list.map((item, i) => {
        return (
          <span>
            {item.name}
            {i === list.length - 1 ? '' : ', '}
          </span>
        );
      })}
    </>
  );
};

interface ICellSelect {
  id: string;
  status: DocumentStatus;
}
export const CellSelect: React.FC<ICellSelect> = ({ status, id }) => {
  const dispatch = useDispatch();
  const [statusState, setStatusState] = React.useState<DocumentStatus | string>(
    status
  );
  useEffect(() => {
    setStatusState(status);
  }, [status]);
  const [isPopupConfirm, setIsPopupConfirm] = React.useState(false);
  const [statusChoose, setStatusChoose] = React.useState<
    DocumentStatus | string
  >(status);
  const handleChange = (event: SelectChangeEvent) => {
    setIsPopupConfirm(true);
    setStatusChoose(event.target.value);
  };

  const handleChangeStatus = useCallback(
    async (idProduct?: string) => {
      const response = await dispatch(
        updateStatusBook({
          id: idProduct,
          input: {
            documentStatus: statusChoose as DocumentStatus,
          },
        })
      );
      const data = unwrapResult(response as any);
      if (data) {
        setStatusState(statusChoose);
      }
    },
    [statusChoose]
  );

  return (
    <>
      <FormControl
        sx={{
          m: 1,
          minWidth: 100,
        }}
      >
        <Select
          value={statusState}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          {Object.keys(DocumentStatus).map((item, index) => {
            return <MenuItem value={item}>{item}</MenuItem>;
          })}
        </Select>
      </FormControl>
      {isPopupConfirm ? (
        <PopupConfirm
          id={id}
          open={true}
          title='Xác nhận'
          content='Bạn có chắc chắn thay đổi trạng thái sản phẩm này?'
          onClose={() => {
            setIsPopupConfirm(false);
          }}
          onSubmit={(id?: string) => {
            setIsPopupConfirm(false);
            handleChangeStatus(id);
          }}
        />
      ) : null}
    </>
  );
};

const columns: ColumnDefinitionType<IProduct>[] = [
  {
    key: 'stt',
    header: 'STT',
    width: '5%',
  },
  {
    key: 'thumbnail',
    header: 'Ảnh',
    width: '10%',
    get: (product: IProduct) => <CellThumbnail thumbnail={product.thumbnail} />,
  },
  {
    key: 'name',
    header: 'Tên',
    width: '20%',
    align: 'left',
  },
  {
    key: 'author',
    header: 'Tác giả',
    width: '10%',
    align: 'left',
  },
  {
    key: 'category',
    header: 'Thể loại',
    width: '10%',
    align: 'left',
    get: (product: IProduct) => <CellArray list={product.category} />,
  },
  {
    key: 'publisher',
    header: 'Nhà xuất bản',
    width: '10%',
    align: 'left',
    get: (product: IProduct) => <CellArray list={product.publisher} />,
  },
  {
    key: 'price',
    header: 'Giá',
    width: '5%',
  },
  {
    key: 'quantity',
    header: 'Số lượng',
    width: '5%',
  },
  {
    key: 'status',
    header: 'Trạng thái',
    width: '5%',
    get: (product: IProduct) => {
      return <CellSelect id={product.id} status={product.status} />;
    },
  },
  {
    key: 'action',
    header: 'Thao tác',
    get: (action: IProduct) => (
      <CellAction
        onUpdate={action.action.onUpdate}
        onDelete={action.action.onDelete}
      />
    ),
    width: '10%',
  },
];

const ProductPage: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const booksSelector = useSelector(allBookByFilter);
  const [search, setSearch] = useState<string>('');

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [isPopupConfirm, setIsPopupConfirm] = React.useState(false);
  const [bookChoose, setBookChoose] = React.useState<string>();

  useEffect(() => {
    dispatch(
      allBooksByFilter({
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
  const handleUpdate = (id) => {
    router.push(`${ROUTERS.product.path}/${id}`);
  };

  const handleChangeStatus = useCallback(async () => {
    const response = await dispatch(
      updateStatusBook({
        id: bookChoose,
        input: {
          documentStatus: DocumentStatus.Rejected,
        },
      })
    );
    const data = unwrapResult(response as any);
    if (data) {
    }
  }, [bookChoose]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    dispatch(
      allBooksByFilter({
        limit: rowsPerPage,
        offset: page * rowsPerPage,
        search: e.target.value,
      })
    );
  };

  const datas: IProduct[] = booksSelector.items.map((book, i) => {
    return {
      id: book.id,
      stt: i + 1,
      thumbnail: book.thumbnail,
      name: book.name,
      author: book.author,
      price: book.price,
      publisher: book.publishers,
      category: book.category,
      status: book.documentStatus,
      quantity: book.quantity,
      action: {
        onUpdate: () => {
          handleUpdate(book.id);
        },
        onDelete: () => {
          setBookChoose(book.id);
          setIsPopupConfirm(true);
        },
      },
    };
  });

  return (
    <TableWarpper
      name='Sản phẩm'
      isCreate
      onCreateClick={() => router.push(ROUTERS.productCreate.path)}
      onSearchChange={handleSearchChange}
      isBoxSearch
    >
      <Table
        data={datas}
        totalCount={booksSelector.total}
        columns={columns}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {isPopupConfirm ? (
        <PopupConfirm
          open={true}
          title='Xác nhận'
          content='Bạn có chắc chắn xoá cuốn sách này?'
          onClose={() => {
            setIsPopupConfirm(false);
          }}
          onSubmit={() => {
            setIsPopupConfirm(false);
            handleChangeStatus();
          }}
        />
      ) : null}
    </TableWarpper>
  );
};

export const getServerSideProps = getServerSideWithProtectedRoute(
  async (ctx, store) => {
    const books = await apiSdk.bookApis.getAllBook({ limit: 10, offset: 0 });
    store.dispatch(getAllBooks(books));
    return {
      props: {},
    };
  }
);
export default ProductPage;
