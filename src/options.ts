import type { CreateAxiosDefaults } from 'axios';
import type { IAxiosRetryConfig } from 'axios-retry';
import { stringify } from 'qs-esm';
import { isHttpSuccess } from './shared';
import { BACKEND_ERROR_FLAG } from './constant';
import type { RequestOption } from './types';

export function createDefaultOptions<
  ResponseData,
  ApiData = ResponseData,
  State extends Record<string, unknown> = Record<string, unknown>
>(options?: Partial<RequestOption<ResponseData, ApiData, State>>) {
  const opts: RequestOption<ResponseData, ApiData, State> = {
    defaultState: {} as State,
    transform: async response => response.data as unknown as ApiData,
    onRequest: async config => config,
    isBackendSuccess: _response => true,
    backendErrorFlag: BACKEND_ERROR_FLAG,
    backendErrorMsg: 'Backend request error, please check `isBackendSuccess`. (后端请求错误,请检查 `isBackendSuccess`)',
    onBackendFail: async () => {},
    onError: async () => {}
  };

  Object.assign(opts, options);

  return opts;
}

export function createRetryOptions(config?: Partial<CreateAxiosDefaults>) {
  const retryConfig: IAxiosRetryConfig = {
    retries: 0
  };

  Object.assign(retryConfig, config);

  return retryConfig;
}

export function createAxiosConfig(config?: Partial<CreateAxiosDefaults>) {
  const TEN_SECONDS = 10 * 1000;

  const axiosConfig: CreateAxiosDefaults = {
    timeout: TEN_SECONDS,
    headers: {
      'Content-Type': 'application/json'
    },
    validateStatus: isHttpSuccess,
    paramsSerializer: params => {
      return stringify(params);
    }
  };

  Object.assign(axiosConfig, config);

  return axiosConfig;
}
