import { GetMeetingTypes } from '../constants';

export interface GetListMeetingsParams {
  userId: string;
  type?: GetMeetingTypes;
  pageSize?: number;
  nextPageToken?: string;
  pageNumber?: string;
}
