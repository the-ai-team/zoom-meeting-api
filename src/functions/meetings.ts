import { AxiosInstance } from 'axios';
import {
  CreateMeetingParams,
  GetListMeetingsParams,
  GetMeetingParams,
  UpdateMeetingParams,
  CreateMeetingResponse,
  GetListMeetingsResponse,
  GetMeetingTypes,
  GetMeetingResponse,
} from '../interfaces';
import { logger } from '../utils/logger';

/**
 * Class for creating, reading, updating and deleting zoom meetings
 */
export class Meetings {
  private http: AxiosInstance;

  /**
   * Create a Meeting Instance
   * @param {AxiosInstance} http - axios instance to handle requests with zoom api
   * @member getListMeetings
   * @member createMeeting
   * @member updateMeeting
   * @member getMeeting
   * @member updateMeeting
   * @member updateMeetingStatus
   * @member deleteMeeting
   */
  constructor(http: AxiosInstance) {
    this.http = http;
  }

  /**
   * @async
   * Get meeting list
   * @param {GetListMeetingsParams} params - parameters requires to get a list of meetings
   * @returns {Promise<GetListMeetingsResponse>} - returns a meeting list or throwes an error
   */
  async getListMeetings(params: GetListMeetingsParams): Promise<GetListMeetingsResponse> {
    try {
      if ((!!params.pageSize && params.pageSize > 300) || (params.pageSize && params.pageSize < 1)) {
        logger().error('Page size should be between 1 - 300');
        throw new Error('Keep your page size parameter between 1 - 300');
      }

      logger().debug('Getting meeting list', params);
      const response = await this.http.get<GetListMeetingsResponse>(`/users/${params.userId}/meetings`, {
        params: {
          type: params.type ? params.type : GetMeetingTypes.Live,
          page_size: params.pageSize ? params.pageSize : 30,
          next_page_token: params.nextPageToken,
          page_number: params.pageNumber,
        },
      });

      if (response.status === 200) {
        logger().info('Get list meeting response', response.data);
        return response.data;
      }

      if (response.status === 404) {
        logger().error('Getting meeting list faild with an error code 404', response.data);
        throw new Error('Getting meeting list failed with an error code 404');
      }

      logger().error('Unexpecetd behavior', response.data);
      throw new Error('Unexpected behavior!');
    } catch (error) {
      throw error;
    }
  }

  /**
   * @async
   * Create meeting
   * @param {CreateMeetingParams} params - params requires to create a meeting
   * @returnss {promise<CreateMeetingResponse>} - returns the created meeting object or throws an error
   */
  async createMeeting(params: CreateMeetingParams): Promise<CreateMeetingResponse> {
    try {
      logger().debug('Creating meeting', params);
      const response = await this.http.post<CreateMeetingResponse>(`/users/${params.hostId}/meetings`, {
        ...params.bodyParams,
      });

      if (response.status === 201) {
        logger().info('Create meeting respnose', response.data);
        return response.data;
      }

      if (response.status === 300) {
        logger().error('Meeting creation failed with an error code 300', response.data);
        throw new Error('Meeting creation failed with an error code 300');
      }

      if (response.status === 404) {
        logger().error('Meeting creation failed with an error code 404', response.data);
        throw new Error('Meeting creations failed with an error code 404');
      }

      logger().error('Unexpected bahavior', response.data);
      throw new Error('Unexpected behavior!');
    } catch (error) {
      throw error;
    }
  }

  /**
   * @async
   * Get specific meeting
   * @param {GetMeetingParams} params - params requires to get a meeting
   * @returnss {promise<GetMeetingResponse>} - returns the requested meeting or throws an error
   */
  async getMeeting(params: GetMeetingParams): Promise<GetMeetingResponse> {
    try {
      logger().debug('Getting a meeting', params);
      const response = await this.http.get<GetMeetingResponse>(`/meetings/${params.meetingId}`, {
        params: { occurrence_id: params.occurrence_id, show_previous_occurrences: params.show_previous_occurrences },
      });

      if (response.status === 200) {
        logger().info('Meeting getting success', response.data);
        return response.data;
      }

      if (response.status === 400) {
        logger().error('Getting meeting failed with an error code  400', response.data);
        throw new Error('Getting user failed with an error code  400');
      }

      if (response.status === 404) {
        logger().error('Getting meeting failed with an error code 404', response.data);
        throw new Error('Meeting not found or \n User not exist or \n meeting is not found or has expired');
      }

      logger().error('Unexpected bahavior', response.data);
      throw new Error('Unexpected Behavior');
    } catch (error) {
      throw error;
    }
  }

