import {
  ActionReducerMapBuilder,
  createSlice,
  Slice,
  SliceCaseReducers,
  ValidateSliceCaseReducers,
} from '@reduxjs/toolkit';
import { NoInfer } from '@reduxjs/toolkit/dist/tsHelpers';
import { HYDRATE } from 'next-redux-wrapper';

interface IParam<
  State,
  CaseReducers extends SliceCaseReducers<State> = SliceCaseReducers<State>
> {
  name: string;
  initialState: State;
  reducers: ValidateSliceCaseReducers<State, CaseReducers>;
  extraReducers?: (builder: ActionReducerMapBuilder<NoInfer<State>>) => void;
}

export function createGenericSlice<
  State,
  CaseReducers extends SliceCaseReducers<State> = SliceCaseReducers<State>
>({
  name,
  initialState,
  reducers,
  extraReducers,
}: IParam<State, CaseReducers>): Slice<State, CaseReducers, string> {
  return createSlice({
    name,
    initialState,
    reducers,
    extraReducers: (builder) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      builder.addCase(HYDRATE, (state: any, action: any) => {
        return {
          ...state,
          ...action.payload[name],
        };
      });

      if (extraReducers) {
        extraReducers(builder);
      }
    },
  });
}
