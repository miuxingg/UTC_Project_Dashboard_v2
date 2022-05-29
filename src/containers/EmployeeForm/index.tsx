import { Formik } from 'formik';
import React, { useRef, useState } from 'react';
import TableWarpper from '../../components/collections/TableWrapper';
import TextField from '../../components/elements/TextField';
import * as Yup from 'yup';
import ButtonForm from '../../components/elements/ButtonForm';
import { useRouter } from 'next/router';
import PopupConfirm from '../../components/elements/PopupConfirm';
import { ROUTERS } from '../../configs/navigators';
import {
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField as MuiTextField,
  Typography,
} from '@mui/material';
import { Roles } from '../../configs/roles.config';
const Schema = Yup.object().shape({
  firstname: Yup.string().required('Họ thể loại không được để trống'),
  lastname: Yup.string().required('Tên thể loại không được để trống'),
  email: Yup.string().required('Tên thể loại không được để trống'),
  role: Yup.string().required('Chức vụ không được để trống'),
});
interface IEmployeeForm {
  initial?: any;
  onSubmit?: (value: any) => void;
  errorMessage?: any;
  emailDisable?: boolean;
}
const EmployeeForm: React.FC<IEmployeeForm> = ({
  initial,
  onSubmit,
  errorMessage,
  emailDisable,
}) => {
  const router = useRouter();
  const [isPopupConfirm, setIsPopupConfirm] = useState<boolean>(false);
  const ref = useRef<any>();
  const initialValues = {
    firstname: initial?.firstname ?? '',
    lastname: initial?.lastname ?? '',
    email: initial?.email ?? '',
    role: initial?.role ?? '',
  };

  return (
    <TableWarpper name='Nhân viên'>
      <Formik
        validationSchema={Schema}
        initialValues={initialValues}
        onSubmit={onSubmit}
        validateOnChange={false}
      >
        {({ handleSubmit, values, errors, handleChange, setFieldValue }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2} flexDirection='column'>
                <Grid item>
                  <TextField
                    name='email'
                    value={values.email}
                    helperText={
                      (errors?.email as string) || errorMessage?.email || ''
                    }
                    label={'Email'}
                    placeholder={'Email'}
                    onChange={handleChange}
                    disabled={emailDisable}
                  />
                </Grid>
                <Grid
                  item
                  container
                  alignItems='center'
                  //   justifyContent='space-between'
                >
                  <Grid item xs={2}>
                    Tên nhân viên
                  </Grid>
                  <Grid item container xs={10} spacing={3}>
                    <Grid item xs={6}>
                      <MuiTextField
                        name='firstname'
                        value={values.firstname}
                        helperText={errors?.firstname as string}
                        onChange={handleChange}
                        id='outlined-helperText'
                        placeholder='Họ'
                        label='Họ'
                        fullWidth
                        error={!!errors?.firstname}
                        FormHelperTextProps={{
                          classes: {
                            root: `{ color: 'red' }`,
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <MuiTextField
                        name='lastname'
                        value={values.lastname}
                        helperText={errors?.lastname as string}
                        onChange={handleChange}
                        id='outlined-helperText'
                        placeholder='Tên'
                        label='Tên'
                        fullWidth
                        error={!!errors?.lastname}
                        FormHelperTextProps={{
                          classes: {
                            root: `{ color: 'red' }`,
                          },
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid
                    container
                    alignItems='center'
                    justifyContent='space-between'
                  >
                    <Grid item xs={2}>
                      Chức vụ
                    </Grid>
                    <Grid item xs={10}>
                      <FormControl>
                        <RadioGroup
                          name='role'
                          row
                          aria-labelledby='demo-row-radio-buttons-group-label'
                          value={values.role}
                          onChange={(_, value) => {
                            setFieldValue('role', value);
                          }}
                        >
                          <FormControlLabel
                            value={Roles.Manager}
                            control={<Radio />}
                            label='Nhân viên'
                          />
                          <FormControlLabel
                            value={Roles.Shipper}
                            control={<Radio />}
                            label='Giao hàng'
                          />
                        </RadioGroup>
                      </FormControl>
                      {errors?.role ? (
                        <Typography fontSize='12px' color='error'>
                          {errors?.role}
                        </Typography>
                      ) : null}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <ButtonForm
                primaryTextButton='Xác nhận'
                secondaryTextButton='Huỷ'
                onPrimaryButton={() => setIsPopupConfirm(true)}
                onSecondaryButton={() => router.push(ROUTERS.employee.path)}
              />
              {isPopupConfirm ? (
                <PopupConfirm
                  open={true}
                  title='Xác nhận'
                  content={'Thêm nhân viên'}
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

export default EmployeeForm;
