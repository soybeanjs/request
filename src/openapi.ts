import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { FlatRequestInstance, RequestInstance } from './types';

// ============================================================
//  Type Helpers (类型辅助工具)
// ============================================================

/** Supported HTTP methods */
export type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head' | 'trace';

/**
 * Extract paths that support a given HTTP method.
 * Paths whose method value is `never` or `undefined` (i.e. `method?: never`) are filtered out.
 *
 * 提取支持指定 HTTP 方法的路径。方法值为 `never` 或 `undefined`（即 `method?: never`）的路径会被过滤。
 */
export type PathsWithMethod<Paths extends Record<string, any>, M extends HttpMethod> = {
  [P in keyof Paths]: undefined extends Paths[P][M] ? never : P;
}[keyof Paths];

/**
 * Get the keys of T that are required (not optional, not `undefined`).
 *
 * 获取 T 中的必填字段。
 */
export type RequiredKeysOf<T> = {
  [K in keyof T]-?: undefined extends T[K] ? never : K;
}[keyof T];

/**
 * Filter an operation to extract only the parameters at a given location (query / path / header / cookie).
 *
 * 从 operation 中过滤出指定位置的参数。
 */
export type FilterKeys<Op, Location extends 'query' | 'path' | 'header' | 'cookie'> = Op extends {
  parameters: Record<Location, infer P>;
}
  ? { parameters: Record<Location, P> }
  : { parameters: Record<Location, never> };

// ============================================================
//  Operation Content Extractors (操作内容提取器)
// ============================================================

/**
 * Extract the JSON request body type from an operation.
 * Returns `never` when the operation has no request body (e.g. `requestBody?: never`).
 *
 * 从 operation 中提取 JSON 请求体类型。无请求体时返回 `never`。
 */
export type OperationRequestBodyContent<T> =
  // Explicitly filter out operations whose requestBody is `never` (with or without `?`)
  [T] extends [{ requestBody?: never }]
    ? never
    : T extends { requestBody?: { content: { 'application/json': infer B } } }
      ? B
      : T extends { requestBody: { content: { 'application/json': infer B } } }
        ? B
        : never;

/**
 * Check whether the request body is optional.
 *
 * 检查请求体是否可选。
 */
export type IsOperationRequestBodyOptional<T> = T extends { requestBody: any } ? false : true;

/**
 * Extract the success response data (200/201) for `application/json` media type.
 *
 * 从 operation 中提取成功响应（200/201）的 JSON 数据。
 */
export type SuccessResponse<T> = T extends { responses: infer R }
  ? // try 200 first
    R extends Record<200, infer Res200>
    ? Res200 extends { content: { 'application/json': infer D } }
      ? D
      : never
    : // try 201
      R extends Record<201, infer Res201>
      ? Res201 extends { content: { 'application/json': infer D } }
        ? D
        : never
      : never
  : never;

// ============================================================
//  Options Types (请求选项类型)
// ============================================================

/**
 * Extract the full parameters object from an operation.
 *
 * 从 operation 中提取完整的参数对象。
 */
export type OperationParams<T> = T extends { parameters: infer P } ? P : Record<string, never>;

/**
 * Determine whether the `params` option is required based on the operation.
 * If all parameter locations are optional / never, `params` becomes optional.
 *
 * 根据 operation 判断 `params` 是否必填。
 */
export type ParamsOption<T> = T extends { parameters: infer P }
  ? RequiredKeysOf<P> extends never
    ? { params?: P }
    : { params: P }
  : { params?: Record<string, never> };

/**
 * Determine whether the `body` option is required based on the operation.
 *
 * 根据 operation 判断 `body` 是否必填。
 */
export type RequestBodyOption<T> =
  OperationRequestBodyContent<T> extends never
    ? { body?: never }
    : IsOperationRequestBodyOptional<T> extends true
      ? { body?: OperationRequestBodyContent<T> }
      : { body: OperationRequestBodyContent<T> };

/**
 * Full per-request options for an OpenAPI operation.
 * Merges params, body, and allows passthrough of Axios config (excluding url / method / params / data).
 *
 * OpenAPI operation 的完整请求选项。
 */
export type OpenapiRequestOptions<T> = ParamsOption<T> &
  RequestBodyOption<T> &
  Omit<AxiosRequestConfig, 'url' | 'method' | 'params' | 'data'>;

