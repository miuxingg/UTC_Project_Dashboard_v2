import { Formik } from 'formik';
import React, { useRef, useState } from 'react';
import TableWarpper from '../../../src/components/collections/TableWrapper';
import * as Yup from 'yup';
import { Grid } from '@mui/material';
import TextField from '../../../src/components/elements/TextField';
import ButtonForm from '../../../src/components/elements/ButtonForm';
import PopupConfirm from '../../../src/components/elements/PopupConfirm';
import { useRouter } from 'next/router';
import { ROUTERS } from '../../../src/configs/navigators';
import { useDispatch, useSelector } from 'react-redux';
import { getConfig, updateConfig } from '../../../src/redux/config';
import { getServerSideWithProtectedRoute } from '../../../src/libs/hocs/getServerSideWithProtectedRoute';
import { apiSdk } from '../../../src/libs/apis';
import { configSelector } from '../../../src/redux/config/selectors';

const Schema = Yup.object().shape({
  shippingMoney: Yup.number().min(0, 'Tiền vận chuyển không được nhỏ hơn 0'),
  email: Yup.string().required('Địa chỉ email không được để trống'),
  numberPhone: Yup.string().required('Số điện thoại không được để trống'),
  address: Yup.string().required('Địa chỉ không được để trống'),
});

const Config: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isPopupConfirm, setIsPopupConfirm] = useState<boolean>(false);
  const ref = useRef<any>();

  const config = useSelector(configSelector);

  const initialValues = {
    shippingMoney: config?.shippingMoney || 0,
    email: config?.shopInfomation?.email || '',
    numberPhone: config?.shopInfomation?.numberPhone || '',
    address: config?.shopInfomation?.address || '',
  };
  const onSubmit = (values: any) => {
    dispatch(
      updateConfig({
        shippingMoney: values.shippingMoney,
        shopInfomation: {
          email: values.email,
          numberPhone: values.numberPhone,
          address: values.address,
        },
      })
    );
  };
  return (
    <TableWarpper name='Thiết lập'>
      <Formik
        validationSchema={Schema}
        initialValues={initialValues}
        onSubmit={onSubmit}
        validateOnChange={false}
      >
        {({ handleSubmit, values, errors, handleChange }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Grid container flexDirection='column' spacing={2}>
                <Grid item>
                  <TextField
                    name='email'
                    value={values?.email}
                    helperText={errors?.email}
                    label='Email'
                    placeholder='Email'
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    name='numberPhone'
                    value={values?.numberPhone}
                    helperText={errors?.numberPhone}
                    label='Số điện thoại'
                    placeholder='Số điện thoại'
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    name='address'
                    value={values?.address}
                    helperText={errors?.address}
                    label='Địa chỉ'
                    placeholder='Địa chỉ'
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    type='number'
                    name='shippingMoney'
                    value={values?.shippingMoney}
                    helperText={errors?.shippingMoney}
                    label='Tiền vận chuyển'
                    placeholder='Tiền vận chuyển'
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <ButtonForm
                primaryTextButton='Xác nhận'
                secondaryTextButton='Huỷ'
                onPrimaryButton={() => setIsPopupConfirm(true)}
                onSecondaryButton={() => router.push(ROUTERS.dashboard.path)}
              />
              {isPopupConfirm ? (
                <PopupConfirm
                  open={true}
                  title='Xác nhận'
                  content={'Bạn có chắc chắn thay đổi thiết lập'}
                  onClose={() => {
                    setIsPopupConfirm(false);
                  }}
                  onSubmit={() => {
                    ref.current?.click();
                    setIsPopupConfirm(false);
                  }}
                />
              ) : null}
              <button ref={ref} type='submit' hidden>
                Click
              </button>
            </form>
          );
        }}
      </Formik>
    </TableWarpper>
  );
};
export const getServerSideProps = getServerSideWithProtectedRoute(
  async (ctx, store) => {
    const [config] = await Promise.all([apiSdk.configApis.getConfig()]);

    store.dispatch(getConfig(config));
    return {
      props: {},
    };
  }
);

export default Config;
