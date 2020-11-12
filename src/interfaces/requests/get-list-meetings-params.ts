import { GetMeetingTypes } from '../constants';

export interface GetListMeetingsParams {
  userId: string;
  type?: GetMeetingTypes;
  page_size?: number;
  next_page_token?: string;
  page_number?: string;
}
