import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  RawAxiosRequestConfig,
} from 'axios';

export default class ServiceAdapter {
  constructor(public baseUrl?: string, public config?: RawAxiosRequestConfig) {}

  getConfig(headers: { [key: string]: string } = {}): AxiosRequestConfig {
    const config = {
      baseURL: this.baseUrl,
      ...this.config,
      headers: {
        ...(this.config?.headers || {}),
        ...headers,
      },
    };
    config.headers['content-type'] =
      config.headers['content-type'] || 'application/json';
    return config as AxiosRequestConfig;
  }

  public async get<T>(
    url: string,
    headers: { [key: string]: string } = {}
  ): Promise<T> {
    try {
      const response = await axios.get<T, AxiosResponse<T>>(
        `${url}`,
        this.getConfig(headers)
      );
      return response.data;
    } catch (error) {
      return error.response.data ? error.response.data : { status: false };
    }
  }

  public async post<T, V>(
    url: string,
    data: T,
    headers: { [key: string]: string } = {}
  ): Promise<V> {
    try {
      const response = await axios.post<T, AxiosResponse<V>>(
        `${url}`,
        data,
        this.getConfig(headers)
      );
      return response.data;
    } catch (error) {
      return error.response.data ? error.response.data : { status: false };
    }
  }
  public async put<T, V>(
    url: string,
    data: T,
    headers: { [key: string]: string } = {}
  ): Promise<V> {
    try {
      const response = await axios.put<T, AxiosResponse<V>>(
        `${url}`,
        data,
        this.getConfig(headers)
      );
      return response.data;
    } catch (error) {
      return error.response.data ? error.response.data : { status: false };
    }
  }
}
