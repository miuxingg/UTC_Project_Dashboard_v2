import { Box, Grid, TextField, Typography } from '@mui/material';
import React, { Fragment } from 'react';
import { Card, CardBody, CardTitle, Row, Col } from 'reactstrap';
import AddIcon from '@mui/icons-material/Add';
export interface ITableWrapper {
  children: React.ReactNode;
  name: string;
  isCreate?: boolean;
  isBoxSearch?: boolean;
  onCreateClick?: () => void;
  onSearchChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const TableWarpper: React.FC<ITableWrapper> = ({
  children,
  name,
  isCreate,
  onCreateClick,
  onSearchChange,
  isBoxSearch,
}) => {
  return (
    <div>
      <Row>
        <Col xs='12' md='12' sm='12'>
          <Card>
            <CardTitle tag='h6' className='border-bottom p-3 mb-0'>
              <Grid container justifyContent='space-between'>
                <Grid item>{name}</Grid>
                <Grid item>
                  {isCreate ? (
                    <div onClick={onCreateClick} style={{ cursor: 'pointer' }}>
                      <AddIcon
                        style={{
                          width: '30px',
                          height: '30px',
                          marginBottom: '7px',
                          color: '#1F91FA',
                        }}
                      />
                      <Typography
                        style={{ fontSize: '16px' }}
                        component='span'
                        color='secondary'
                      >
                        Tạo mới
                      </Typography>
                    </div>
                  ) : (
                    ''
                  )}
                </Grid>
              </Grid>
              {isBoxSearch ? (
                <Box mt={2} display='flex' justifyContent='flex-end'>
                  <input placeholder='Tìm kiếm' onChange={onSearchChange} />
                </Box>
              ) : null}
            </CardTitle>
            <CardBody className=''>{children}</CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default TableWarpper;
