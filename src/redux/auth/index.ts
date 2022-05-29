import { createGenericSlice } from '../../libs/utils/createGenericSlice';
import {
  getProfile,
  loginLocal,
  logout,
  setEmployee,
  getEmployeeById,
  deleteAccountEmployee,
} from './action';
import { IAuthState } from './types';

const initialState: IAuthState = {};

const slice = createGenericSlice({
  name: 'auth',
  initialState,
  reducers: {
    authorized(state) {
      state.isAuthenticated = true;
    },
    getEmployee(state, action) {
      state.employee = action.payload;
    },

    employeeById(state, action) {
      state.employeeById = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginLocal.fulfilled, (state) => {
      state.isAuthenticated = true;
    });

    builder.addCase(logout.fulfilled, (state) => {
      state.isAuthenticated = false;
      window?.location?.replace('/login');
    });

    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
    });

    builder.addCase(setEmployee.fulfilled, (state, action) => {
      state.employee = action.payload;
    });

    builder.addCase(getEmployeeById.fulfilled, (state, action) => {
      state.employeeById = action.payload;
    });

    builder.addCase(deleteAccountEmployee.fulfilled, (state, action) => {
      state.employee = {
        total: state?.employee?.total - 1 ?? 0,
        items: state?.employee?.items.filter((item) => {
          return item.id !== action.payload.id;
        }),
      };
    });
  },
});

export const { authorized, getEmployee, employeeById } = slice.actions;
export default slice.reducer;
