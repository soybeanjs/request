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

const client = createOpenapiClient<paths>(request);

const data = client.get('/api/v1/org/{id}', { params: { path: { id: '1' } } });

const flatClient = createFlatOpenapiClient<paths>(flatRequest);

const flatData = flatClient.post('/api/v1/auth/login', {
  body: {
    username: 'admin',
    password: '123456'
  }
});
