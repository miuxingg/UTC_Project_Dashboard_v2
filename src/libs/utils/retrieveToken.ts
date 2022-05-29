import { GetServerSidePropsContext } from 'next';

import { COOKIE_KEYS } from '../../configs';
import { apiSdk, givenowApi } from '../apis';
import { getCookies } from './cookies';
import { setToken } from './token';

export const retrieveToken = async (ctx: GetServerSidePropsContext | null) => {
  const cookies = getCookies(ctx);
  let access_token = cookies[COOKIE_KEYS.ACCESS_TOKEN];

  if (access_token) {
    givenowApi.authorize(access_token);
  }

  if (cookies[COOKIE_KEYS.REFRESH_TOKEN] && !access_token) {
    const token = await apiSdk.authApis.refreshToken(
      cookies[COOKIE_KEYS.REFRESH_TOKEN]
    );
    setToken(token, ctx);
    access_token = token.access_token;
    givenowApi.authorize(access_token);
  }
};
