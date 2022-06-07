import React from 'react';
import { useDispatch } from 'react-redux';
import BlogForm from '../../../src/containers/BlogForm';
import { createBlog } from '../../../src/redux/blog';

const CreateBlogPage: React.FC = () => {
  const dispatch = useDispatch();
  const handleSubmit = (values: any) => {
    dispatch(
      createBlog({
        title: values.title,
        content: values.content,
        image: values.image,
      })
    );
  };
  return <BlogForm onSubmit={handleSubmit} />;
};

export default CreateBlogPage;
