import { IBlogApi } from '../../../libs/apis/blog/types';

export const listBlog: IBlogApi[] = [
  { id: String(Math.random() * 10000), title: 'Title 1', content: 'Content 1' },
  { id: String(Math.random() * 10000), title: 'Title 2', content: 'Content 2' },
  { id: String(Math.random() * 10000), title: 'Title 3', content: 'Content 3' },
  { id: String(Math.random() * 10000), title: 'Title 4', content: 'Content 4' },
  { id: String(Math.random() * 10000), title: 'Title 5', content: 'Content 5' },
  { id: String(Math.random() * 10000), title: 'Title 6', content: 'Content 6' },
  { id: String(Math.random() * 10000), title: 'Title 7', content: 'Content 7' },
  { id: String(Math.random() * 10000), title: 'Title 8', content: 'Content 8' },
  { id: String(Math.random() * 10000), title: 'Title 9', content: 'Content 9' },
  {
    id: String(Math.random() * 10000),
    title: 'Title 10',
    content: 'Content 10',
  },
  {
    id: String(Math.random() * 10000),
    title: 'Title 11',
    content: 'Content 11',
  },
];
