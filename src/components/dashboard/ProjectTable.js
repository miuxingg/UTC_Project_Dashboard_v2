import Image from 'next/image';
import { Card, CardBody, CardTitle, CardSubtitle, Table } from 'reactstrap';
import { DocumentStatus } from '../../configs/types';
import { moneyFormat } from '../../libs/utils';

const ProjectTables = ({ datas }) => {
  return (
    <Card>
      <CardBody>
        <CardTitle tag='h5'>Sản phẩm bán chạy nhất</CardTitle>
        {/* <CardSubtitle className='mb-2 text-muted' tag='h6'>
          Overview of the projects
        </CardSubtitle> */}
        <div className='table-responsive'>
          <Table className='text-nowrap mt-3 align-middle' borderless>
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Số lượng</th>

                <th>Trạng thái</th>
                <th>Giá</th>
                {/* <th>Bộ</th> */}
              </tr>
            </thead>
            <tbody>
              {datas.map((tdata, index) => (
                <tr key={index} className='border-top'>
                  <td>
                    <div className='d-flex align-items-center p-2'>
                      <img
                        src={tdata.thumbnail}
                        // className='rounded-circle'
                        alt='avatar'
                        style={{ width: '45px', height: '45px' }}
                        // width='45'
                        // height='45'
                      />
                      <div className='ms-3'>
                        <h6
                          className='mb-0'
                          style={{
                            maxWidth: '420px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {tdata.name}
                        </h6>
                        <span className='text-muted'>{tdata.author}</span>
                      </div>
                    </div>
                  </td>
                  <td>{tdata.quantity}</td>
                  <td>
                    {tdata.documentStatus === DocumentStatus.Rejected ? (
                      <span className='p-2 bg-danger rounded-circle d-inline-block ms-3' />
                    ) : tdata.status === DocumentStatus.Pending ? (
                      <span className='p-2 bg-warning rounded-circle d-inline-block ms-3' />
                    ) : (
                      <span className='p-2 bg-success rounded-circle d-inline-block ms-3' />
                    )}
                  </td>
                  <td>{moneyFormat(tdata.price)}</td>
                  {/* <td>{tdata.isCombo ? 'Có' : 'Không'}</td> */}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </CardBody>
    </Card>
  );
};

export default ProjectTables;
