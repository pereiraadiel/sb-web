import axios, { AxiosInstance } from "axios";

export class ApiService {
  private accessToken: string | null = null;
  private axios: AxiosInstance;
  private defaultUrl = "http://localhost:3000";

  constructor() {
    this.accessToken = null;
    this.axios = axios.create({
      baseURL: this.defaultUrl,
    });
  }

  public useAccessToken(accessToken: string): this {
    this.accessToken = accessToken;
    return this;
  }

  public async get<T>(url: string): Promise<T> {
    const response = await this.axios.get<T>(url, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
    return response.data;
  }

  public async post<T>(
    url: string,
    body: { [key: string]: string | number }
  ): Promise<T> {
    const response = await this.axios.post<T>(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
    return response.data;
  }

  public async put<T>(
    url: string,
    body: { [key: string]: string | number }
  ): Promise<T> {
    const response = await this.axios.put<T>(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
    return response.data;
  }

  public async delete<T>(url: string): Promise<T> {
    const response = await this.axios.delete<T>(url, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
    return response.data;
  }
}
