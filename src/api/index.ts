import { message } from "antd";
import axios, { AxiosInstance } from "axios";

export default class Api {
  private client!: AxiosInstance;

  constructor(baseURL: string) {
    const options = {
      baseURL
    }

    this.client = axios.create(options);
    // Interceptors here (if needed)
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        message.error(error.response.data.message[0])
        return Promise.reject(error);
      }
    );

  }

  private async post(endpoint: string, data: Record<string, any>) {
    return this.client.post(endpoint, data);
  }

  private async delete(endpoint: string) {
    return this.client.delete(endpoint);
  }

  public async subscribeEmail(email: string) {
    return this.post('/mail/subscriber', { email });
  }

  public async unsubscribeEmail(disposeToken: string) {
    return this.delete(`/mail/subscriber/${disposeToken}`);
  }
}

export const apiInstance = new Api(import.meta.env.VITE_API_URL);