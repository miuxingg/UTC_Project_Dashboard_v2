import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';
import CategoryForm from '../../../src/containers/CategoryForm';
import { getServerSideWithProtectedRoute } from '../../../src/libs/hocs/getServerSideWithProtectedRoute';
import { createPublisher } from '../../../src/redux/publisher';

const CategoryCreate: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const handleSubmitForm = (values: any) => {
    dispatch(createPublisher({ name: values.name }));
    router.back();
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
