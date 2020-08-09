import { CreateMeetingTypes } from '../constants';

export interface Meeting {
  uuid: string;
  id: number;
  host_id: string;
  topic: string;
  type: CreateMeetingTypes;
  start_time: string;
  duration: number;
  timezone: string;
  created_at: string;
  join_url: string;
  agenda: string;
}
