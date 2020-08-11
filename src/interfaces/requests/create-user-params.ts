import { CreateUserActions, UserType } from '../constants';

export interface CreateUserParams {
  action: CreateUserActions;
  email: string;
  type: UserType;
  first_name?: string;
  last_name?: string;
  password?: string;
}
