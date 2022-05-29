import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TabsChirdlen from '../TabsChildren';
import { allOrdersByStatusSelector } from '../../../redux/order/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { IOrderStatus } from '../../../libs/apis/order/types';
import { getOrderByStatus, updateOrderStatus } from '../../../redux/order';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const TabsWapper: React.FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);
  const orderHistory = useSelector(allOrdersByStatusSelector);
  const [queries, setQueries] = React.useState<IOrderStatus>(
    IOrderStatus.Pending
  );
  React.useEffect(() => {
    dispatch(getOrderByStatus({ status: queries }));
  }, [queries]);
  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        setQueries(IOrderStatus.Pending);
        return;
      case 1:
        setQueries(IOrderStatus.Shipping);
        return;
      case 2:
        setQueries(IOrderStatus.Success);
        return;
      case 3:
        setQueries(IOrderStatus.Rejected);
        return;
      default:
        setQueries(IOrderStatus.Pending);
        return;
    }
  };

  const handlePrimaryButton = (id: string) => {
    if (id) {
      dispatch(
        updateOrderStatus({ id: id, input: { status: IOrderStatus.Shipping } })
      );
    }
  };
  const handleSecondButton = (id: string) => {
    if (id) {
      dispatch(
        updateOrderStatus({ id: id, input: { status: IOrderStatus.Rejected } })
      );
    }
  };

  const handleShippingPrimary = (id: string) => {
    if (id) {
      dispatch(
        updateOrderStatus({ id: id, input: { status: IOrderStatus.Success } })
      );
    }
  };
  const handleShippingSecondary = (id: string) => {
    if (id) {
      dispatch(
        updateOrderStatus({ id: id, input: { status: IOrderStatus.Pending } })
      );
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'
        >
          <Tab label='Chờ xác nhận' {...a11yProps(0)} />
          <Tab label='Đang giao' {...a11yProps(1)} />
          <Tab label='Đã giao' {...a11yProps(2)} />
          <Tab label='Đã huỷ' {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <TabsChirdlen
          orderHistory={orderHistory}
          isAction
          onPrimaryButton={handlePrimaryButton}
          onSecondButton={handleSecondButton}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TabsChirdlen
          orderHistory={orderHistory}
          isAction
          onPrimaryButton={handleShippingPrimary}
          onSecondButton={handleShippingSecondary}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TabsChirdlen orderHistory={orderHistory} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <TabsChirdlen orderHistory={orderHistory} />
      </TabPanel>
    </Box>
  );
};

export default TabsWapper;
