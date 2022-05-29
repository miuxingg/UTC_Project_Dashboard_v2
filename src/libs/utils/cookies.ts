import { CookieSerializeOptions } from 'cookie';
import { NextPageContext } from 'next';
import nookies from 'nookies';

import { COOKIE_KEYS } from '../../configs';

export type TCookieResCtx = Pick<NextPageContext, 'res'>;
export type TCookieReqCtx = Pick<NextPageContext, 'req'>;

export const setCookie = (
  ctx: TCookieResCtx | null,
  name: COOKIE_KEYS,
  value: string,
  options?: CookieSerializeOptions
): void => {
  nookies.set(ctx, name, value, options);
};

export const getCookies = (
  ctx: TCookieReqCtx | null
): Record<string, string> => {
  return nookies.get(ctx);
};

export const removeCookie = (
  name: COOKIE_KEYS,
  ctx: TCookieResCtx | null = null,
  options?: CookieSerializeOptions
): void => {
  nookies.destroy(ctx, name, options);
};
