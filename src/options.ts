import { AxiosHeaders } from 'axios';
import type { CreateAxiosDefaults } from 'axios';
import type { IAxiosRetryConfig } from 'axios-retry';
import { stringify } from 'qs-esm';
import { isHttpSuccess } from './shared';
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
    backendErrorMsg: 'Backend request error, please check `isBackendSuccess`. (后端请求错误,请检查 `isBackendSuccess`)',
    onBackendFail: async () => {},
    onError: async () => {}
  };

  Object.assign(opts, options);

  return opts;
}

/**
 * Build the axios-retry config from a partial {@link IAxiosRetryConfig}.
 *
 * Separated from {@link createAxiosConfig} so retry options are never confused with axios options
 * (previously `Object.assign(retryConfig, axiosConfig)` would leak `baseURL` / `headers` / `timeout`
 * into the retry config).
 *
 * 从独立的 `IAxiosRetryConfig` 入参构建 retry 配置,与 axios 配置彻底分离,
 * 避免之前 `Object.assign(retryConfig, axiosConfig)` 把 `baseURL` / `headers` / `timeout`
 * 等 axios 字段泄漏到 retry 配置中。
 */
export function createRetryOptions(config?: Partial<IAxiosRetryConfig>) {
  const retryConfig: IAxiosRetryConfig = {
    retries: 0
  };

  Object.assign(retryConfig, config);

  return retryConfig;
}

/**
 * Merge two `AxiosHeaders`-like objects. `undefined` values from `override` are ignored so that
 * users can selectively override headers without wiping defaults (e.g. `Content-Type`).
 */
function mergeHeaders(base: Record<string, string>, override?: Record<string, string | undefined>): AxiosHeaders {
  const merged: Record<string, string> = { ...base };

  if (override) {
    for (const [key, value] of Object.entries(override)) {
      if (value !== undefined) {
        merged[key] = value;
      }
    }
  }

  return merged as AxiosHeaders;
}

/**
 * Build the final axios config. Unlike the previous `Object.assign` approach, `headers` are
 * merged field-by-field so that passing `{ headers: { 'X-Foo': 'bar' } }` no longer wipes out
 * the default `Content-Type: application/json`.
 *
 * 构建最终 axios 配置。与之前 `Object.assign` 全量覆盖不同,`headers` 按字段合并,
 * 传入 `{ headers: { 'X-Foo': 'bar' } }` 不会覆盖默认的 `Content-Type: application/json`。
 */
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

  if (config) {
    const { headers: userHeaders, ...rest } = config;
    Object.assign(axiosConfig, rest);

    if (userHeaders !== undefined) {
      // merge headers instead of overwriting the default Content-Type
      const baseHeaders = (axiosConfig.headers as Record<string, string>) || {};
      const overrideHeaders =
        userHeaders instanceof AxiosHeaders
          ? (userHeaders.toJSON() as Record<string, string>)
          : (userHeaders as Record<string, string>);
      axiosConfig.headers = mergeHeaders(baseHeaders, overrideHeaders) as CreateAxiosDefaults['headers'];
    }
  }

  return axiosConfig;
}
