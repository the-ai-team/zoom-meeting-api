export interface CreateMeetingResponse {
  id: number;
  topic: string;
  type: number;
  start_time: string;
  duration: number;
  created_at: string;
  start_url: string;
  join_url: string;
  status: string;
  host_id: string;
  settings: any;
  timezone: string;
  uuid: string;
}
