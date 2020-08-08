import { AxiosInstance } from 'axios';
import {
  CreateMeetingParams,
  GetListMeetingsParams,
  GetMeetingParams,
  UpdateMeetingParams,
} from '../interfaces/requests';
import { CreateMeetingResponse, GetListMeetingsResponse } from '../interfaces/responses';
import { GetMeetingTypes } from '../interfaces/constants';
import { GetMeetingResponse } from '../interfaces/responses/get-meeting';

/**
 * Class for creating, reading, updating and deleting zoom meetings
 */
export class Meetings {
  private http: AxiosInstance;

  /**
   * Creatte a Meeting Instance
   * @param {AxiosInstance} http - axios instance to handle requests with zoom api
   */
  constructor(http: AxiosInstance) {
    this.http = http;
  }

  /**
   * @async Get meeting list
   * @param {GetListMeetingsParams} params - parameters requires to get a list of meetings
   * @return {Promise<GetListMeetingsResponse>} - renurns a meeting list or throwes an error
   */
  async getListMeetings(params: GetListMeetingsParams): Promise<GetListMeetingsResponse> {
    try {
      if ((!!params.pageSize && params.pageSize > 300) || (params.pageSize && params.pageSize < 1)) {
        throw new Error('Keep your page size parameter between 1 - 300');
      }

      const response = await this.http.get<GetListMeetingsResponse>(`/users/${params.userId}/meetings`, {
        params: {
          type: params.type ? params.type : GetMeetingTypes.Live,
          page_size: params.pageSize ? params.pageSize : 30,
          next_page_token: params.nextPageToken,
          page_number: params.pageNumber,
        },
      });

      if (response.status === 200) {
        return response.data;
      }

      if (response.status === 404) {
        throw new Error('User id not found');
      }

      throw new Error('Unexpected behavior!');
    } catch (error) {
      throw error;
    }
  }

  /**
   * @async Create meeting
   * @param {CreateMeetingParams} params - params requires to create a meeting
   * @returns {promise<CreateMeetingResponse>} - returns the created meeting object or throws an error
   */
  async createMeeting(params: CreateMeetingParams): Promise<CreateMeetingResponse> {
    try {
      const response = await this.http.post<CreateMeetingResponse>(`/users/${params.hostId}/meetings`, {
        ...params.bodyParams,
      });

      if (response.status === 201) {
        return response.data;
      }

      if (response.status === 300) {
        throw new Error(
          'Invalid enforce_login_domains, separate multiple domains by semicolon.\n A maximum of {rateLimitNumber} meetings can be created/updated for a single user in one day.',
        );
      }

      if (response.status === 404) {
        throw new Error('User or user id not found');
      }

      throw new Error('Unexpected behavior!');
    } catch (error) {
      throw error;
    }
  }

  /**
   * @async Get specific meeting
   * @param {GetMeetingParams} params - params requires to get a meeting
   * @returns {promise<GetMeetingResponse>} - returns the requested meeting or throws an error
   */
  async getMeeting(params: GetMeetingParams): Promise<GetMeetingResponse> {
    try {
      const response = await this.http.get<GetMeetingResponse>(`/meetings/${params.meetingId}`, {
        params: { occurrence_id: params.occurrence_id, show_previous_occurrences: params.show_previous_occurrences },
      });

      if (response.status === 200) {
        return response.data;
      }

      if (response.status === 400) {
        throw new Error(`User not fountd on this account ${params.meetingId}, or cannot access webinar info`);
      }

      if (response.status === 404) {
        throw new Error('Meeting not found or \n User not exist or \n meeting is not found or has expired');
      }

      throw new Error('Unexpected Behavior');
    } catch (error) {
      throw error;
    }
  }

  /**
   * @async Update meeting
   * @param {UpdateMeetingParams} params - params requires to update a meeting
   * @returns {promise<string>} - returns a message of success or throws an error
   */
  async updateMeeting(params: UpdateMeetingParams): Promise<string> {
    try {
      const response = await this.http.patch<string>(`/meetings/${params.meetingId}`, {
        ...params.bodyParams,
        params: {
          occurrence_id: params.queryParams?.occurrence_id,
        },
      });

      if (response.status === 204) {
        return response.data as string;
      }

      if (response.status === 300) {
        throw new Error('Update failde with status code 300');
      }

      if (response.status === 400) {
        throw new Error('Update failed with status code 400');
      }

      if (response.status === 404) {
        throw new Error('Update failde with status code 404');
      }

      throw new Error('Unexpected behavior!');
    } catch (error) {
      throw error;
    }
  }

  /**
   * @async Updates Meeting Status
   * @param {number} meetingId - the meeting id of the meeting to be updated
   * @param {string} action - action of the meeting status
   * @returns {promise<string>} - returns an success message or throws an error
   */
  async updateMeetingStatus(meetingId: number, action = 'end'): Promise<string> {
    try {
      const response = await this.http.put<string>(`/meetings/${meetingId}/status`, {
        action,
      });

      if (response.status === 204) {
        return response.data;
      }

      if (response.status === 400) {
        throw new Error('Meeting status update failed with error code 400');
      }

      if (response.status === 404) {
        throw new Error('Meeting status update failde with errer code 404');
      }

      throw new Error('Unexpected Behavior!');
    } catch (error) {
      throw error;
    }
  }

  /**
   * @async Delete a meeting
   * @param {number} meetingId - the id of the meeting to be deleted
   * @param {string} occurrenceId
   * @param {boolean} scheduleForReminder
   * @returns {promise<string>} - returns a success message or throws an error
   */
  async deleteMeeting(meetingId: number, occurrenceId?: string, scheduleForReminder?: boolean): Promise<string> {
    try {
      const response = await this.http.delete<string>(`/meetings/${meetingId}`, {
        params: { occurrence_id: occurrenceId, schedule_for_reminder: scheduleForReminder },
      });

      if (response.status === 204) {
        return response.data;
      }

      if (response.status === 400) {
        throw new Error('Meeting Deletion failed with an errer code 400');
      }

      if (response.status === 404) {
        throw new Error('Meeting Deletion failed with an error code 404');
      }

      throw new Error('Unexpected Behavior!');
    } catch (error) {
      throw error;
    }
  }
}
