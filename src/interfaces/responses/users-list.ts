import { User } from '../shared';

export interface GetUsersListResponse {
  page_count: number;
  page_number: number;
  page_size: number;
  total_records: number;
  users: User[];
}
