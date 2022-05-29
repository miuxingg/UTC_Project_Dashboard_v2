import { COOKIE_KEYS } from '../../configs';
import { IAuthenticated } from '../apis/auth/types';
import { removeCookie, setCookie, TCookieResCtx } from './cookies';

export const setToken = (
  token: IAuthenticated,
  ctx: TCookieResCtx | null = null
): void => {
  setCookie(ctx, COOKIE_KEYS.ACCESS_TOKEN, token.access_token || '', {
    expires: new Date(Date.now() + Number(token.expires_in)),
  });
  setCookie(ctx, COOKIE_KEYS.REFRESH_TOKEN, token.refresh_token || '', {
    expires: new Date(Date.now() + Number(token.refresh_expires_in) * 1000),
  });
};

export const removeToken = (): void => {
  removeCookie(COOKIE_KEYS.ACCESS_TOKEN);
  removeCookie(COOKIE_KEYS.REFRESH_TOKEN);
};
