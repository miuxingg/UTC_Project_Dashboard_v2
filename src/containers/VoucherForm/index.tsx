import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import TableWarpper from '../../components/collections/TableWrapper';
import ButtonForm from '../../components/elements/ButtonForm';
import PopupConfirm from '../../components/elements/PopupConfirm';
import TextField from '../../components/elements/TextField';
import { ROUTERS } from '../../configs/navigators';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Box, Grid, Typography } from '@mui/material';
import DateTimePicker from '../../components/collections/DateTimePicker';

const Schema = Yup.object().shape({
  name: Yup.string().required('Tên thể loại không được để trống'),
  priceDiscound: Yup.number().required('Số tiền được giảm không được để trống'),
  startDate: Yup.date().required('Ngày bắt đầu không được để trống'),
  endDate: Yup.date().required('Ngày kết thúc không được để trống'),
});

interface IVoucherForm {
  onSubmitForm: (values: any) => void;
  initial?: any;
}
export const VoucherForm: React.FC<IVoucherForm> = ({
  onSubmitForm,
  initial,
}) => {
  const router = useRouter();
  const [isPopupConfirm, setIsPopupConfirm] = useState<boolean>(false);
  const ref = useRef<any>();
  const initialValues = {
    name: initial?.name ?? '',
    priceDiscound: initial?.priceDiscound ?? 0,
    startDate: initial?.startDate ?? new Date(),
    endDate: initial?.endDate ?? new Date(),
  };

  const handleSubmitForm = (values: any) => {
    if (values && values?.name) {
      onSubmitForm(values);
    }
  };
  return (
    <TableWarpper name='Voucher'>
      <Formik
        validationSchema={Schema}
        initialValues={initialValues}
        onSubmit={handleSubmitForm}
        validateOnChange={false}
      >
        {({ values, handleChange, errors, handleSubmit, setFieldValue }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={0} flexDirection='column'>
                <Grid item>
                  <TextField
                    name='name'
                    value={values.name}
                    helperText={errors?.name as string}
                    label='Tên mã giảm giá'
                    placeholder='Tên mã giảm giá'
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    type='number'
                    name='priceDiscound'
                    value={values.priceDiscound}
                    helperText={errors?.priceDiscound as string}
                    label='Số tiền'
                    placeholder='Số tiền'
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item style={{ marginTop: '30px' }}>
                  <DateTimePicker
                    title='Ngày bắt đầu'
                    onChange={(value) => {
                      setFieldValue('startDate', value);
                    }}
                    defaultValue={initialValues.startDate}
                  />
                </Grid>
                <Grid item style={{ marginTop: '30px' }}>
                  <DateTimePicker
                    title='Ngày kết thúc'
                    onChange={(value) => {
                      setFieldValue('endDate', value);
                    }}
                    defaultValue={initialValues.endDate}
                  />
                </Grid>
              </Grid>
              {/* <Grid item>
                <Box ml={22} mt='-10px'>
                  <Typography fontSize='12px' style={{ color: 'red' }}>
                    error
                  </Typography>
                </Box>
              </Grid> */}
              <ButtonForm
                primaryTextButton='Xác nhận'
                secondaryTextButton='Huỷ'
                onPrimaryButton={() => setIsPopupConfirm(true)}
                onSecondaryButton={() => router.push(ROUTERS.voucher.path)}
              />
              {isPopupConfirm ? (
                <PopupConfirm
                  open={true}
                  title='Xác nhận'
                  content={'Bạn có chắc chắn thêm voucher này?'}
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

export default VoucherForm;
