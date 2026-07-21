import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { CustomAxiosRequestConfig, FlatRequestInstance, RequestInstance } from './types';

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
 * Get the keys of T that are required (not optional, not `undefined`, not `never`).
 *
 * 获取 T 中的必填字段。
 */
export type RequiredKeysOf<T> = {
  [K in keyof T]-?: undefined extends T[K] ? never : K;
}[keyof T];

// ============================================================
//  Operation Content Extractors (操作内容提取器)
// ============================================================

/** Media types recognised in request / response bodies. */
type SupportedMediaType =
  | 'application/json'
  | 'application/x-www-form-urlencoded'
  | 'multipart/form-data'
  | 'text/plain';

/**
 * Extract the request body type from an operation across multiple media types.
 *
 * Resolution order: `application/json` → `multipart/form-data` →
 * `application/x-www-form-urlencoded` → `text/plain` → `never`.
 *
 * Returns `never` when the operation has no request body (e.g. `requestBody?: never`).
 *
 * 从 operation 中提取请求体类型,支持多种媒体类型。
 *
 * 解析顺序:`application/json` → `multipart/form-data` →
 * `application/x-www-form-urlencoded` → `text/plain` → `never`。
 *
 * 无请求体时返回 `never`。
 */
export type OperationRequestBodyContent<T> =
  // Explicitly filter out operations whose requestBody is `never` (with or without `?`)
  [T] extends [{ requestBody?: never }]
    ? never
    : T extends { requestBody?: { content: infer C } }
      ? ResolveMediaType<C>
      : T extends { requestBody: { content: infer C } }
        ? ResolveMediaType<C>
        : never;

/**
 * Pick the first matching media type from a `content` map.
 * Resolution order matches {@link OperationRequestBodyContent}.
 */
type ResolveMediaType<C> = C extends { 'application/json': infer B }
  ? B
  : C extends { 'multipart/form-data': infer B }
    ? B
    : C extends { 'application/x-www-form-urlencoded': infer B }
      ? B
      : C extends { 'text/plain': infer B }
        ? B
        : never;

/**
 * Check whether the request body is optional.
 *
 * 检查请求体是否可选。
 */
export type IsOperationRequestBodyOptional<T> = T extends { requestBody: any } ? false : true;

/**
 * Extract the success response data.
 *
 * Resolution order:
 *   200 → 201 → 202 → 204 (treated as `void`) → other 2xx → fallback `never`.
 *
 * For `204 No Content`, returns `void` (the operation succeeded but has no body).
 * For non-JSON media types, falls back to `unknown` so callers can opt into manual typing
 * via the `responseType` config option.
 *
 * 从 operation 中提取成功响应数据。
 *
 * 解析顺序：200 → 201 → 202 → 204（视为 `void`）→ 其他 2xx → 兜底 `never`。
 * 对于 `204 No Content`,返回 `void`(操作成功但无响应体)。
 * 对于非 JSON 媒体类型,降级为 `unknown`,以便调用方通过 `responseType` 自行指定类型。
 */
export type SuccessResponse<T> = T extends { responses: infer R }
  ? R extends Record<200, infer Res>
    ? ExtractMediaTypeBody<Res>
    : R extends Record<201, infer Res>
      ? ExtractMediaTypeBody<Res>
      : R extends Record<202, infer Res>
        ? ExtractMediaTypeBody<Res>
        : R extends Record<204, any>
          ? void
          : ExtractFirst2xx<R>
  : never;

/**
 * Extract the error response body for the first matching 4xx or 5xx status code.
 *
 * Useful for typing `onError` handlers — note that this is a best-effort extraction
 * and returns `unknown` when the spec describes a non-JSON error body, or `never`
 * when no 4xx/5xx response is documented.
 *
 * 提取第一个匹配的 4xx 或 5xx 状态码的错误响应体。
 *
 * 适用于为 `onError` 处理器提供类型。注意这是 best-effort 提取:
 * 非 JSON 错误体返回 `unknown`,无 4xx/5xx 文档时返回 `never`。
 */
