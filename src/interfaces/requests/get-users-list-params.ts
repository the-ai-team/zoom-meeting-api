import { RegistrantStatus } from '../constants';

export interface GetUsersListParams {
  status?: RegistrantStatus;
  page_size?: number;
  role_id?: string;
  page_number?: string;
}
