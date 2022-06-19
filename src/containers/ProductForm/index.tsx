import {
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableWarpper from '../../../src/components/collections/TableWrapper';
import ButtonForm from '../../../src/components/elements/ButtonForm';
import PopupConfirm from '../../../src/components/elements/PopupConfirm';
import TextField from '../../../src/components/elements/TextField';
import { ROUTERS } from '../../../src/configs/navigators';
import { ICustomLable } from '../../../src/containers/CategoryForm';
import { CKEditor } from '../../components/elements/CkEditor';
import InputImage from '../../components/elements/InputImage';
import InputMultiple from '../../components/elements/InputMultiple';
import { allCategoriesSelector } from '../../redux/category/selectors';
import { allPublisher } from '../../redux/publisher/selectors';
import * as Yup from 'yup';
import { allBookByFilter } from '../../redux/product/selectors';
import { allBooksByFilter } from '../../redux/product';
import { getAllCategory } from '../../redux/category';
import { getAllPublishers } from '../../redux/publisher';
import CloudtagForm from './CloudtagForm';
import { Formik } from 'formik';
export enum BookStatus {
  NONE = 'Không',
  HOT = 'HOT',
  NEW = 'NEW',
}
interface IProductForm {
  onSubmitForm: (values: any) => void;
  initial?: any;
  customText?: ICustomLable;
}

const Schema = Yup.object().shape({
  name: Yup.string().required('Tên sản phẩm không được để trống'),
  author: Yup.string().required('Tác giả không được để trống'),
  categories: Yup.array()
    .required('Thể loại không được để trống')
    .min(1, 'Có ít nhất 1 thể loại'),
  publisher: Yup.array()
    .required('Nhà xuất bản không được để trống')
    .min(1, 'Có ít nhất 1 nhà xuất bản'),
  cloudTag: Yup.array().required('Nhà xuất bản không được để trống'),
  status: Yup.string()
    .required('Trạng thái không được để trống')
    .default('None'),
  thumbnail: Yup.string().required('Ảnh hiển thị không được để trống'),
  images: Yup.array(),
  description: Yup.string().required('Mô tả không được để trống'),
  summary: Yup.string().required('Tóm tắt không được để trống'),
  price: Yup.number()
    .required('Giá không được để trống')
    .min(1, 'Giá tiền phải lớn hơn 0'),
  priceUndiscount: Yup.number()
    .required('Giá chưa giảm không được để trống')
    .min(1, 'Giá tiền phải lớn hơn 0'),
  quantity: Yup.number()
    .required('Số lượng không được để trống')
    .min(1, 'Số lượng phải lớn hơn 0'),
  isCombo: Yup.boolean().default(false),
  books: Yup.array()
    .default([])
    .when('isCombo', {
      is: true,
      then: Yup.array().min(1, 'Bộ có ít nhất một cuốn sách'),
    }),
});

const ProductForm: React.FC<IProductForm> = ({
  onSubmitForm,
  initial,
  customText,
}) => {
  const dispatch = useDispatch();
  const categories = useSelector(allCategoriesSelector);
  const publisher = useSelector(allPublisher);
  const booksSelector = useSelector(allBookByFilter);

  const router = useRouter();
  const [isPopupConfirm, setIsPopupConfirm] = useState<boolean>(false);
  const ref = useRef<any>();

  const initialValues = {
    name: initial?.name ?? '',
    author: initial?.author ?? '',
    categories: initial?.categories ?? [],
    publisher: initial?.publisher ?? [],
    status: initial?.status ?? '',
    thumbnail: initial?.thumbnail ?? '',
    images: initial?.images ?? [],
    description: initial?.description ?? '',
    summary: initial?.summary ?? '',
    price: initial?.price ?? 0,
    priceUndiscount: initial?.priceUndiscount ?? 0,
    quantity: initial?.quantity ?? 0,
    isCombo: initial?.isCombo ?? false,
    books: initial?.books ?? [],
    cloudTag: initial?.cloudTag ?? [],
  };

  const handleSubmitForm = (values: any) => {
    if (values) {
      onSubmitForm(values);
    }
  };

  const handleTextBookComboChange = (values: string) => {
    dispatch(allBooksByFilter({ search: values }));
  };

  const handleTextCategoriesChange = (values: string) => {
    dispatch(getAllCategory({ search: values }));
  };

  const handleTextPublisherChange = (values: string) => {
    dispatch(getAllPublishers({ search: values }));
  };
  const onKeyDown = (keyEvent: any) => {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
      keyEvent.preventDefault();
    }
  };
  return (
    <TableWarpper name='Sản phẩm'>
      <Formik
        validationSchema={Schema}
        initialValues={initialValues}
        onSubmit={handleSubmitForm}
        validateOnChange={false}
      >
        {({ handleSubmit, values, errors, handleChange, setFieldValue }) => {
          return (
            <form onSubmit={handleSubmit} onKeyDown={onKeyDown}>
              <Grid container flexDirection='column' spacing={2}>
                <Grid item>
                  <TextField
                    name='name'
                    value={values.name}
                    helperText={errors.name}
                    label='Tên sản phẩm'
                    placeholder='Tên sản phẩm'
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    name='author'
                    value={values.author}
                    helperText={errors.author}
                    label='Tác giả'
                    placeholder='Tác giả'
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item>
                  <InputMultiple
                    label='Thể loại'
                    onChange={(_, value) => {
                      setFieldValue('categories', value);
                    }}
                    options={categories.items}
                    onTextChange={handleTextCategoriesChange}
                    error={errors.categories as string}
                    defaultValue={initialValues.categories}
                  />
                </Grid>
                <Grid item>
                  <InputMultiple
                    label='Nhà xuất bản'
                    onChange={(_, value) => {
                      setFieldValue('publisher', value);
                    }}
                    options={publisher.items}
                    onTextChange={handleTextPublisherChange}
                    error={errors.publisher as string}
                    defaultValue={initialValues.publisher}
                  />
                </Grid>
                <Grid item>
                  {/* <TextField
                    name='status'
                    value={values.status}
                    helperText={errors.status}
                    label='Trạng thái'
                    placeholder='Trạng thái'
                    onChange={handleChange}
                  /> */}
                  <Grid
                    container
                    alignItems='center'
                    justifyContent='space-between'
                  >
                    <Grid item xs={2}>
                      Trạng thái
                    </Grid>
                    <Grid item xs={10}>
                      <FormControl fullWidth>
                        <InputLabel id='demo-simple-select-label'>
                          Trạng thái
                        </InputLabel>
                        <Select
                          name='status'
                          labelId='demo-simple-select-label'
                          id='demo-simple-select'
                          value={values.status}
                          label='Trạng thái'
                          onChange={(e) => {
                            setFieldValue('status', e.target.value);
                          }}
                        >
                          <MenuItem value={BookStatus.NONE}>Không</MenuItem>
                          <MenuItem value={BookStatus.NEW}>
                            {BookStatus.NEW}
                          </MenuItem>
                          <MenuItem value={BookStatus.HOT}>
                            {BookStatus.HOT}
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <CloudtagForm
                    defaultValue={initialValues.cloudTag}
                    getValues={(values: string[]) =>
                      setFieldValue('cloudTag', values)
                    }
                  />
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
                        width={270}
                        height={380}
                        onChange={(link: string) => {
                          setFieldValue('thumbnail', link);
                        }}
                        defaultValue={initialValues.thumbnail}
                        error={!!errors?.thumbnail}
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
                      Ảnh chi tiết
                    </Grid>
                    <Grid
                      container
                      item
                      xs={10}
                      flexDirection='row'
                      spacing={2}
                    >
                      <Grid item>
                        <InputImage
                          width={27 * 3}
                          height={38 * 3}
                          onChange={(link: string) => {
                            setFieldValue('images', [...values.images, link]);
                          }}
                          defaultValue={initialValues.images[0]}
                        />
                      </Grid>
                      <Grid item>
                        <InputImage
                          width={27 * 3}
                          height={38 * 3}
                          onChange={(link: string) => {
                            setFieldValue('images', [...values.images, link]);
                          }}
                          defaultValue={initialValues.images[1]}
                        />
                      </Grid>
                      <Grid item>
                        <InputImage
                          width={27 * 3}
                          height={38 * 3}
                          onChange={(link: string) => {
                            setFieldValue('images', [...values.images, link]);
                          }}
                          defaultValue={initialValues.images[2]}
                        />
                      </Grid>
                      <Grid item>
                        <InputImage
                          width={27 * 3}
                          height={38 * 3}
                          onChange={(link: string) => {
                            setFieldValue('images', [...values.images, link]);
                          }}
                          defaultValue={initialValues.images[3]}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <TextField
                    name='description'
                    value={values.description}
                    helperText={errors.description}
                    label='Mô tả'
                    placeholder='Mô tả'
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
                      Tóm tắt
                    </Grid>
                    <Grid item xs={10}>
                      <CKEditor
                        onChange={(value: string) => {
                          setFieldValue('summary', value);
                        }}
                        name='summary'
                        defaultValue={initialValues.summary}
                        error={errors.summary as string}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <TextField
                    name='price'
                    type='number'
                    value={values.price}
                    helperText={errors.price}
                    label='Giá tiền'
                    placeholder='Giá tiền'
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    name='priceUndiscount'
                    type='number'
                    value={values.priceUndiscount}
                    helperText={errors.priceUndiscount}
                    label='Giá chưa giảm'
                    placeholder='Giá chưa giảm'
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    name='quantity'
                    type='number'
                    value={values.quantity}
                    helperText={errors.quantity}
                    label='Số lượng'
                    placeholder='Số lượng'
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
                      Bộ sách
                    </Grid>
                    <Grid item xs={10}>
                      <Checkbox
                        checked={values.isCombo}
                        onChange={(_: any, value: any) => {
                          // setIsCombo(value);
                          setFieldValue('isCombo', value);
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                {values.isCombo ? (
                  <InputMultiple
                    label='Sách trong bộ'
                    onChange={(_, values) => {
                      setFieldValue(
                        'books',
                        values.map(({ id }) => id)
                      );
                    }}
                    options={booksSelector.items}
                    onTextChange={handleTextBookComboChange}
                    error={errors.books as string}
                    defaultValue={initialValues.books}
                  />
                ) : null}
              </Grid>

              <ButtonForm
                primaryTextButton='Xác nhận'
                secondaryTextButton='Huỷ'
                onPrimaryButton={() => setIsPopupConfirm(true)}
                onSecondaryButton={() => router.push(ROUTERS.product.path)}
              />
              {isPopupConfirm ? (
                <PopupConfirm
                  open={true}
                  title='Xác nhận'
                  content={
                    customText?.content ?? 'Bạn có chắc chắn thêm thể loại này?'
                  }
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

export default ProductForm;
