import { Meeting } from '.';

export interface GetListMeetingsResponse {
  page_count: number;
  page_number: number;
  page_size: number;
  total_records: number;
  next_page_token: string;
  meetings: Meeting[];
}
