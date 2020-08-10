import { UserType, UserVerificationType } from '../constants';

export interface User {
  id: string;
  first_name?: string;
  last_name?: string;
  email: string;
  type: UserType;
  status?: string;
  pmi?: string;
  timezone?: string;
  dept?: string;
  created_at?: string;
  last_login_time?: string;
  last_client_version?: string;
  group_ids?: string[];
  im_group_ids?: string[];
  verified?: UserVerificationType;
}
