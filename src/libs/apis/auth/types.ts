// import { ORGANIZATION_ROLES, SYSTEM_ROLES } from '@givenow/consts';

export interface IAuthLocal {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface IAuthenticated {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  refresh_expires_in: number;
}

export interface IProfile {
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  avatar?: string;
  roles?: string;
}

export interface IEmployee {
  id: string;
  email: string;
  roles: string;
  firstName: string;
  lastName: string;
}

export interface IEmployeeCreare {
  email: string;
  firstName: string;
  lastName: string;
  roles: string;
}
