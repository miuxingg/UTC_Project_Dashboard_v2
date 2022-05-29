import { unwrapResult } from '@reduxjs/toolkit';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ROUTERS } from '../../../src/configs/navigators';
import EmployeeForm from '../../../src/containers/EmployeeForm';
import { getServerSideWithProtectedRoute } from '../../../src/libs/hocs/getServerSideWithProtectedRoute';
import { setSuccess } from '../../../src/redux/app';
import { createAccountEmployee } from '../../../src/redux/auth/action';

const CreateUserShop: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState({});
  const handleSubmit = async (values: any) => {
    const response = await dispatch(
      createAccountEmployee({
        email: values.email,
        firstName: values.firstname,
        lastName: values.lastname,
        roles: values.role,
      })
    );
    const results = await unwrapResult(response as any);
    if (results?.statusCode) {
      setErrorMessage({ email: results?.message });
    } else {
      router.push(ROUTERS.employee.path);
      dispatch(setSuccess({ message: 'Tạo nhân viên thành công' }));
    }
  };
  return <EmployeeForm onSubmit={handleSubmit} errorMessage={errorMessage} />;
};

export const getServerSideProps = getServerSideWithProtectedRoute(
  async (ctx, store) => {
    return {
      props: {},
    };
  }
);
export default CreateUserShop;
