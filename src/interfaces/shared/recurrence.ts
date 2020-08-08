import { RucurrenceTypes, Days, WeeksOfMonth } from '../constants';

export interface Recurrence {
  type: RucurrenceTypes;
  repeat_interval?: number;
  weekly_days?: Days;
  monthly_day?: number;
  monthly_week?: WeeksOfMonth;
  monthly_week_day?: Days;
  end_times?: number;
  end_date_time?: string;
}