export type ErrorResponse<T> = T extends { responses: infer R }
  ? ExtractFirstError<R>
  : never;

/** Extract the JSON body from a response entry, or `unknown` for non-JSON media types. */
type ExtractMediaTypeBody<Res> = Res extends { content: { 'application/json': infer D } }
  ? D
  : Res extends { content: Record<SupportedMediaType, any> }
    ? unknown
    : unknown;

/**
 * Best-effort: pick the first 2xx status code (lexicographically) from a `responses` map
 * and extract its body. Returns `never` if no 2xx is present.
 */
type ExtractFirst2xx<R> =
  R extends Record<infer Code, any>
    ? Code extends `2${string}`
      ? ExtractMediaTypeBody<R[Code]>
      : never
    : never;

/**
 * Best-effort: pick the first 4xx or 5xx status code from a `responses` map and extract
 * its body. Returns `never` if no 4xx/5xx is present.
 */
type ExtractFirstError<R> =
  R extends Record<infer Code, any>
    ? Code extends `4${string}` | `5${string}`
      ? ExtractMediaTypeBody<R[Code]>
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
 *
 * Merges `params`, `body`, and allows passthrough of Axios config. The following Axios fields
 * are intentionally omitted because they are managed by the client:
 * - `url` / `method` — set by the client itself
 * - `params` / `data` — replaced by `params.query` and `body`
 * - `headers` — replaced by `params.header` to avoid the dual-path ambiguity where both
 *   `params.header` and `headers` could be set with conflicting values
 *
 * OpenAPI operation 的完整请求选项。
 *
 * 合并 `params`、`body`,并允许透传 Axios 配置。以下 Axios 字段被有意省略,因为它们由客户端管理:
 * - `url` / `method` —— 由客户端本身设置
 * - `params` / `data` —— 由 `params.query` 和 `body` 替代
 * - `headers` —— 由 `params.header` 替代,以避免 `params.header` 与 `headers` 同时可设且可能冲突的双路径歧义
 */
export type OpenapiRequestOptions<T> = ParamsOption<T> &
  RequestBodyOption<T> &
  Omit<AxiosRequestConfig, 'url' | 'method' | 'params' | 'data' | 'headers'>;

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
 *
 * **Important — relationship with `transform`**: the success type returned here is derived from
 * the OpenAPI spec's `responses` entry. The underlying `RequestInstance` runs `transform` on
 * every JSON response before returning. For the types to be correct, your `transform` MUST
 * return exactly what the OpenAPI spec describes — typically:
 *   - If the spec describes the *business data* (no envelope), use
 *     `transform: response => response.data` (or `response.data.data` if the server wraps in an
 *     envelope but the spec describes the inner payload).
 *   - If the spec describes the *full envelope*, use `transform: response => response.data`.
 *
 * 类型推导的返回值来源于 OpenAPI spec 的 `responses`。底层 `RequestInstance` 会对每个 JSON
 * 响应执行 `transform` 后再返回。为保证类型正确,你的 `transform` 必须返回 spec 所描述的形态 ——
 * 通常:
 *   - 若 spec 描述的是业务数据(无 envelope),用
 *     `transform: response => response.data`(若服务端有 envelope 但 spec 描述内层负载,则用 `response.data.data`)
 *   - 若 spec 描述的是完整 envelope,用 `transform: response => response.data`
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
 * Note: `response` is optional on the failure branch because network errors may not have a response.
 *
 * OpenAPI 请求的扁平化响应 — 不抛出异常，通过返回值判断成功或失败。
 * 注意:失败分支的 `response` 是可选的,因为网络错误等场景下可能没有响应。
 */