  /**
   * @async
   * Update meeting
   * @param {UpdateMeetingParams} params - params requires to update a meeting
   * @returnss {promise<string>} - returns a message of success or throws an error
   */
  async updateMeeting(params: UpdateMeetingParams): Promise<string> {
    try {
      logger().debug('Updating meeting', params);
      const response = await this.http.patch<string>(`/meetings/${params.meetingId}`, {
        ...params.bodyParams,
        params: {
          occurrence_id: params.queryParams && params.queryParams.occurrence_id ? params.queryParams.occurrence_id : '',
        },
      });

      if (response.status === 204) {
        logger().info('Updating meeting success', response.data);
        return response.data as string;
      }

      if (response.status === 300) {
        logger().error('Meeting updation faild with an error code 300', response.data);
        throw new Error('Update failde with status code 300');
      }

      if (response.status === 400) {
        logger().error('Meeting updation failid with an error code 400');
        throw new Error('Update failed with status code 400');
      }

      if (response.status === 404) {
        logger().error('meeting updation failed with an error code 404', response.data);
        throw new Error('Update failde with status code 404');
      }

      logger().error('Unexpected behavior', response.data);
      throw new Error('Unexpected behavior!');
    } catch (error) {
      throw error;
    }
  }

  /**
   * @async
   * Updates Meeting Status
   * @param {number} meetingId - the meeting id of the meeting to be updated
   * @param {string} action - action of the meeting status
   * @returnss {promise<string>} - returns an success message or throws an error
   */
  async updateMeetingStatus(meetingId: number, action = 'end'): Promise<string> {
    try {
      logger().info('Updating meeting status', meetingId, action);
      const response = await this.http.put<string>(`/meetings/${meetingId}/status`, {
        action,
      });

      if (response.status === 204) {
        logger().info('Update meeting status success', response.data);
        return response.data;
      }

      if (response.status === 400) {
        logger().error('Update meeting status failed with an errer code 400', response.data);
        throw new Error('Meeting status update failed with error code 400');
      }

      if (response.status === 404) {
        logger().error('Update meeting satus failed with ane error code 404', response.data);
        throw new Error('Meeting status update failde with errer code 404');
      }

      logger().error('Unexpected Behavior', response.data);
      throw new Error('Unexpected Behavior!');
    } catch (error) {
      throw error;
    }
  }

  /**
   * @async
   * Delete a meeting
   * @param {number} meetingId - the id of the meeting to be deleted
   * @param {string} occurrenceId
   * @param {boolean} scheduleForReminder
   * @returnss {promise<string>} - returns a success message or throws an error
   */
  async deleteMeeting(meetingId: number, occurrenceId?: string, scheduleForReminder?: boolean): Promise<string> {
    try {
      logger().debug('Deleting a meeting', meetingId, occurrenceId, scheduleForReminder);
      const response = await this.http.delete<string>(`/meetings/${meetingId}`, {
        params: { occurrence_id: occurrenceId, schedule_for_reminder: scheduleForReminder },
      });

      if (response.status === 204) {
        logger().info('Meeting deletion successful', response.data);
        return response.data;
      }

      if (response.status === 400) {
        logger().error('Meeting deletion failed with an error code 400', response.data);
        throw new Error('Meeting Deletion failed with an errer code 400');
      }

      if (response.status === 404) {
        logger().error('Meeting deletion failed with an error code 404', response.data);
        throw new Error('Meeting Deletion failed with an error code 404');
      }

      logger().error('Unexpected behavior', response.data);
      throw new Error('Unexpected Behavior!');
    } catch (error) {
      throw error;
    }
  }
}
