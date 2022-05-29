import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next';
import { ParsedUrlQuery } from 'querystring';
import { AnyAction, Store } from 'redux';

import { TRootState } from '../redux';

type TWithReduxServerSideCallback<S, P> = (
  context: GetServerSidePropsContext<ParsedUrlQuery>,
  store: S
) => Promise<GetServerSidePropsResult<P>>;

export type TWithSSRFn<
  S extends Store<TRootState, AnyAction> = Store<TRootState, AnyAction>,
  P extends Record<string, unknown> = Record<string, unknown>
> = (
  cb: TWithReduxServerSideCallback<S, P>,
  redirectWhenLoggedIn?: boolean
) => GetServerSideProps<P, ParsedUrlQuery>;

export interface IPaginationOutput<T> {
  total: number;
  items: T[];
}

export interface IBaseQuery {
  limit?: number;
  offset?: number;
  search?: string;
}

export interface IDonateCampaignEventPayload {
  id: string;
  donate: number;
  ambassadorId?: string;
}

export interface ISearchFilter extends IBaseQuery {
  organization?: string;
  campaign?: string;
  beginDate?: Date;
  endDate?: Date;
}
