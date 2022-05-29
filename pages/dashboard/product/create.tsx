import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';
import ProductForm from '../../../src/containers/ProductForm';
import { apiSdk } from '../../../src/libs/apis';
import { getServerSideWithProtectedRoute } from '../../../src/libs/hocs/getServerSideWithProtectedRoute';
import { setCategories } from '../../../src/redux/category';
import { createBook, getAllBooks } from '../../../src/redux/product';
import { setPublishers } from '../../../src/redux/publisher';

const CreateProduct: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const handleSubmitForm = (values: any) => {
    dispatch(
      createBook({
        name: values.name,
        author: values.author,
        cloudTag: values.cloudTag,
        description: values.description,
        price: values.price,
        priceUnDiscount: values.priceUndiscount,
        thumbnail: values.thumbnail,
        category: values.categories,
        status: values.status,
        images: values.images,
        quantity: values.quantity,
        isCombo: values.isCombo,
        books: values.isCombo ? values.books : [],
        summary: values.summary,
        publishers: values.publisher,
      })
    );
    router.back();
  };
  return <ProductForm onSubmitForm={handleSubmitForm} />;
};

export const getServerSideProps = getServerSideWithProtectedRoute(
  async (ctx, store) => {
    const [categories, publishers, books] = await Promise.all([
      apiSdk.categoryApis.getAllCategory({ limit: 10, offset: 0 }),
      apiSdk.publisherApis.getAllPublisher({ limit: 10, offset: 0 }),
      apiSdk.bookApis.getAllBook({ limit: 10, offset: 0 }),
    ]);
    // const categories = await apiSdk.categoryApis.getAllCategory();
    store.dispatch(setCategories(categories));
    store.dispatch(setPublishers(publishers));
    store.dispatch(getAllBooks(books));
    return {
      props: {},
    };
  }
);

export default CreateProduct;
