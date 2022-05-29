import { useRouter } from 'next/router';
import React from 'react';
import TableWarpper from '../../../src/components/collections/TableWrapper';
import TransferList from '../../../src/components/collections/TransformList';
import { ROUTERS } from '../../../src/configs/navigators';
import { apiSdk } from '../../../src/libs/apis';
import { getServerSideWithProtectedRoute } from '../../../src/libs/hocs/getServerSideWithProtectedRoute';
import { getAllBlogs } from '../../../src/redux/blog';
import { getConfig } from '../../../src/redux/config';

const Blog: React.FC = () => {
  const router = useRouter();
  return (
    <TableWarpper
      name='Thể loại'
      isCreate
      onCreateClick={() => {
        router.push(ROUTERS.blogCreate.path);
      }}
    >
      <TransferList />
    </TableWarpper>
  );
};

export const getServerSideProps = getServerSideWithProtectedRoute(
  async (ctx, store) => {
    const [blog, config] = await Promise.all([
      apiSdk.blogApis.getAllBlog(),
      apiSdk.configApis.getConfig(),
    ]);

    store.dispatch(getAllBlogs(blog));
    store.dispatch(getConfig(config));
    return {
      props: {},
    };
  }
);

export default Blog;
