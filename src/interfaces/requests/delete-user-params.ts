import { DeleteUserActions } from '../constants';

export interface DeleteUserParams {
  userId: string;
  queryParams?: {
    action?: DeleteUserActions;
    transfer_email?: string;
    transfer_meeting?: boolean;
    transfer_webinar?: boolean;
    transfer_recording?: boolean;
  };
}
