import { create } from 'axios';
import type { AxiosError, AxiosResponse, CreateAxiosDefaults, InternalAxiosRequestConfig } from 'axios';
import axiosRetry from 'axios-retry';
import { createAxiosConfig, createDefaultOptions, createRetryOptions } from './options';
import { coerceBinaryToJsonResponse, parseContentDisposition } from './shared';
import { FILE_RESPONSE_TYPES } from './constant';
import { BackendError } from './types';
import type {
  CustomAxiosRequestConfig,
  FileResponseData,
  FlatRequestInstance,
  MappedType,
  RequestInstance,
  RequestOption,
  ResponseType
} from './types';

/**
 * create a request instance (创建一个请求实例)
 *
 * Type parameters (all optional, with sensible defaults):
 * - `ResponseData` — the raw response body shape returned by the backend (default `any`)
 * - `ApiData` — the business data shape after `transform` (default `= ResponseData`)
 * - `State` — the shared state object on the instance (default `Record<string, unknown>`)
 *
 * @param axiosConfig axios config (axios 配置) — supports an additional `'axios-retry'` field
 * @param options request options (请求选项)
 */
export function createRequest<
  ResponseData = any,
  ApiData = ResponseData,
  State extends Record<string, unknown> = Record<string, unknown>
>(axiosConfig?: CreateAxiosDefaults, options?: RequestOption<ResponseData, ApiData, State>) {
  const { instance, opts } = createCommonRequest<ResponseData, ApiData, State>(axiosConfig, options);

  const request: RequestInstance<ApiData, State> = async function request<
    T extends ApiData = ApiData,
    R extends ResponseType = 'json'
  >(config: CustomAxiosRequestConfig<R>) {
    const response: AxiosResponse<ResponseData> = await instance(config);

    const responseType = response.config?.responseType || 'json';

    if (responseType === 'json') {
      return opts.transform(response);
    }

    // handle file download response (处理文件响应)
    if (FILE_RESPONSE_TYPES.includes(responseType as ResponseType)) {
      return getFileData(response, config.getFileName);
    }

    return response.data as MappedType<R, T>;
  } as RequestInstance<ApiData, State>;

  request.raw = async function rawRequest<T extends ApiData = ApiData, R extends ResponseType = 'json'>(
    config: CustomAxiosRequestConfig<R>
  ) {
    const response: AxiosResponse<ResponseData> = await instance(config);

    const responseType = response.config?.responseType || 'json';

    if (responseType === 'json') {
      return response as AxiosResponse<MappedType<R, T>>;
    }

    // handle file download response (处理文件响应)
    if (FILE_RESPONSE_TYPES.includes(responseType as ResponseType)) {
      const fileData = getFileData(response, config.getFileName);

      return {
        ...response,
        data: fileData
      } as AxiosResponse<MappedType<R, T>>;
    }

    return response as AxiosResponse<MappedType<R, T>>;
  };

  // preserve default state configured by the user (保留用户配置的默认状态)
  request.state = {
    ...opts.defaultState
  } as State;

  // expose the underlying axios instance for advanced extension (暴露底层 axios 实例以便高级扩展)
  request.instance = instance;

  return request;
}

/**
 * create a flat request instance (创建一个扁平化的请求实例)
 *
 * The response data is a flat object: { data: any, error: AxiosError }
 *
 * Type parameters (all optional, with sensible defaults):
 * - `ResponseData` — the raw response body shape returned by the backend (default `any`)
 * - `ApiData` — the business data shape after `transform` (default `= ResponseData`)
 * - `State` — the shared state object on the instance (default `Record<string, unknown>`)
 *
 * @param axiosConfig axios config (axios 配置) — supports an additional `'axios-retry'` field
 * @param options request options (请求选项)
 */
export function createFlatRequest<
  ResponseData = any,
  ApiData = ResponseData,
  State extends Record<string, unknown> = Record<string, unknown>
