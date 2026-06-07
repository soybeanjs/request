import { create, AxiosError } from 'axios';
import type { AxiosResponse, CreateAxiosDefaults, InternalAxiosRequestConfig } from 'axios';
import axiosRetry from 'axios-retry';
import { createAxiosConfig, createDefaultOptions, createRetryOptions } from './options';
import { parseContentDisposition, transformResponse } from './shared';
import { FILE_RESPONSE_TYPES } from './constant';
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
 * @param axiosConfig axios config (axios 配置)
 * @param options request options (请求选项)
 */
export function createRequest<ResponseData, ApiData, State extends Record<string, unknown>>(
  axiosConfig?: CreateAxiosDefaults,
  options?: RequestOption<ResponseData, ApiData, State>
) {
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

  request.state = {} as State;

  return request;
}

/**
 * create a flat request instance (创建一个扁平化的请求实例)
 *
 * The response data is a flat object: { data: any, error: AxiosError }
 *
 * @param axiosConfig axios config (axios 配置)
 * @param options request options (请求选项)
 */
export function createFlatRequest<ResponseData, ApiData, State extends Record<string, unknown>>(
  axiosConfig?: CreateAxiosDefaults,
  options?: RequestOption<ResponseData, ApiData, State>
) {
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
      return { data: null, error, response: (error as AxiosError<ResponseData>).response };
    }
  } as FlatRequestInstance<ResponseData, ApiData, State>;

  flatRequest.state = {
    ...opts.defaultState
  } as State;

  return flatRequest;
}

function createCommonRequest<
  ResponseData,
  ApiData = ResponseData,
  State extends Record<string, unknown> = Record<string, unknown>
>(axiosConfig?: CreateAxiosDefaults, options?: RequestOption<ResponseData, ApiData, State>) {
  const opts = createDefaultOptions<ResponseData, ApiData, State>(options);

  const axiosConf = createAxiosConfig(axiosConfig);
  const instance = create(axiosConf);

  const retryOptions = createRetryOptions(axiosConf);
  axiosRetry(instance, retryOptions);

  instance.interceptors.request.use(conf => {
    const config: InternalAxiosRequestConfig = { ...conf };

    return opts.onRequest?.(config) || config;
  });

  instance.interceptors.response.use(
    async response => {
      const responseType: ResponseType = (response.config?.responseType as ResponseType) || 'json';

      await transformResponse(response);

      if (responseType !== 'json' || opts.isBackendSuccess(response)) {
        return Promise.resolve(response);
      }

      const fail = await opts.onBackendFail?.(response, instance);
      if (fail) {
        return fail;
      }

      const backendError = new AxiosError<ResponseData>(
        opts.backendErrorMsg,
        opts.backendErrorFlag,
        response.config,
        response.request,
        response
      );

      await opts.onError?.(backendError);

      return Promise.reject(backendError);
    },
    async (error: AxiosError<ResponseData>) => {
      await opts.onError?.(error);

      return Promise.reject(error);
    }
  );

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
