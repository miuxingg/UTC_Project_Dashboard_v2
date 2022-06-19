import { Card, CardBody, CardSubtitle, CardTitle } from 'reactstrap';
import dynamic from 'next/dynamic';
import {
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const SalesChart = ({ money, quantity, onYearChange }) => {
  const chartoptions = {
    series: [
      {
        name: 'Tiền(Triệu đồng)',
        data: [...money],
      },
      {
        name: 'Số lượng(Quyển)',
        data: [...quantity],
      },
    ],
    options: {
      chart: {
        type: 'area',
      },
      dataLabels: {
        enabled: false,
      },
      grid: {
        strokeDashArray: 3,
        borderColor: 'rgba(0,0,0,0.1)',
      },

      stroke: {
        curve: 'smooth',
        width: 1,
      },
      xaxis: {
        categories: [
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
        ],
      },
    },
  };
  const currentYear = new Date().getFullYear();
  return (
    <Card>
      <CardBody>
        <CardTitle tag='h5'>Báo cáo theo năm</CardTitle>
        <FormControl style={{ width: '130px' }}>
          <InputLabel id='demo-simple-select-label'>Năm</InputLabel>
          <Select
            name='year'
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            // value={values.status}
            label='Năm'
            onChange={(e) => {
              onYearChange(e.target.value);
            }}
            defaultValue={currentYear}
          >
            <MenuItem value={currentYear}>{currentYear}</MenuItem>
            <MenuItem value={currentYear - 1}>{currentYear - 1}</MenuItem>
            <MenuItem value={currentYear - 2}>{currentYear - 2}</MenuItem>
          </Select>
        </FormControl>
        <Chart
          type='area'
          width='100%'
          height='390'
          options={chartoptions.options}
          series={chartoptions.series}
        />
      </CardBody>
    </Card>
  );
};

export default SalesChart;
