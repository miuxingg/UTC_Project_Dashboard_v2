import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { COOKIE_KEYS } from '../configs';
import { getCookies } from '../libs/utils/cookies';
// import { Layout } from '../components/templates';
import { authorized } from '../redux/auth';
import { getProfile } from '../redux/auth/action';
import { authSelector } from '../redux/auth/selectors';
// import { fetchNotifications } from '../redux/notification';

export const AuthContainer = React.memo(function AuthContainer({ children }) {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(authSelector);

  // const isPublicRoutes = useMemo(() => {
  //   return Object.values(ROUTERS).some(
  //     ({ path, protect }) => !protect && path === router.pathname,
  //   );
  // }, [router.pathname]);

  useEffect(() => {
    const cookies = getCookies(null);
    if (cookies[COOKIE_KEYS.ACCESS_TOKEN]) {
      dispatch(authorized());
    }
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getProfile());
      // dispatch(fetchNotifications());
    }
  }, [dispatch, isAuthenticated]);

  // const isServer = !process.browser;

  // if (!isServer && !isAuthenticated && !isPublicRoutes)
  //   router.push(`${ROUTERS.login.path}?redirect_uri=${router.asPath}`);

  // if (!isServer && isAuthenticated && isPublicRoutes)
  //   router.push((router.query.redirect_uri as string) ?? ROUTERS.home.path);

  return <>{children}</>;
});
