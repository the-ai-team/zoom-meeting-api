import { AxiosInstance } from 'axios';
import {
  GetListMeetingRegistrantsParams,
  AddMeetingRegistratParams,
  UpdateRegistrantStatusParams,
} from '../interfaces/requests';
import { GetMeetingRegistrantListResponse, AddMeetingRegistrantResponse } from '../interfaces/responses';
import { logger } from '../utils/logger';

/**
 * Class for adding, updating and getting meeting registrants
 */
export class Registrants {
  private http: AxiosInstance;

  /**
   * Create a Registrants instance
   * @param {AxiosInstance} http - axios instance to handle requests with zoom api
   */
  constructor(http: AxiosInstance) {
    this.http = http;
  }

  /**
   * @async Get list of meeting registrants
   * @param {GetListMeetingRegistrantsParams} params - parameters requires to get a list of meeting registrants
   * @return {Promise<GetMeetingRegistrantListResponse>} - returns a list of meeting registrants or throws an error
   */
  async getListMeetingRegistrants(params: GetListMeetingRegistrantsParams): Promise<GetMeetingRegistrantListResponse> {
    try {
      logger().debug('Getting a registrants list', params);
      const response = await this.http.get<GetMeetingRegistrantListResponse>(
        `/meetings/${params.meetingId}/registrants`,
        {
          params: params.queryParams,
        },
      );

      if (response.status === 200) {
        logger().info('Getting meeting registrants successful', response.data);
        return response.data;
      }

      if (response.status === 300) {
        logger().error('Getting meeting registrants failed with an error code 300', response.data);
        throw new Error('Getting meeting registrants failed with an error code 300');
      }

      if (response.status === 400) {
        logger().error('Getting meeting registrants failed with an error code 400', response.data);
        throw new Error('Getting meeting registrats failed with an error code 400');
      }

      if (response.status === 404) {
        logger().error('Getting meeting registrants failed with an error code 404', response.data);
        throw new Error('Getting meeting registrants failed with an error code 404');
      }

      logger().error('Unexpected Beavior', response);
      throw new Error('Unexpected Behavior!');
    } catch (error) {
      throw error;
    }
  }

  /**
   * @async Add meeting registrant
   * @param {AddMeetingRegistratParams} params - parameters requires to add a meeting registrat
   * @return {Promise<AddMeetingRegistrantResponse>} - returns a meeting registrant or throws an error
   */
  async addMeetingRegistrant(params: AddMeetingRegistratParams): Promise<AddMeetingRegistrantResponse> {
    try {
      logger().debug('Adding Meeting Registrant', params);
      const response = await this.http.post<AddMeetingRegistrantResponse>(`/meetings/${params.meetingId}/registrants`, {
        params: { occurence_ids: params.occurence_ids },
        ...params.requestBody,
      });

      if (response.status === 201) {
        logger().info('Adding meeting registrant successful', response.data);
        return response.data;
      }

      if (response.status === 300) {
        logger().error('Meeting registrant addtion failed with an error code 300', response.data);
        throw new Error('Meeting registrant addtion failed with an error code 300');
      }

      if (response.status === 400) {
        logger().error('Meeting registrant addtion failed with an error code 400', response.data);
        throw new Error('Meeting registrant addtion failed with an error code 400');
      }

      if (response.status === 404) {
        logger().error('Meeting registrant addtion failed with an error code 404', response.data);
        throw new Error('Meeting registrant addtion failed with an error code 404');
      }

      logger().error('Unexpected Behavior', response);
      throw new Error('Unexpected behavior');
    } catch (error) {
      throw error;
    }
  }

  /**
   * @async updates meeting registrants status
   * @param {UpdateRegistrantStatusParams} params - parameters requires to update registrant statuses
   * @return {Promise<string>} - returns a success message or throws an error
   */
  async updateMeetingRegistrantsStatus(params: UpdateRegistrantStatusParams): Promise<string> {
    try {
      if (params.requestBody.registrants.length > 30) {
        logger().error('Maximum updatable registrant count exceeded');
        throw new Error('Maximum updatable registrant count exceeded');
      }

      logger().debug('Updating meeting registrants', params);
      const response = await this.http.put<string>(`/meetings/${params.meetingId}/registrants/status`, {
        params: { occurence_ids: params.occurrence_id },
        action: params.requestBody.action,
        registrants: params.requestBody.registrants,
      });

      if (response.status === 204) {
        logger().info('Updating meeting registrants successful', response.data);
        return response.data;
      }

      if (response.status === 300) {
        logger().error('Updating Registrants statuses failed with an error code 300', response.data);
        throw new Error('Updating Registrants statuses failed with an error code 300');
      }

      if (response.status === 400) {
        logger().error('Updating Registrants statuses failed with an error code 400', response.data);
        throw new Error('Updating Registrants statuses failed with an error code 400');
      }

      if (response.status === 404) {
        logger().error('Updating Registrants statuses failed with an error code 404', response.data);
        throw new Error('Updating Registrants statuses failed with an error code 404');
      }

      logger().error('Unexpected behavior', response);
      throw new Error('Unexpected Behavior!');
    } catch (error) {
      throw error;
    }
  }
}