>(axiosConfig?: CreateAxiosDefaults, options?: RequestOption<ResponseData, ApiData, State>) {
  const { instance, opts } = createCommonRequest<ResponseData, ApiData, State>(axiosConfig, options);

  const flatRequest: FlatRequestInstance<ResponseData, ApiData, State> = async function flatRequest<
    T extends ApiData = ApiData,
    R extends ResponseType = 'json'
  >(config: CustomAxiosRequestConfig<R>) {
    try {
      const response: AxiosResponse<ResponseData> = await instance(config);

      const responseType = response.config?.responseType || 'json';

      if (responseType === 'json') {
        const data = await opts.transform(response);

        return { data, error: null, response };
      }

      // handle file download response (处理文件响应)
      if (FILE_RESPONSE_TYPES.includes(responseType as ResponseType)) {
        const fileData = getFileData(response, config.getFileName);

        return { data: fileData, error: null, response };
      }

      return { data: response.data as MappedType<R, T>, error: null, response };
    } catch (error) {
      return {
        data: null,
        error: error as AxiosError<ResponseData>,
        response: (error as AxiosError<ResponseData>).response
      };
    }
  } as FlatRequestInstance<ResponseData, ApiData, State>;

  flatRequest.raw = async function rawRequest<T extends ApiData = ApiData, R extends ResponseType = 'json'>(
    config: CustomAxiosRequestConfig<R>
  ) {
    try {
      const response: AxiosResponse<MappedType<R, T>> = await instance(config);
      return { data: response, error: null, response };
    } catch (error) {
      return {
        data: null,
        error: error as AxiosError<ResponseData>,
        response: (error as AxiosError<ResponseData>).response
      };
    }
  };

  flatRequest.state = {
    ...opts.defaultState
  } as State;

  // expose the underlying axios instance for advanced extension (暴露底层 axios 实例以便高级扩展)
  flatRequest.instance = instance;

  return flatRequest;
}

function createCommonRequest<
  ResponseData = any,
  ApiData = ResponseData,
  State extends Record<string, unknown> = Record<string, unknown>
>(axiosConfig?: CreateAxiosDefaults, options?: RequestOption<ResponseData, ApiData, State>) {
  const opts = createDefaultOptions<ResponseData, ApiData, State>(options);

  const axiosConf = createAxiosConfig(axiosConfig);
  const instance = create(axiosConf);

  const retryOptions = createRetryOptions(axiosConfig?.['axios-retry']);
  axiosRetry(instance, retryOptions);

  instance.interceptors.request.use(async conf => {
    const config: InternalAxiosRequestConfig = { ...conf };

    return (await opts.onRequest?.(config)) ?? config;
  });

  instance.interceptors.response.use(
    async response => {
      // Re-process the response through the full pipeline. Used both for the initial response and
      // for any retried response returned by `onBackendFail`, ensuring retries are also validated
      // by `isBackendSuccess` and run through `coerceBinaryToJsonResponse`.
      //
      // `allowBackendFail` controls whether `onBackendFail` may be invoked for this pass — it is
      // disabled on the second pass to prevent infinite token-refresh loops.
      return processResponse(response, true);
    },
    async (error: AxiosError<ResponseData>) => {
      await opts.onError?.(error);

      return Promise.reject(error);
    }
  );

  async function processResponse(
    response: AxiosResponse<ResponseData>,
    allowBackendFail: boolean
  ): Promise<AxiosResponse<ResponseData>> {
    const responseType: ResponseType = (response.config?.responseType as ResponseType) || 'json';

    await coerceBinaryToJsonResponse(response);

    if (responseType !== 'json' || opts.isBackendSuccess(response)) {
      return response;
    }

    if (allowBackendFail) {
      const fail = await opts.onBackendFail?.(response, instance);
      if (fail) {
        // Re-validate the retried response, but do not invoke onBackendFail again
        // to avoid infinite loops (e.g. token refresh -> still failing -> refresh again).
        return processResponse(fail as AxiosResponse<ResponseData>, false);
      }
    }

    const backendError = new BackendError<ResponseData>(
      opts.backendErrorMsg ?? 'Backend request error, please check `isBackendSuccess`.',
      response
    );

    await opts.onError?.(backendError);

    return Promise.reject(backendError);
  }

  return {
    instance,
    opts
  };
}

function getFileData(response: AxiosResponse, getFileName?: (response: AxiosResponse) => string) {
  const filename = getFileName?.(response) ?? parseContentDisposition(response.headers['content-disposition']);

  const contentType = response.headers['content-type'] || 'application/octet-stream';

  return {
    file: response.data,
    filename,
    contentType
  } as FileResponseData;
}