// ============================================================
//  Client Method Types (客户端方法类型)
// ============================================================

/**
 * Extract the operation type for a given method from a path entry.
 * Path entries in OpenAPI map methods (get, post, etc.) to operation objects or `never`.
 *
 * 从路径条目中提取指定方法的 operation 类型。
 */
type OperationForPath<PathEntry, M extends HttpMethod> = PathEntry extends Record<M, infer Op> ? Op : never;

/**
 * Typed client method (e.g. GET / POST / ...).
 * - `Path` is restricted to paths that support the given method.
 * - `Init` is auto-inferred and becomes optional if all its fields are optional.
 *
 * 类型化的客户端方法（如 GET / POST / ...）。
 */
export type ClientMethod<Paths extends Record<string, any>, M extends HttpMethod> = <
  Path extends PathsWithMethod<Paths, M>,
  Init extends OpenapiRequestOptions<OperationForPath<Paths[Path], M>>
>(
  url: Path,
  ...init: RequiredKeysOf<Init> extends never ? [init?: Init] : [init: Init]
) => Promise<SuccessResponse<OperationForPath<Paths[Path], M>>>;

/**
 * The typed OpenAPI client interface, providing a method for each HTTP verb.
 *
 * 类型化的 OpenAPI 客户端接口。
 */
export type OpenapiClient<Paths extends Record<string, any>> = {
  [M in HttpMethod]: ClientMethod<Paths, M>;
};

// ============================================================
//  Flat Client Types (扁平化客户端类型)
// ============================================================

/**
 * Flat response for OpenAPI requests — never throws.
 * Similar to {@link FlatRequestInstance}, returns a discriminated union of success / failure.
 *
 * OpenAPI 请求的扁平化响应 — 不抛出异常，通过返回值判断成功或失败。
 */
export type FlatOpenapiResponse<T> =
  | { data: SuccessResponse<T>; error: null; response: AxiosResponse }
  | { data: null; error: AxiosError; response: AxiosResponse };

/**
 * Typed flat client method.
 * Same inference as {@link ClientMethod}, but returns a flat response that never throws.
 *
 * 类型化的扁平化客户端方法。与 {@link ClientMethod} 的推断逻辑一致，但返回扁平化响应。
 */
export type FlatClientMethod<Paths extends Record<string, any>, M extends HttpMethod> = <
  Path extends PathsWithMethod<Paths, M>,
  Init extends OpenapiRequestOptions<OperationForPath<Paths[Path], M>>
>(
  url: Path,
  ...init: RequiredKeysOf<Init> extends never ? [init?: Init] : [init: Init]
) => Promise<FlatOpenapiResponse<OperationForPath<Paths[Path], M>>>;

/**
 * The typed flat OpenAPI client interface.
 *
 * 类型化的扁平化 OpenAPI 客户端接口。
 */
export type FlatOpenapiClient<Paths extends Record<string, any>> = {
  [M in HttpMethod]: FlatClientMethod<Paths, M>;
};

// ============================================================
//  Implementation (运行时实现)
// ============================================================

/** Regex to match path parameters like `{id}` */
const PATH_PARAM_RE = /\{([^}]+)\}/g;

/**
 * Replace path parameters (e.g. `{id}`) with actual values from `params.path`.
 *
 * 将路径参数（如 `{id}`）替换为 `params.path` 中的实际值。
 */
function replacePathParams(path: string, params?: Record<string, unknown>): string {
  if (!params) return path;

  return path.replace(PATH_PARAM_RE, (_, key: string) => {
    const value = params[key];
    if (value === undefined || value === null) {
      throw new Error(`[openapi-request] Missing required path parameter "${key}" in "${path}"`);
    }
    return String(value);
  });
}

