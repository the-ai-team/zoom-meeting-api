import { AxiosInstance } from 'axios';
import {
  GetUsersListParams,
  CreateUserParams,
  DeleteUserParams,
  LoginTypes,
  GetUsersListResponse,
  CheckEmail,
  User,
} from '../interfaces';
import { logger } from '../utils/logger';

/**
 * Class to get list users
 * Check user availability in the account
 * Get, update, create, delete a user
 */
export class Users {
  private http: AxiosInstance;

  /**
   * Create a Users instance
   * @param {AxiosInstance} http - axios instance to handle requests with zoom api
   * @member getListUsers
   * @member createUser
   * @member getUser
   * @member checkUserEmail
   */
  constructor(http: AxiosInstance) {
    this.http = http;
  }

  /**
   * @async
   * Get List of users
   * @param {GetUsersListParams} params
   * @returns {Promise<GetUsersListResponse>} - returns a list of users or throws an error
   */
  async getListUsers(params: GetUsersListParams): Promise<GetUsersListResponse> {
    try {
      logger().debug('Getting users list.', params);
      const response = await this.http.get<GetUsersListResponse>('/users', { params });

      if (response.status === 200) {
        logger().info('Getting users list successful', response.data);
        return response.data;
      }

      logger().error('Unexpected behavior', response.data);
      throw new Error('Unexpected behavior');
    } catch (error) {
      throw error;
    }
  }

  /**
   * @async
   * Create a user
   * @param {CreateUserParams} params
   * @returns {Promise<User>} - returns a user or throws an error
   */
  async createUser(params: CreateUserParams): Promise<User> {
    try {
      logger().debug('Creating User', params);
      const response = await this.http.post<User>('/users', params);

      if (response.status === 201) {
        logger().debug('Creating user successful', response.data);
        return response.data;
      }

      if (response.status === 400) {
        logger().error('Creating user failed with an error code 400', response.data);
        throw new Error('Creating user failed with an error code 400');
      }

      if (response.status === 404) {
        logger().error('Creating user failed with an error code 404', response.data);
        throw new Error('Creating user failed with an error code 404');
      }

      if (response.status === 409) {
        logger().error('Creating user failed with an error code 409', response.data);
        throw new Error('Creating user failed with an error code 409');
      }

      logger().error('Unexpected bahavior', response.data);
      throw new Error('Unexpected Behavior');
    } catch (error) {
      throw error;
    }
  }

  /**
   * @async
   * get a user
   * @param {string} userId
   * @param {LoginTypes} loginType
   * @returns {Promise<User>} - returs a user object or throws an error
   */
  async getUser(userId: string, loginType?: LoginTypes): Promise<User> {
    try {
      logger().debug('Getting a user', `UserId: ${userId}, login_type: ${loginType}`);
      const response = await this.http.get<User>(`/users/${userId}`, { params: { login_type: loginType } });

      if (response.status === 200) {
        logger().info('Getting user successful', response.data);
        return response.data;
      }

      if (response.status === 400) {
        logger().error('Getting user failed with an error code 400', response.data);
        throw new Error('Getting user failed with an error code 400');
      }

      if (response.status === 404) {
        logger().error('Getting user failed with an error code 404', response.data);
        throw new Error('Getting user failed with an error code 404');
      }

      logger().error('Unexpected Behavior', response.data);
      throw new Error('Unexpected Behavior');
    } catch (error) {
      throw error;
    }
  }

  /**
   * @async
   * check whether the user email in the account or not
   * @param {string} email
   * @returns {Promise<CheckEmail>} - returns an object with boolean or throws an error
   */
  async checkUserEmail(email: string): Promise<CheckEmail> {
    try {
      logger().debug('Checking a user email', email);
      const response = await this.http.get<CheckEmail>('/users/email', { params: { email } });

      if (response.status === 200) {
        logger().info('Checking email success', response.data);
        return response.data;
      }

      if (response.status === 300) {
        logger().error('Checking email failed with an error code 300', response.data);
        throw new Error('Checking email failed with an error code 300');
      }

      if (response.status === 400) {
        logger().error('Checking email failed with an error code 400', response.data);
        throw new Error('Checking email failed with an error code 400');
      }

      if (response.status === 404) {
        logger().error('Checking email failed with an error code 404', response.data);
        throw new Error('Checking email failed with an error code 404');
      }

      logger().error('Unexpected behavior', response.data);
      throw new Error('Unexpected behavior');
    } catch (error) {
      throw error;
    }
  }

  /**
   * @async
   * Delete zoom user
   * @param {DeleteUserParams} params
   * @returns {Promise<string>} - returns an success message or throws an error
   */
  async deleteUser(params: DeleteUserParams): Promise<string> {
    try {
      logger().debug('Deleting user', params);
      const response = await this.http.delete<string>(`/users/${params.userId}`, { params: params.queryParams });

      if (response.status === 204) {
        logger().info('User deleted successfully', response.data);
        return response.data;
      }

      if (response.status === 400) {
        logger().info('User deletion faild with an error code 400', response.data);
        throw new Error('User deletion faild with an error code 400');
      }

      if (response.status === 404) {
        logger().info('User deletion faild with an error code 404', response.data);
        throw new Error('User deletion faild with an error code 404');
      }

      logger().error('Unexpected behaviour', response.data);
      throw new Error('Unexpected behavior');
    } catch (error) {
      throw error;
    }
  }
}
