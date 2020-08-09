import { Registrant } from '../shared';

export interface AddMeetingRegistratParams {
  meetingId: number;
  occurence_ids?: string;
  requestBody: Registrant;
}
