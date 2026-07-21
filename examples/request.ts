// oxlint-disable no-unused-vars
import type { AxiosResponse } from 'axios';
import { createFlatRequest, createRequest, createOpenapiClient, createFlatOpenapiClient } from '../src';
import type { paths } from './openapi.d.ts';

interface ApiResponse<T = any> {
  code: string;
  data: T;
  message: string;
}

const request = createRequest(
  { baseURL: 'https://api.example.com' },
  {
    transform: (response: AxiosResponse<ApiResponse>) => response.data.data,
    isBackendSuccess: (response: AxiosResponse<ApiResponse>) => response.data.code === '0000'
  }
);

const flatRequest = createFlatRequest(
  { baseURL: 'https://api.example.com' },
  {
    transform: (response: AxiosResponse<ApiResponse>) => response.data.data,
    isBackendSuccess: (response: AxiosResponse<ApiResponse>) => response.data.code === '0000'
  }
);

// Pass both the type parameter and the runtime argument so that `Prefix` stays in sync
// with the actual prefix used at runtime.
// 类型参数与运行时参数保持一致,确保 `Prefix` 与实际运行时 prefix 同步。
const client = createOpenapiClient<paths, '/api/v1'>(request, '/api/v1');

const flatClient = createFlatOpenapiClient<paths, '/api/v1'>(flatRequest, '/api/v1');

// Example invocations (示例调用)
async function run() {
  // typed GET with path parameter — `/api/{id}` is `/api/v1/api/{id}` after applying the prefix
  const data = await client.get('/api/{id}', { params: { path: { id: '1' } } });

  // typed flat GET — never throws, destructure { data, error }
  const { data: flatData, error } = await flatClient.get('/api/list');

  return { data, flatData, error };
}

void run;
