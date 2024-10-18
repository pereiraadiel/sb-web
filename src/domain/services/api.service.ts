import axios, { AxiosInstance } from "axios";

class ApiService {
  private accessToken: string | null = null;
  private axios: AxiosInstance;
  private defaultUrl = "http://localhost:3000";
  private static instance: ApiService | null = null;

  public static singleton(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  private constructor() {
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body: { [key: string]: any }
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body: { [key: string]: any }
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

export { ApiService };
