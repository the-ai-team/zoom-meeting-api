import { UpdatableRegistrantStatuses } from '../constants';

export interface UpdateRegistrantStatusParams {
  meetingId: number;
  occurrence_id?: string;
  requestBody: {
    action: UpdatableRegistrantStatuses;
    registrants: { id: string; email: string }[];
  };
}
