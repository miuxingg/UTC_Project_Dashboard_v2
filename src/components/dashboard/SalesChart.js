import { Card, CardBody, CardSubtitle, CardTitle } from 'reactstrap';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const SalesChart = () => {
  const chartoptions = {
    series: [
      {
        name: 'Iphone 13',
        data: [0, 31, 40, 28, 51, 42, 109, 100, 1, 1, 1, 1],
      },
      {
        name: 'Oneplue 9',
        data: [0, 11, 32, 45, 32, 34, 52, 41, 1, 1, 1, 1],
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
  return (
    <Card>
      <CardBody>
        <CardTitle tag='h5'>Sales Summary</CardTitle>
        <CardSubtitle className='text-muted' tag='h6'>
          Yearly Sales Report
        </CardSubtitle>
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