/**
 * Create a type-safe OpenAPI client based on the generated `paths` type.
 *
 * Wraps an existing {@link RequestInstance} (created by `createRequest`) and provides
 * typed HTTP methods (`get`, `post`, `put`, `delete`, …) whose URL, params, body,
 * and return type are all inferred from the OpenAPI spec.
 *
 * 基于生成的 `paths` 类型创建类型安全的 OpenAPI 客户端。
 *
 * @param requestInstance - 通过 `createRequest` 创建的请求实例
 * @param prefix - 可选的路径前缀；如果需要在显式传入 `Paths` 时保留 prefix 的字面量类型
 * @returns 类型化的 OpenAPI 客户端
 *
 * @example
 * ```typescript
 * import { createRequest } from '@soybeanjs/request';
 * import { createOpenapiClient } from '@soybeanjs/request';
 * import type { paths } from './openapi';
 *
 * const request = createRequest({ baseURL: 'https://api.example.com' }, { ... });
 * const client = createOpenapiClient<paths>(request);
 *
 * // Fully type-safe — path, params, body, and response are all inferred
 * const menus = await client.get('/api/v1/menu/list', {
 *   params: { query: { page: 1, pageSize: 10 } }
 * });
 * // menus.list, menus.total, menus.page are all typed
 *
 * const loginResult = await client.post('/api/v1/auth/login', {
 *   body: { username: 'admin', password: '123456' }
 * });
 * ```
 */
export function createOpenapiClient<Paths extends Record<string, any>, Prefix extends string = ''>(
  requestInstance: RequestInstance<any, any>,
  prefix: Prefix = '' as Prefix
): OpenapiClient<PathsRemovedPrefix<Paths, Prefix>> {
  const methods = ['get', 'post', 'put', 'delete', 'patch', 'options', 'head', 'trace'] as const;

  const client = {} as OpenapiClient<PathsRemovedPrefix<Paths, Prefix>>;

  for (const method of methods) {
    client[method] = async (url: string, options?: any) => {
      const { params, body, ...restConfig } = options || {};

      // Replace path params in the URL
      const resolvedUrl = replacePathParams(`${prefix}${url}`, params?.path);

      return requestInstance({
        url: resolvedUrl,
        method,
        params: params?.query,
        data: body,
        headers: params?.header,
        ...restConfig
      } as any);
    };
  }

  return client;
}

type PathsRemovedPrefix<Paths extends Record<string, any>, Prefix extends string> = {
  [P in keyof Paths as P extends `${Prefix}${infer S}` ? S : never]: Paths[P];
};

/**
 * Create a type-safe flat OpenAPI client based on the generated `paths` type.
 *
 * Wraps an existing {@link FlatRequestInstance} (created by `createFlatRequest`) and provides
 * typed HTTP methods (`get`, `post`, `put`, `delete`, …) that never throw — success or failure
 * is determined through the return value `{ data, error }`.
 *
 * 基于生成的 `paths` 类型创建类型安全的扁平化 OpenAPI 客户端。
 *
 * @param flatRequestInstance - 通过 `createFlatRequest` 创建的扁平化请求实例
 * @param prefix - 可选的路径前缀；如果需要在显式传入 `Paths` 时保留 prefix 的字面量类型
 * @returns 类型化的扁平化 OpenAPI 客户端
 *
 * @example
 * ```typescript
 * import { createFlatRequest } from '@soybeanjs/request';
 * import { createFlatOpenapiClient } from '@soybeanjs/request';
 * import type { paths } from './openapi';
 *
 * const flatRequest = createFlatRequest({ baseURL: 'https://api.example.com' }, { ... });
 * const client = createFlatOpenapiClient<paths>(flatRequest);
 *
 * const { data, error } = await client.get('/api/v1/menu/list', {
 *   params: { query: { page: 1, pageSize: 10 } }
 * });
 *
 * if (error) {
 *   console.error('Request failed:', error.message);
 * } else {
 *   console.log('Menus:', data.list, 'Total:', data.total);
 * }
 * ```
 */
export function createFlatOpenapiClient<Paths extends Record<string, any>, Prefix extends string = ''>(
  flatRequestInstance: FlatRequestInstance<any, any, any>,
  prefix = '' as Prefix
): FlatOpenapiClient<PathsRemovedPrefix<Paths, Prefix>> {
  const methods = ['get', 'post', 'put', 'delete', 'patch', 'options', 'head', 'trace'] as const;

  const client = {} as FlatOpenapiClient<PathsRemovedPrefix<Paths, Prefix>>;

  for (const method of methods) {
    client[method] = async (url: string, options?: any) => {
      const { params, body, ...restConfig } = options || {};

      // Replace path params in the URL
      const resolvedUrl = replacePathParams(`${prefix}${url}`, params?.path);

      return flatRequestInstance({
        url: resolvedUrl,
        method,
        params: params?.query,
        data: body,
        headers: params?.header,
        ...restConfig
      } as any);
    };
  }

  return client;
}
