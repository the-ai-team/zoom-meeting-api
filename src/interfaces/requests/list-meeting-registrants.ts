import { RegistrantStatus } from '../constants';

export interface GetListMeetingRegistrantsParams {
  meetingId: number;
  queryParams?: {
    occurrence_id?: string;
    status?: RegistrantStatus;
    page_size?: number;
    page_number?: number;
    next_page_token?: string;
  };
}
