import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export type ContentType =
  | 'text/html'
  | 'text/plain'
  | 'multipart/form-data'
  | 'application/json'
  | 'application/x-www-form-urlencoded'
  | 'application/octet-stream';

export type ResponseTransform<Input = any, Output = any> = (input: Input) => Output | Promise<Output>;

export interface RequestOption<
  ResponseData,
  ApiData = ResponseData,
  State extends Record<string, unknown> = Record<string, unknown>
> {
  /**
   * The default state (默认状态)
   */
  defaultState?: State;
  /**
   * transform the response data to the api data (转换响应数据为接口数据)
   *
   * @param response Axios response (响应)
   */
  transform: ResponseTransform<AxiosResponse<ResponseData>, ApiData>;
  /**
   * The hook before request (请求前的钩子)
   *
   * For example: You can add header token in this hook (例如：你可以在此钩子中添加请求头的 token)
   *
   * @param config Axios config (配置)
   */
  onRequest?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;
  /**
   * The hook to check backend response is success or not (检查后端响应是否成功的钩子)
   *
   * @param response Axios response (响应)
   */
  isBackendSuccess: (response: AxiosResponse<ResponseData>) => boolean;
  /**
   * The backend error flag (表示后端请求错误的标志)
   *
   * @default 'BACKEND_ERROR'
   */
  backendErrorFlag?: string;
  /**
   * The backend error message (表示后端请求错误信息)
   *
   * @default 'Backend request error, please check `isBackendSuccess`. (后端请求错误,请检查 `isBackendSuccess`)'
   */
  backendErrorMsg?: string;
  /**
   * The hook after backend request fail (后端请求失败后的钩子)
   *
   * For example: You can handle the expired token in this hook (例如：你可以在此钩子中处理过期的 token)
   *
   * @param response Axios response (响应)
   * @param instance Axios instance (实例)
   */
  onBackendFail?: (
    response: AxiosResponse<ResponseData>,
    instance: AxiosInstance
  ) => Promise<AxiosResponse | null> | Promise<void>;
  /**
   * The hook to handle error (after request fail) (处理错误的钩子（请求失败后）)
   *
   * For example: You can show error message in this hook (例如：你可以在此钩子中展示错误信息)
   *
   * @param error 错误对象
   */
  onError?: (error: AxiosError<ResponseData>) => void | Promise<void>;
}

/**
 * File response data (文件响应数据)
 *
 * Contains file content, filename, and content type
 */
export interface FileResponseData<T = Blob | ArrayBuffer | ReadableStream<Uint8Array>> {
  /** File data (文件数据) */
  file: T;
  /** Filename parsed from Content-Disposition header (从 Content-Disposition 头解析的文件名) */
  filename: string;
  /** Content type from response header (响应头中的内容类型) */
  contentType: string;
}

interface ResponseMap {
  blob: FileResponseData<Blob>;
  arraybuffer: FileResponseData<ArrayBuffer>;
  stream: FileResponseData<ReadableStream<Uint8Array>>;
  text: string;
  document: Document;
}
export type ResponseType = keyof ResponseMap | 'json';

export type MappedType<R extends ResponseType, JsonType = any> = R extends keyof ResponseMap
  ? ResponseMap[R]
  : JsonType;

export type CustomAxiosRequestConfig<R extends ResponseType = 'json'> = Omit<AxiosRequestConfig, 'responseType'> & {
  responseType?: R;
  /**
   * get filename from response (从响应中获取文件名)
   *
   * @param response
   *
   * @default use built-in function `parseContentDisposition` to parse filename from Content-Disposition header
   */
  getFileName?: (response: AxiosResponse) => string;
};

export interface RequestInstanceCommon<State extends Record<string, unknown>> {
  /** you can set custom state in the request instance */
  state: State;
}

/** The request instance */
export interface RequestInstance<ApiData, State extends Record<string, unknown>> extends RequestInstanceCommon<State> {
  <T extends ApiData = ApiData, R extends ResponseType = 'json'>(
    config: CustomAxiosRequestConfig<R>
  ): Promise<MappedType<R, T>>;
}

export type FlatResponseSuccessData<ResponseData, ApiData> = {
  data: ApiData;
  error: null;
  response: AxiosResponse<ResponseData>;
};

export type FlatResponseFailData<ResponseData> = {
  data: null;
  error: AxiosError<ResponseData>;
  response: AxiosResponse<ResponseData>;
};

export type FlatResponseData<ResponseData, ApiData> =
  | FlatResponseSuccessData<ResponseData, ApiData>
  | FlatResponseFailData<ResponseData>;

export interface FlatRequestInstance<
  ResponseData,
  ApiData,
  State extends Record<string, unknown>
> extends RequestInstanceCommon<State> {
  <T extends ApiData = ApiData, R extends ResponseType = 'json'>(
    config: CustomAxiosRequestConfig<R>
  ): Promise<FlatResponseData<ResponseData, MappedType<R, T>>>;
}
