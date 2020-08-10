import axios, { AxiosInstance } from 'axios';
import * as jwt from 'jsonwebtoken';
import { Meetings } from './functions/meetings';
import { Registrants } from './functions/registrants';
import { logger } from './utils/logger';
import { Users } from './functions/users';

/**
 * Zoom Meeting Api
 */
export class ZoomMeetingAPI {
  private _axiosInstance?: AxiosInstance;
  private zoomToken: string;
  private zoomIss: string;

  /**
   * @member {Meetings} meetingFunctions - configuerd instance of meetingFunctions
   * @member {Registrants} registrantFunctions - configured instance of registrantFunctions
   * @member {Users} usersFunctions - configured instance of usersFunctions
   */
  meetingFunctions: Meetings;
  registrantFunctions: Registrants;
  usersFunctions: Users;

  /**
   * Create a zoom jwt app and get your credentials
   * @param {string} APISectret - zoom api secret
   * @param {string} apiKey - zoom api key
   * @param {number} logLevel - value should be from 0-4
   */
  constructor(APISectret: string, apiKey: string, logLevel = 0) {
    this.zoomIss = apiKey;
    this.zoomToken = APISectret;

    this.meetingFunctions = new Meetings(this.http);
    this.registrantFunctions = new Registrants(this.http);
    this.usersFunctions = new Users(this.http);

    logger().setLogLevel(logLevel);
  }

  private get http() {
    if (!this._axiosInstance) {
      const payload = {
        iss: this.zoomIss,
        exp: new Date().getTime() + 1000 * 60,
      };

      const token = jwt.sign(payload, this.zoomToken);
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
      this._axiosInstance = axios.create({
        baseURL: 'https://api.zoom.us/v2',
        headers,
        validateStatus: () => true,
      });
    }

    return this._axiosInstance;
  }
}
