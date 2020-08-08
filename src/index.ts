import axios, { AxiosInstance } from 'axios';
import * as jwt from 'jsonwebtoken';
import { Meetings } from './functions/meetings';

export class ZoomMeetingAPI {
  private _axiosInstance?: AxiosInstance;
  private zoomToken: string;
  private zoomIss: string;

  constructor(zoomToken: string, zoomIss: string) {
    this.zoomIss = zoomIss;
    this.zoomToken = zoomToken;
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

  meetingFunctions = new Meetings(this.http);
}
