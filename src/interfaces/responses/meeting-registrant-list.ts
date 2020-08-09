import { Registrant } from '../shared';

export interface GetMeetingRegistrantListResponse {
  page_count: number;
  page_number: number;
  page_size: number;
  total_records: number;
  next_page_token: string;
  registrants: Registrant[];
}
