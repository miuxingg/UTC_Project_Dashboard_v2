import React from 'react';
import Paper from '@mui/material/Paper';
import TableMui from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { TableCellProps } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

export type ColumnDefinitionType<T> = {
  key: keyof T;
  header: string;
  get?: (row: T) => string | React.ReactNode;
  width?: string;
  align?: TableCellProps['align'];
};

export type ITableProps<T> = {
  data: T[];
  columns: ColumnDefinitionType<T>[];
  onPageChange: (_, page) => void;
  onRowsPerPageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  page: number;
  rowsPerPage: number;
  totalCount: number;
};

export function Table<T>({
  data,
  columns,
  onPageChange,
  onRowsPerPageChange,
  page,
  rowsPerPage,
  totalCount,
}: ITableProps<T>) {
  // const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // const handleChangePage = (event: unknown, newPage: number) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 600 }}>
        <TableMui stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map((column, i) => (
                <TableCell key={i} align='center'>
                  {column.header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              //   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, i) => {
                return (
                  <TableRow hover role='checkbox' tabIndex={-1} key={i}>
                    {columns.map((column, j) => {
                      return (
                        <TableCell
                          key={j}
                          align={column?.align ? column?.align : 'center'}
                        >
                          {column.get ? column.get(row) : row[column.key]}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </TableMui>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15, 20]}
        component='div'
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </Paper>
  );
}

export default Table;
