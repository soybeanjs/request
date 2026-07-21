import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import type { ContentType, ResponseType } from './types';

/**
 * get content type from axios config (从 axios 配置中获取内容类型)
 * @param config  axios config (axios 配置)
 */
export function getContentType(config: InternalAxiosRequestConfig) {
  const contentType = (config.headers?.['Content-Type'] || 'application/json') as ContentType;

  return contentType;
}

/**
 * check if http status is success (检查 HTTP 状态是否成功)
 * @param status http status (HTTP 状态)
 */
export function isHttpSuccess(status: number) {
  const isSuccessCode = status >= 200 && status < 300;
  return isSuccessCode || status === 304;
}

/**
 * is response json (是否为 JSON 响应)
 *
 * @param response axios response (axios 响应)
 */
export function isResponseJson(response: AxiosResponse) {
  const { responseType } = response.config;

  return responseType === 'json' || responseType === undefined;
}

/**
 * Coerce a binary response (blob / arraybuffer) into JSON when the server actually
 * returned `application/json` content (e.g. error envelopes returned with a 200 status).
 *
 * No-op for `json` / `text` / `document` / `stream` response types.
 *
 * 将二进制响应(blob / arraybuffer)在服务器实际返回 `application/json` 时转换为 JSON
 * (例如错误信封以 200 状态返回的场景)。对 `json` / `text` / `document` / `stream` 类型不做处理。
 *
 * Renamed from `transformResponse` to avoid clashing with axios' built-in config field of the same name.
 */
export async function coerceBinaryToJsonResponse(response: AxiosResponse) {
  const responseType: ResponseType = (response.config?.responseType as ResponseType) || 'json';
  if (responseType === 'json') return;

  const isJson = (response.headers['content-type'] as string)?.includes('application/json');
  if (!isJson) return;

  if (responseType === 'blob') {
    await transformBlobToJson(response);
  }

  if (responseType === 'arraybuffer') {
    await transformArrayBufferToJson(response);
  }
}

export async function transformBlobToJson(response: AxiosResponse) {
  try {
    let data = response.data;

    if (typeof data === 'string') {
      data = JSON.parse(data);
    }

    if (Object.prototype.toString.call(data) === '[object Blob]') {
      const json = await data.text();
      data = JSON.parse(json);
    }

    response.data = data;
  } catch {}
}

export async function transformArrayBufferToJson(response: AxiosResponse) {
  try {
    let data = response.data;

    if (typeof data === 'string') {
      data = JSON.parse(data);
    }

    if (Object.prototype.toString.call(data) === '[object ArrayBuffer]') {
      const json = new TextDecoder().decode(data);
      data = JSON.parse(json);
    }

    response.data = data;
  } catch {}
}

/**
 * Parse filename from Content-Disposition header (从 Content-Disposition 响应头解析文件名)
 *
 * Support RFC 5987 encoded format (filename*=UTF-8''xxx) and regular format (filename="xxx")
 *
 * @param contentDisposition Content-Disposition header value (Content-Disposition 响应头的值)
 * @returns filename or empty string (文件名或空字符串)
 */
export function parseContentDisposition(contentDisposition?: string): string {
  if (!contentDisposition) return '';

  // RFC 5987 encoded format: filename*=UTF-8''example%20file.pdf
  const encodedMatch = contentDisposition.match(/filename\*=UTF-8''(.+?)(?:;|$)/i);
  if (encodedMatch) {
    try {
      return decodeURIComponent(encodedMatch[1]);
    } catch {
      return encodedMatch[1];
    }
  }

  // Regular format: filename="example file.pdf" or filename=example.pdf
  const regularMatch = contentDisposition.match(/filename=["']?([^"';]+)["']?/i);
  if (regularMatch) {
    return regularMatch[1];
  }

  return '';
}

export function downloadFile(fileData: Blob | File, filename: string) {
  const url = URL.createObjectURL(fileData);
  const link = document.createElement('a');

  link.href = url;
  link.download = filename || 'download';

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
