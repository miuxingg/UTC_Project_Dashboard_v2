import { combineReducers } from 'redux';

import authReducer from './auth';
import appReducer from './app';
import categoryReducer from './category';
import bookReducer from './product';
import publisherReducer from './publisher';
import orderReducer from './order';
import blogReducer from './blog';
import configReducer from './config';
import voucherReducer from './voucher';
import statisticReducer from './statistics';

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  category: categoryReducer,
  books: bookReducer,
  publisher: publisherReducer,
  order: orderReducer,
  blog: blogReducer,
  config: configReducer,
  voucher: voucherReducer,
  statistic: statisticReducer,
});

export default rootReducer;
