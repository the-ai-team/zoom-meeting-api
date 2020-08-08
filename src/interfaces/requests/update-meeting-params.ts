import { CreateMeetingTypes } from '../constants';
import { Recurrence, MeetingSettings } from '../shared';

export interface UpdateMeetingParams {
  meetingId: string;
  queryParams?: {
    occurrence_id?: string;
  };
  bodyParams: {
    scheduled_for?: string;
    topic?: string;
    type?: CreateMeetingTypes;
    start_time?: string;
    duration?: number;
    timezone?: string;
    password?: string;
    agenda?: string;
    tracking_fileds?: { filed: string; value: string }[];
    recurrence?: Recurrence;
    settings?: MeetingSettings;
  };
}
