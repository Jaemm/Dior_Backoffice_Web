/* eslint-disable no-param-reassign */
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
} from 'axios';
import { useSnackbar } from 'notistack';
import useSWR from 'swr';

import { useAppContext } from '../data/AppContext';
import { clearUserData } from '../data/UserState';
import { useStickyResult } from '../helpers/SWRHelpers';
import { generateURL } from '../helpers/URLHelpers';
import { useAppLanguage } from '../i18n/hooks';
import { BASE_URL_DEV } from './Constants';

export interface APIResponse<T = Record<string, unknown> | null> {
  current_page?: number;
  current_page_size?: number;
  data: T;
  total_pages?: number;
  total_size?: number;
}

export interface APIErrorResponse {
  type: string;
  message: {
    en: string;
    kr: string;
    jp: string;
  };
  result_code?: number;
}

export abstract class HttpClient {
  protected readonly instance: AxiosInstance;

  constructor(baseURL: string, token?: string) {
    this.instance = axios.create({ baseURL });
    this.initializeResponseInterceptor();
    this.initializeRequestInterceptors(token);
  }

  private initializeRequestInterceptors = (token?: string) => {
    this.instance.interceptors.request.use((config) => {
      if (token) {
        config.headers = {
          'X-CHOWIS-CONSULTANT-TOKEN': token,
        };
      }
      return config;
    });
  };

  private initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(
      this.handleResponse,
      this.handleError
    );
  };

  private handleResponse = (response: AxiosResponse) => response.data;

  protected handleError = ({
    response,
  }: AxiosError<APIErrorResponse>): Promise<APIErrorResponse> => {
    const { data, status } = response || {};
    console.log(status, data);
    if (status === 400 && data?.result_code === 4010) {
      clearUserData();
      window.location.href = '/login';
    }

    return Promise.reject(data);
  };
}

export class API extends HttpClient {
  constructor(token?: string) {
    super(BASE_URL_DEV, token);
  }

  public requestJSON = <
    TResponse = Record<string, unknown>,
    TRequest = Record<string, unknown>
  >(
    method: Method,
    url: string,
    options?: Omit<AxiosRequestConfig, 'method' | 'url'>
  ) =>
    this.instance.request<TRequest, APIResponse<TResponse>>({
      method,
      url,
      ...options,
    });

  public requestResource = <
    TResponse = Record<string, unknown>,
    TRequest = Record<string, unknown>
  >(
    url: string,
    options?: Omit<AxiosRequestConfig, 'method' | 'url'>
  ) => this.instance.get<TRequest, APIResponse<TResponse>>(url, options);
}

export function useAPI() {
  const { token } = useAppContext();
  // console.log('getting token now', token)
  const api = new API(token);

  return api;
}

interface HttpResourceParams {
  [paramName: string]: string | number | null | undefined;
}

export function useHttpResource<T = Record<string, unknown>>(
  path: string,
  { page = 1, limit = 25, ...otherParams }: HttpResourceParams = {},
  { pagination = true, sticky = false, shouldFetch = true } = {}
) {
  const { requestResource } = useAPI();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [language] = useAppLanguage();

  const url = pagination
    ? generateURL(path, { page, limit, ...otherParams })
    : generateURL(path, otherParams);

  console.log(url);
  const response = useSWR<APIResponse<T[] | undefined>>(
    shouldFetch ? url : null,
    requestResource,
    {
      revalidateOnFocus: false,
    }
  );

  if (response.error) {
    // const { message } = response.error;
    console.log('Messge', response.error);
    // enqueueSnackbar(message, {
    //   variant: 'error',
    //   persist: true,
    //   preventDuplicate: true,
    //   key: message,
    // });
  } else {
    closeSnackbar();
  }

  const stickyResult = useStickyResult(response.data);

  return { ...response, data: sticky ? stickyResult : response.data };
}
