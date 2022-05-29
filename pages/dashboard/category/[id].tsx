import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CategoryForm from '../../../src/containers/CategoryForm';
import { apiSdk } from '../../../src/libs/apis';
import { getServerSideWithProtectedRoute } from '../../../src/libs/hocs/getServerSideWithProtectedRoute';
import { getCategoryById, updateCategory } from '../../../src/redux/category';
import { categoryByIdSelector } from '../../../src/redux/category/selectors';

const CategoryUpdate: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;
  const currentCategory = useSelector(categoryByIdSelector);
  const handleSubmitForm = (values: any) => {
    if (id && values.name) {
      dispatch(updateCategory({ id, input: { name: values.name } }));
      router.back();
    }
  };
  return (
    <CategoryForm
      onSubmitForm={handleSubmitForm}
      initial={{ name: currentCategory?.name }}
      customText={{
        content: `Bạn có chắc chắn thay đổi tên của thể loại: ${currentCategory?.name}`,
      }}
    />
  );
};

export const getServerSideProps = getServerSideWithProtectedRoute(
  async (ctx, store) => {
    const { id } = ctx.query;
    const category = await apiSdk.categoryApis.getCategoryById(id as string);
    store.dispatch(getCategoryById(category));

    return {
      props: {},
    };
  }
);

export default CategoryUpdate;
