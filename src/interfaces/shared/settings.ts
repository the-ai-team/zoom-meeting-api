import { ApprovalTypes, RecordingTypes } from '../constants';

export interface MeetingSettings {
  host_video?: boolean;
  participant_video?: boolean;
  cn_meeting?: boolean;
  in_meeting?: boolean;
  join_before_host?: boolean;
  mute_upon_entry?: boolean;
  watermark?: boolean;
  use_pmi?: boolean;
  approval_type?: ApprovalTypes;
  registration_type?: number;
  audio?: string;
  auto_recording?: RecordingTypes;
  enforce_login?: boolean;
  enforce_login_domains?: string;
  alternative_hosts?: string;
  global_dial_in_countries?: string[];
  registrants_email_notification?: boolean;
  meeting_authentication?: boolean;
  waiting_room?: boolean;
}
