import { Formik } from 'formik';
import React, { useRef } from 'react';
import TableWarpper from '../../components/collections/TableWrapper';
import * as Yup from 'yup';
import TextField from '../../components/elements/TextField';
import { Grid, TextareaAutosize, Typography } from '@mui/material';
import ButtonForm from '../../components/elements/ButtonForm';
import InputImage from '../../components/elements/InputImage';
import { useRouter } from 'next/router';

const Schema = Yup.object().shape({
  title: Yup.string().required('Tiêu đề không được để trống'),
  content: Yup.string().required('Nội dung không được để trống'),
  image: Yup.string().required('Ảnh hiển thị không được để trống'),
});

interface IBlogForm {
  onSubmit?: (data: any) => void;
  initialValues?: any;
}

const BlogForm: React.FC<IBlogForm> = ({ onSubmit, initialValues }) => {
  const router = useRouter();
  const initial = {
    title: initialValues?.title || '',
    content: initialValues?.content || '',
    image: initialValues?.image || '',
  };
  const ref = useRef<any>();
  return (
    <TableWarpper name='Blog'>
      <Formik
        validationSchema={Schema}
        initialValues={initial}
        onSubmit={onSubmit}
        validateOnChange={false}
      >
        {({ handleSubmit, values, errors, handleChange, setFieldValue }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2} flexDirection='column'>
                <Grid item>
                  <TextField
                    name='title'
                    value={values.title}
                    helperText={errors?.title as string}
                    label='Tiêu đề'
                    placeholder='Tiêu đề'
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item>
                  <Grid
                    container
                    alignItems='center'
                    justifyContent='space-between'
                  >
                    <Grid item xs={2}>
                      Nội dung
                    </Grid>
                    <Grid item xs={10}>
                      <TextareaAutosize
                        name='content'
                        value={values.content}
                        aria-label='minimum height'
                        minRows={3}
                        placeholder='Nội dung'
                        style={{ width: '100%' }}
                        onChange={handleChange}
                      />

                      <Typography fontSize={12} style={{ color: 'red' }}>
                        {errors?.content}
                      </Typography>
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
                      Ảnh hiển thị
                    </Grid>
                    <Grid item xs={10}>
                      <InputImage
                        width={275}
                        height={146}
                        onChange={(link: string) => {
                          setFieldValue('image', link);
                        }}
                        defaultValue={initial?.image}
                        error={!!errors?.image}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <ButtonForm
                primaryTextButton='Xác nhận'
                secondaryTextButton='Huỷ'
                onPrimaryButton={() => {
                  ref.current?.click();
                }}
                onSecondaryButton={() => {
                  router.back();
                }}
              />
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

export default BlogForm;