export type FlatOpenapiResponse<T> =
  | { data: SuccessResponse<T>; error: null; response: AxiosResponse }
  | { data: null; error: AxiosError; response?: AxiosResponse };

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
 * Translate the OpenAPI-style `{ params: { query, path, header, cookie }, body, ...rest }`
 * options into an axios config.
 *
 * Returns `CustomAxiosRequestConfig<'json'>` — the OpenAPI client always uses JSON encoding
 * by default; callers who need a different `responseType` can pass it via `restConfig`.
 */
function buildAxiosConfig(
  url: string,
  prefix: string,
  method: HttpMethod,
  options: any
): CustomAxiosRequestConfig<'json'> {
  const { params, body, ...restConfig } = options || {};

  const resolvedUrl = replacePathParams(`${prefix}${url}`, params?.path);

  return {
    url: resolvedUrl,
    method,
    params: params?.query,
    data: body,
    headers: params?.header,
    ...restConfig
  };
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
 * @param prefix - 可选的路径前缀;需要与 `Prefix` 类型参数保持一致以正确剥离路径前缀
 * @returns 类型化的 OpenAPI 客户端
 *
 * @example
 * ```typescript
 * import { createRequest } from '@soybeanjs/request';
 * import { createOpenapiClient } from '@soybeanjs/request';
 * import type { paths } from './openapi';
 *
 * const request = createRequest({ baseURL: 'https://api.example.com' }, { ... });
 *
 * // No prefix — paths are used verbatim
 * const client = createOpenapiClient<paths>(request);
 *
 * // With prefix — pass both the type parameter and the runtime argument
 * const client = createOpenapiClient<paths, '/api/v1'>(request, '/api/v1');
 *
 * // Fully type-safe — path, params, body, and response are all inferred
 * const menus = await client.get('/menu/list', {
 *   params: { query: { page: 1, pageSize: 10 } }
 * });
 * // menus.list, menus.total, menus.page are all typed
 *
 * const loginResult = await client.post('/auth/login', {
 *   body: { username: 'admin', password: '123456' }
 * });
 * ```
 */
export function createOpenapiClient<Paths extends Record<string, any>, Prefix extends string = ''>(
  requestInstance: RequestInstance<any, any>,
  prefix: Prefix = '' as Prefix
): OpenapiClient<PathsRemovedPrefix<Paths, Prefix>> {
  const methods: readonly HttpMethod[] = ['get', 'post', 'put', 'delete', 'patch', 'options', 'head', 'trace'];

  const client = {} as OpenapiClient<PathsRemovedPrefix<Paths, Prefix>>;

  for (const method of methods) {
    client[method] = ((url: string, options?: any) => {
      return requestInstance(buildAxiosConfig(url, prefix, method, options));
    }) as OpenapiClient<PathsRemovedPrefix<Paths, Prefix>>[typeof method];
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
 * @param prefix - 可选的路径前缀;需要与 `Prefix` 类型参数保持一致以正确剥离路径前缀
 * @returns 类型化的扁平化 OpenAPI 客户端
 *
 * @example
 * ```typescript
 * import { createFlatRequest } from '@soybeanjs/request';
 * import { createFlatOpenapiClient } from '@soybeanjs/request';
 * import type { paths } from './openapi';
 *
 * const flatRequest = createFlatRequest({ baseURL: 'https://api.example.com' }, { ... });
 * const client = createFlatOpenapiClient<paths, '/api/v1'>(flatRequest, '/api/v1');
 *
 * const { data, error } = await client.get('/menu/list', {
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
  prefix: Prefix = '' as Prefix
): FlatOpenapiClient<PathsRemovedPrefix<Paths, Prefix>> {
  const methods: readonly HttpMethod[] = ['get', 'post', 'put', 'delete', 'patch', 'options', 'head', 'trace'];

  const client = {} as FlatOpenapiClient<PathsRemovedPrefix<Paths, Prefix>>;

  for (const method of methods) {
    client[method] = ((url: string, options?: any) => {
      return flatRequestInstance(buildAxiosConfig(url, prefix, method, options));
    }) as FlatOpenapiClient<PathsRemovedPrefix<Paths, Prefix>>[typeof method];
  }

  return client;
}
