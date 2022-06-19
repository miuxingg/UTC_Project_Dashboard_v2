import { Formik } from 'formik';
import React, { useRef, useState } from 'react';
import TableWarpper from '../../components/collections/TableWrapper';
import ButtonForm from '../../components/elements/ButtonForm';
import TextField from '../../components/elements/TextField';
import * as Yup from 'yup';
import PopupConfirm from '../../components/elements/PopupConfirm';
import { ROUTERS } from '../../configs/navigators';
import { useRouter } from 'next/router';

const Schema = Yup.object().shape({
  name: Yup.string().required('Tên thể loại không được để trống'),
});

export interface ICustomLable {
  content?: string;
  title?: string;
}

interface ICategoryForm {
  onSubmitForm: (values: any) => void;
  initial?: any;
  customText?: ICustomLable;
}

const CategoryForm: React.FC<ICategoryForm> = ({
  onSubmitForm,
  initial,
  customText,
}) => {
  const router = useRouter();
  const [isPopupConfirm, setIsPopupConfirm] = useState<boolean>(false);
  const ref = useRef<any>();
  const initialValues = {
    name: initial?.name ?? '',
  };
  const handleSubmitForm = (values: any) => {
    if (values && values?.name) {
      onSubmitForm(values);
    }
  };
  return (
    <TableWarpper name={customText?.title ?? 'Thể loại'}>
      <Formik
        validationSchema={Schema}
        initialValues={initialValues}
        onSubmit={handleSubmitForm}
      >
        {({ handleSubmit, values, errors, handleChange }) => {
          return (
            <form onSubmit={handleSubmit}>
              <TextField
                name='name'
                value={values.name}
                helperText={errors?.name as string}
                label={customText?.title ?? 'Tên thể loại'}
                placeholder={customText?.title ?? 'Tên thể loại'}
                onChange={handleChange}
              />
              <ButtonForm
                primaryTextButton='Xác nhận'
                secondaryTextButton='Huỷ'
                onPrimaryButton={() => setIsPopupConfirm(true)}
                onSecondaryButton={() => router.push(ROUTERS.publisher.path)}
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

export default CategoryForm;
