import { CreateMeetingTypes } from '../constants';
import { MeetingSettings, Recurrence } from '../shared';

export interface CreateMeetingParams {
  hostId: string;
  bodyParams: {
    topic: string;
    type: CreateMeetingTypes;
    start_time: string;
    duration: number;
    schedule_for: string;
    timezone: string;
    password: string;
    agenda: string;
    recurrence?: Recurrence;
    settings: MeetingSettings;
  };
}
