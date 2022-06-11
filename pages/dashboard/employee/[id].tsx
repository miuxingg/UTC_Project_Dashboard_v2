import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ROUTERS } from '../../../src/configs/navigators';
import EmployeeForm from '../../../src/containers/EmployeeForm';
import { apiSdk } from '../../../src/libs/apis';
import { getServerSideWithProtectedRoute } from '../../../src/libs/hocs/getServerSideWithProtectedRoute';
import { employeeById } from '../../../src/redux/auth';
import { updateAccountEmployee } from '../../../src/redux/auth/action';
import { employeeByIdSelector } from '../../../src/redux/auth/selectors';

const UpdateEmployee: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const employee = useSelector(employeeByIdSelector);
  const handleSubmit = (values: any) => {
    dispatch(
      updateAccountEmployee({
        id: id as string,
        input: {
          email: values.email,
          firstName: values.firstname,
          lastName: values.lastname,
          roles: values.role,
        },
      })
    );
    router.push(ROUTERS.employee.path);
  };
  return (
    <EmployeeForm
      onSubmit={handleSubmit}
      initial={{
        email: employee.email,
        firstname: employee.firstName,
        lastname: employee.lastName,
        role: employee.roles,
      }}
      emailDisable
    />
  );
};

export const getServerSideProps = getServerSideWithProtectedRoute(
  async (ctx, store) => {
    const { id } = ctx.query;
    const employee = await apiSdk.authApis.getEmployeeById(id as string);
    store.dispatch(employeeById(employee));
    return {
      props: {},
    };
  }
);
export default UpdateEmployee;
