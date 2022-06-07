import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BlogForm from '../../../src/containers/BlogForm';
import { apiSdk } from '../../../src/libs/apis';
import { getServerSideWithProtectedRoute } from '../../../src/libs/hocs/getServerSideWithProtectedRoute';
import { getBlogById, updateBlog } from '../../../src/redux/blog';
import { currentBlogSelector } from '../../../src/redux/blog/selectors';

const UpdateBlog: NextPage = () => {
  const router = useRouter();
  const currentBlog = useSelector(currentBlogSelector);
  const dispatch = useDispatch();
  const handleSubmit = (values: any) => {
    console.log(values);
    dispatch(
      updateBlog({
        id: currentBlog.id,
        input: {
          title: values.title,
          content: values.content,
          image: values.image,
        },
      })
    );
    router.back();
  };
  return (
    <BlogForm
      onSubmit={handleSubmit}
      initialValues={{
        title: currentBlog?.title || '',
        content: currentBlog?.content || '',
        image: currentBlog?.image || '',
      }}
    />
  );
};

export const getServerSideProps = getServerSideWithProtectedRoute(
  async (ctx, store) => {
    const { id } = ctx.query;
    const blog = await apiSdk.blogApis.getBlogById(id as string);
    store.dispatch(getBlogById(blog));

    return {
      props: {},
    };
  }
);
export default UpdateBlog;
