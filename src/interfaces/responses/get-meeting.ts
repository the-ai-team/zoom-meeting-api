import { Meeting } from '../shared/meeting';
import { MeetingSettings } from '../shared';

export interface GetMeetingResponse extends Meeting {
  status: string;
  start_url: string;
  password: string;
  tracking_fields: { filed: string; value: string }[];
  settings: MeetingSettings;
}
