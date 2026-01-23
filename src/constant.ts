import type { ResponseType } from './types';

/**
 * The backend error flag (表示后端请求错误的标志)
 */
export const BACKEND_ERROR_FLAG = 'BACKEND_ERROR';

/**
 *  file response types (响应文件的类型)
 */
export const FILE_RESPONSE_TYPES: ResponseType[] = ['blob', 'arraybuffer', 'stream'];
