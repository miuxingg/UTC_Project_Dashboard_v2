import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

import { API_BASE_URL, COOKIE_KEYS, HTTP_STATUS } from '../../configs';
import { ROUTERS } from '../../configs/navigators';
import { getCookies, removeCookie } from '../utils/cookies';
import { AuthApi } from './auth';
import { BlogApi } from './blog';
import { CategoryApi } from './category';
import { ConfigApi } from './config';
import { OrderApi } from './order';
import { BookApi } from './product';
import { PublisherApi } from './publisher';
import { StatisticApi } from './statistics';
import { VoucherApi } from './voucher';

class GivenowApi {
  instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: API_BASE_URL,
    });

    this.instance.interceptors.request.use(
      this.onRequestFullFilled,
      this.onRequestReject
    );

    this.instance.interceptors.response.use(
      this.onResponseFullFilled,
      this.onResponseReject
    );
  }

  onResponseFullFilled = (response: AxiosResponse): AxiosResponse => {
    return response;
  };
  onResponseReject = (error: AxiosError) => {
    if (error.response) {
      switch (error.response?.status) {
        case HTTP_STATUS.UNAUTHORIZED: // refresh token or sign-out
          removeCookie(COOKIE_KEYS.ACCESS_TOKEN, null);
          removeCookie(COOKIE_KEYS.REFRESH_TOKEN, null);
          if (process.browser) window?.location.replace(ROUTERS.login.path);
          break;
        case HTTP_STATUS.FORBIDDEN: // navigate to page 403
          break;
        default:
          throw {
            statusCode: error.response.status,
            message: this.getErrorMessage(error),
          };
      }
    } else {
      throw error;
    }
  };

  onRequestFullFilled = (config: AxiosRequestConfig): AxiosRequestConfig => {
    if (config.headers?.['Authorization']?.length) {
      return config;
    }

    const cookies = getCookies(null);
    if (cookies && cookies[COOKIE_KEYS.ACCESS_TOKEN]) {
      const bearerToken = `Bearer ${cookies[COOKIE_KEYS.ACCESS_TOKEN]}`;
      config.headers = {
        ...config.headers,
        Authorization: bearerToken,
      };
    }

    return config;
  };
  onRequestReject = (error: unknown) => {
    return Promise.reject(error);
  };

  getErrorMessage = (error: AxiosError) => {
    if (error.response && error.response.data) {
      if (Array.isArray(error.response.data.message)) {
        return error.response.data.message[0];
      }
      return error.response.data.message;
    }
    return 'An error has occurred, please try again';
  };

  authorize = (token: string) => {
    this.instance.interceptors.request.use((config) => {
      config.headers = {
        ...(config.headers ?? {}),
        Authorization: `Bearer ${token}`,
      };
      return config;
    });
  };
}
const givenowApi = new GivenowApi();
const { instance } = givenowApi;

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace apiSdk {
  export const authApis = new AuthApi(instance);
  export const categoryApis = new CategoryApi(instance);
  export const bookApis = new BookApi(instance);
  export const publisherApis = new PublisherApi(instance);
  export const orderApis = new OrderApi(instance);
  export const blogApis = new BlogApi(instance);
  export const configApis = new ConfigApi(instance);
  export const voucherApis = new VoucherApi(instance);
  export const statisticsApis = new StatisticApi(instance);
}

export { givenowApi };
export const apiInstance: AxiosInstance = instance;
