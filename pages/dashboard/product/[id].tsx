import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductForm from '../../../src/containers/ProductForm';
import { apiSdk } from '../../../src/libs/apis';
import { getServerSideWithProtectedRoute } from '../../../src/libs/hocs/getServerSideWithProtectedRoute';
import { setCategories } from '../../../src/redux/category';
import {
  getAllBooks,
  getBookById,
  updateBook,
} from '../../../src/redux/product';
import { bookDetailSelector } from '../../../src/redux/product/selectors';
import { setPublishers } from '../../../src/redux/publisher';

const ProductDetails: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;
  const bookDetail = useSelector(bookDetailSelector);
  const handleSubmit = (values: any) => {
    dispatch(
      updateBook({
        id: id as string,
        input: {
          name: values.name,
          author: values.author,
          cloudTag: values.cloudTag,
          description: values.description,
          price: values.price,
          priceUnDiscount: values.priceUndiscount,
          thumbnail: values.thumbnail,
          category: values.categories.map((item) => item.id),
          status: values.status,
          images: values.images,
          quantity: values.quantity,
          isCombo: values.isCombo,
          books: values.isCombo ? values.books : [],
          summary: values.summary,
          publishers: values.publisher.map((item) => item.id),
        },
      })
    );
    router.back();
  };

  return (
    <ProductForm
      onSubmitForm={handleSubmit}
      initial={{
        id: bookDetail.id,
        name: bookDetail?.name ?? '',
        author: bookDetail?.author ?? '',
        categories: bookDetail?.category ?? [],
        publisher: bookDetail?.publishers ?? [],
        status: bookDetail?.status ?? '',
        thumbnail: bookDetail?.thumbnail ?? '',
        images: bookDetail?.images ?? [],
        description: bookDetail?.description ?? '',
        summary: bookDetail?.summary ?? '',
        price: bookDetail?.price ?? 0,
        priceUndiscount: bookDetail?.priceUnDiscount ?? 0,
        quantity: bookDetail?.quantity ?? 0,
        isCombo: bookDetail?.isCombo ?? false,
        books: bookDetail?.books ?? [],
        cloudTag: bookDetail?.cloudTag ?? [],
      }}
    />
  );
};

export const getServerSideProps = getServerSideWithProtectedRoute(
  async (ctx, store) => {
    const { id } = ctx.query;
    const [categories, publishers, books, bookDetail] = await Promise.all([
      apiSdk.categoryApis.getAllCategory({ limit: 10, offset: 0 }),
      apiSdk.publisherApis.getAllPublisher({ limit: 10, offset: 0 }),
      apiSdk.bookApis.getAllBook({ limit: 10, offset: 0 }),
      apiSdk.bookApis.getBookById(id as string),
    ]);
    // const categories = await apiSdk.categoryApis.getAllCategory();
    store.dispatch(setCategories(categories));
    store.dispatch(setPublishers(publishers));
    store.dispatch(getAllBooks(books));
    store.dispatch(getBookById(bookDetail));
    return {
      props: {},
    };
  }
);
export default ProductDetails;
