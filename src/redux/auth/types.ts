import { IPaginationOutput } from '../../configs/types';
import { IEmployee, IProfile } from '../../libs/apis/auth/types';

export interface IAuthState {
  isAuthenticated?: boolean;
  profile?: IProfile;
  employee?: IPaginationOutput<IEmployee>;
  employeeById?: IEmployee;
}
