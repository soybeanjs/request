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

const client = createOpenapiClient<paths, '/api/v1'>(request, '/api/v1');

const data = client.get('/org/{id}', { params: { path: { id: '1' } } });

const flatClient = createFlatOpenapiClient<paths, '/api/v1'>(flatRequest, '/api/v1');
