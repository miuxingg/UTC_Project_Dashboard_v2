import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CategoryForm from '../../../src/containers/CategoryForm';
import { apiSdk } from '../../../src/libs/apis';
import { getServerSideWithProtectedRoute } from '../../../src/libs/hocs/getServerSideWithProtectedRoute';
import { getCategoryById, updateCategory } from '../../../src/redux/category';
import { categoryByIdSelector } from '../../../src/redux/category/selectors';
import {
  getPublisherById,
  updatePublisher,
} from '../../../src/redux/publisher';
import { publisherByIdSelector } from '../../../src/redux/publisher/selectors';

const CategoryUpdate: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;
  const currentPublisher = useSelector(publisherByIdSelector);
  const handleSubmitForm = (values: any) => {
    if (id && values.name) {
      dispatch(updatePublisher({ id, input: { name: values.name } }));
      router.back();
    }
  };
  return (
    <CategoryForm
      onSubmitForm={handleSubmitForm}
      initial={{ name: currentPublisher?.name }}
      customText={{
        content: `Bạn có chắc chắn thay đổi tên của nhà xuất bản này: ${currentPublisher?.name}`,
        title: 'Nhà xuất bản',
      }}
    />
  );
};

export const getServerSideProps = getServerSideWithProtectedRoute(
  async (ctx, store) => {
    const { id } = ctx.query;
    const publisher = await apiSdk.publisherApis.getPublisherById(id as string);
    store.dispatch(getPublisherById(publisher));
    return {
      props: {},
    };
  }
);

export default CategoryUpdate;
