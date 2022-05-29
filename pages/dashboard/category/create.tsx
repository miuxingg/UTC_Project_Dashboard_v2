import React from 'react';
import { useDispatch } from 'react-redux';
import CategoryForm from '../../../src/containers/CategoryForm';
import { getServerSideWithProtectedRoute } from '../../../src/libs/hocs/getServerSideWithProtectedRoute';
import { createCategory } from '../../../src/redux/category';

const CategoryCreate: React.FC = () => {
  const dispatch = useDispatch();
  const handleSubmitForm = (values: any) => {
    dispatch(createCategory({ name: values.name }));
  };
  return <CategoryForm onSubmitForm={handleSubmitForm} />;
};

export const getServerSideProps = getServerSideWithProtectedRoute(
  async (ctx, store) => {
    return {
      props: {},
    };
  }
);

export default CategoryCreate;
