# @soybeanjs/request

English | [简体中文](./README.md)

A lightweight, type-safe HTTP request library based on Axios, providing elegant API design and powerful functionality.

## ✨ Features

- 🎯 **Type Safe**: Full TypeScript support with intelligent type inference
- 🔄 **Dual Instance Mode**: Support for standard and flat response instances
- 📦 **File Download**: Auto-parse filename and content type, support multiple file formats
- 🎣 **Lifecycle Hooks**: Complete request lifecycle management
- 🔁 **Auto Retry**: Integrated axios-retry, support automatic retry on failure
- 🛡️ **Error Handling**: Unified error handling mechanism for business and network errors
- 📝 **Response Transform**: Flexible response data transformation
- 🎨 **State Management**: Built-in state management for sharing data across instances

## 📦 Installation

```bash
# npm
npm install @soybeanjs/request

# yarn
yarn add @soybeanjs/request

# pnpm
pnpm add @soybeanjs/request
```

## 🚀 Quick Start

### Basic Usage

```typescript
import { createRequest } from '@soybeanjs/request';

interface ApiResponse<T = any> {
  code: number;
  data: T;
  message: string;
}

// Create request instance
const request = createRequest(
  {
    baseURL: 'https://api.example.com',
    timeout: 10000
  },
  {
    // Transform response data
    // !!! Note: Must specify the response type here for type inference
    transform: (response: AxiosResponse<ApiResponse>) => {
      return response.data.result;
    },
    // Request interceptor
    onRequest: async config => {
      // Add token
      config.headers.Authorization = `Bearer ${getToken()}`;
      return config;
    },
    // Check if backend request is successful
    isBackendSuccess: response => {
      return response.data.code === 200;
    },
    // Handle backend failure
    onBackendFail: async (response, instance) => {
      // Handle token expiration, etc.
      if (response.data.code === 401) {
        await refreshToken();
        // Retry request
        return instance.request(response.config);
      }
    },
    // Error handling
    onError: async error => {
      console.error('Request failed:', error.message);
    }
  }
);

// Make request
const data = await request({
  url: '/users',
  method: 'GET'
});
```

### Flat Response Instance

No exception thrown, determine success or failure through return value:

```typescript
import { createFlatRequest } from '@soybeanjs/request';

const flatRequest = createFlatRequest(axiosConfig, options);

const { data, error, response } = await flatRequest({
  url: '/users',
  method: 'GET'
});

if (error) {
  console.error('Request failed:', error);
} else {
  console.log('Success:', data);
}
```

## 📖 Core Concepts

### RequestOption Configuration

| Option             | Type       | Required | Description                                             |
| ------------------ | ---------- | -------- | ------------------------------------------------------- |
| `transform`        | `Function` | Yes      | Transform response data to business data                |
| `onRequest`        | `Function` | No       | Request interceptor, can add token, etc.                |
| `isBackendSuccess` | `Function` | Yes      | Check if backend business logic is successful           |
| `onBackendFail`    | `Function` | No       | Backend failure callback, handle token expiration, etc. |
| `onError`          | `Function` | No       | Request error handling, show error message, etc.        |
| `defaultState`     | `Object`   | No       | Default state object                                    |
| `backendErrorFlag` | `string`   | No       | Backend error flag, default `'BACKEND_ERROR'`           |
| `backendErrorMsg`  | `string`   | No       | Backend error message                                   |

### Request Processing Flow

```
User initiates request
    ↓
onRequest interceptor (add token, etc.)
    ↓
Send HTTP request
    ↓
Receive response
    ↓
transformResponse (auto convert blob/arraybuffer for json type)
    ↓
Check responseType
    ├─ json → isBackendSuccess?
    │   ├─ Success → transform → return business data
    │   └─ Failure → onBackendFail → onError
    ├─ File types → return file info object
    └─ Others → return raw data
```

## 🎯 Advanced Features

### 1. File Download

Auto-parse filename and content type:

```typescript
// Download file
const fileData = await request({
  url: '/download/report.pdf',
  method: 'GET',
  responseType: 'blob'
});

// fileData contains:
// {
//   file: Blob,
//   filename: 'report.pdf',
//   contentType: 'application/pdf'
// }

// Custom filename parsing
const fileData = await request({
  url: '/download/file',
  responseType: 'blob',
  getFileName: response => {
    // Custom parsing logic
    return 'custom-filename.pdf';
  }
});

// use [fileSaver](https://github.com/eligrey/FileSaver.js) to download file
import { saveAs } from 'file-saver';

saveAs(fileData.file, fileData.filename);

// Or download by creating a link manually
const url = URL.createObjectURL(fileData.file);
const a = document.createElement('a');
a.href = url;
a.download = fileData.filename;
a.click();
URL.revokeObjectURL(url);

// the above method is equivalent to using the built-in downloadFile utility function
import { downloadFile } from '@soybeanjs/request';
```

Supported file types:

- `blob` → `FileResponseData<Blob>`
- `arraybuffer` → `FileResponseData<ArrayBuffer>`
- `stream` → `FileResponseData<ReadableStream<Uint8Array>>`

### 2. Response Type Support

```typescript
// JSON (default), need to add a generic parameter to specify business data type, other types don't need

interface UserData {
  id: number;
  name: string;
}
const data = await request<UserData>({
  url: '/users/123'
});

// Text
const text = await request({
  url: '/data.csv',
  responseType: 'text'
});

// HTML/XML Document
const doc = await request({
  url: '/template.html',
  responseType: 'document'
});

// Blob (file)
const file = await request({
  url: '/download/image.png',
  responseType: 'blob'
});

// ArrayBuffer
const buffer = await request({
  url: '/download/data.bin',
  responseType: 'arraybuffer'
});
```

### 3. State Management

Share state across request instance:

```typescript
interface CustomState {
  token: string;
  userId: number;
}

const request = createRequest(axiosConfig, {
  defaultState: {
    token: '',
    userId: 0
  } as CustomState
  // ...other config
});

// Access and modify state
request.state.token = 'new-token';
request.state.userId = 123;

// Use state in hooks
onRequest: config => {
  config.headers.Authorization = `Bearer ${request.state.token}`;
  return config;
};
```

### 4. Auto Retry

```typescript
const request = createRequest(
  {
    baseURL: 'https://api.example.com',
    // axios-retry config
    retries: 3,
    retryDelay: retryCount => retryCount * 1000,
    retryCondition: error => {
      // Only retry on network error or 5xx error
      return !error.response || error.response.status >= 500;
    }
  },
  options
);
```

### 5. Type Inference

Full TypeScript type support:

```typescript
interface User {
  id: number;
  name: string;
}

interface ApiResponse<T = any> {
  code: number;
  data: T;
  message: string;
}

// ResponseData: backend raw response type
// ApiData: business data type
const request = createRequest(axiosConfig, {
  transform: (response: AxiosResponse<ApiResponse>) => response.data.data
});

// Type inference: data type is ApiResponse<User>
const user = await request<User>({
  url: '/users/123'
});
```

### 6. raw Method — Get Raw Response

Use `request.raw()` to skip the `transform` step and get the full `AxiosResponse` object directly. This is useful when you need access to response headers, status codes, or the original response data.

**Difference between `request()` and `request.raw()`:**

| Method            | Return Value                | Transform applied |
| ----------------- | --------------------------- | ----------------- |
| `request()`       | Transformed business data   | ✅ Yes            |
| `request.raw()`   | Full `AxiosResponse` object | ❌ No             |

**Use cases:**

- **Access response headers**: Read custom headers like `X-Request-Id`, `X-Total-Count`, etc.
- **Access status codes**: Distinguish between different success status codes (200/201, etc.)
- **Access raw response data**: Get the original backend response before `transform`, useful for debugging or special handling
- **Handle pagination metadata**: Read pagination totals, page numbers, etc. from response headers

```typescript
// 1. Access custom info in response headers
const response = await request.raw<User[]>({
  url: '/users',
  method: 'GET'
});

const totalCount = response.headers['x-total-count']; // Pagination total
const requestId = response.headers['x-request-id'];   // Request tracing ID
const statusCode = response.status;                    // HTTP status code

console.log(`Total: ${totalCount}, Status: ${statusCode}`);

// 2. Get raw response + file info when downloading
const fileResponse = await request.raw({
  url: '/download/report.pdf',
  responseType: 'blob'
});

// fileResponse.data contains { file, filename, contentType }
// fileResponse.headers provides additional info like server time
const serverTime = fileResponse.headers['date'];
console.log(`File: ${fileResponse.data.filename}, Server time: ${serverTime}`);

// 3. Manually transform data as needed (without using transform)
const rawResponse = await request.raw<User>({
  url: '/users/123'
});

// Handle the original response data yourself
const rawData = rawResponse.data;
// rawData is the original backend response before transform
```

**Type signature:**

```typescript
interface RequestInstance<ApiData, State> {
  // Standard request: returns transformed business data
  <T = ApiData, R extends ResponseType = 'json'>(
    config: CustomAxiosRequestConfig<R>
  ): Promise<MappedType<R, T>>;

  // raw request: returns full AxiosResponse
  raw<T = ApiData, R extends ResponseType = 'json'>(
    config: CustomAxiosRequestConfig<R>
  ): Promise<AxiosResponse<MappedType<R, T>>>;

  state: State;
}
```

### 7. OpenAPI Type-Safe Client

After generating the `paths` type with [openapi-typescript](https://openapi-ts.dev/), you can create a **fully type-safe** request client — paths, parameters, request bodies, and return types are all inferred from the OpenAPI spec.

> **Prerequisite**: Use `openapi-typescript` to generate type definitions from `openapi.json`:
> ```bash
> npx openapi-typescript ./openapi.json -o ./src/openapi.d.ts
> ```
> The generated file exports `paths`, `operations`, etc. — these are the generic parameters passed to `createOpenapiClient`.

#### createOpenapiClient

Wraps a standard request instance created by `createRequest`, returning a typed OpenAPI client:

```typescript
import { createRequest, createOpenapiClient } from '@soybeanjs/request';
import type { paths } from './openapi.d.ts'; // generated by openapi-typescript

const request = createRequest({ baseURL: 'https://api.example.com' }, { /* ... */ });
const client = createOpenapiClient<paths>(request);
```

**① GET request with no parameters:**

```typescript
// GET /api/v1/api/all —— no parameters needed
const apis = await client.get('/api/v1/api/all');
// `apis` is automatically typed as an array of API objects
```

**② Path parameters:**

```typescript
// GET /api/v1/api/{id} —— path parameter required
const apiDetail = await client.get('/api/v1/api/{id}', {
  params: { path: { id: 'abc-123' } }
});
// `{id}` in the path is automatically replaced with 'abc-123'
// `apiDetail` is automatically typed as the API detail object
```

**③ Query parameters:**

```typescript
// GET /api/v1/menu/list?page=1&pageSize=10 —— query parameters needed
const menuList = await client.get('/api/v1/menu/list', {
  params: {
    query: {
      page: 1,
      pageSize: 10
    }
  }
});
// menuList.list, menuList.total, menuList.page are all fully typed
```

**④ Request body:**

```typescript
// POST /api/v1/auth/login —— request body required
const loginResult = await client.post('/api/v1/auth/login', {
  body: {
    username: 'admin',
    password: '123456'
  }
});
// loginResult.token, loginResult.refreshToken are fully typed
```

**⑤ Path + query parameter combination:**

```typescript
// GET /api/v1/org/{id}/users?page=1&pageSize=20
const orgUsers = await client.get('/api/v1/org/{id}/users', {
  params: {
    path: { id: 'org-001' },
    query: { page: 1, pageSize: 20 }
  }
});
```

**⑥ Path + body combination:**

```typescript
// PUT /api/v1/menu/{id} —— update menu
await client.put('/api/v1/menu/{id}', {
  params: { path: { id: 'menu-001' } },
  body: {
    name: 'System Management',
    icon: 'setting',
    order: 1
  }
});
```

**⑦ DELETE request:**

```typescript
// DELETE /api/v1/api/{id}
await client.delete('/api/v1/api/{id}', {
  params: { path: { id: 'abc-123' } }
});
```

#### createFlatOpenapiClient

Wraps a flat request instance created by `createFlatRequest`. **Never throws exceptions** — success or failure is determined through the return value `{ data, error }`:

```typescript
import { createFlatRequest, createFlatOpenapiClient } from '@soybeanjs/request';
import type { paths } from './openapi.d.ts';

const flatRequest = createFlatRequest({ baseURL: 'https://api.example.com' }, { /* ... */ });
const client = createFlatOpenapiClient<paths>(flatRequest);
```

```typescript
// GET request —— handle result via data / error destructuring
const { data, error } = await client.get('/api/v1/menu/list', {
  params: { query: { page: 1, pageSize: 10 } }
});

if (error) {
  console.error('Request failed:', error.message);
} else {
  // data.list, data.total are type-safe
  console.log(`Total menus: ${data.total}`);
}

// POST request —— same pattern
const { data: loginData, error: loginError } = await client.post('/api/v1/auth/login', {
  body: { username: 'admin', password: '123456' }
});

if (loginError) {
  console.error('Login failed:', loginError.message);
} else {
  localStorage.setItem('token', loginData.token);
}
```

#### Comparison

| Feature              | `createOpenapiClient`              | `createFlatOpenapiClient`              |
| -------------------- | ---------------------------------- | -------------------------------------- |
| Underlying instance  | `createRequest` (standard)          | `createFlatRequest` (flat)             |
| Error handling       | Throws exceptions, use `try-catch` | No exceptions, check return value      |
| Return type          | Business data directly             | `{ data, error }` discriminated union  |
| Use case             | Most scenarios, unified error handling | Fine-grained per-request success/failure control |

## 🛠️ Utilities

### parseContentDisposition

Parse filename from `Content-Disposition` response header:

```typescript
import { parseContentDisposition } from '@soybeanjs/request';

const filename = parseContentDisposition("attachment; filename*=UTF-8''%E6%96%87%E4%BB%B6.pdf");
// '文件.pdf'
```

Supported formats:

- RFC 5987 encoded: `filename*=UTF-8''example%20file.pdf`
- Regular format: `filename="example.pdf"` or `filename=example.pdf`

## 📝 Complete Examples

### API Request with Authentication

```typescript
import { createRequest } from '@soybeanjs/request';

interface ApiResponse<T = any> {
  code: number;
  data: T;
  message: string;
}

interface User {
  id: number;
  name: string;
  email: string;
}

// Create request instance
const request = createRequest(
  {
    baseURL: 'https://api.example.com',
    timeout: 10000
  },
  {
    // Transform response data
    transform: (response: AxiosResponse<ApiResponse>) => {
      return response.data.data;
    },
    // Request interceptor
    onRequest: async config => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    // Check business success
    isBackendSuccess: response => {
      return response.data.code === 200;
    },
    // Business failure handling
    onBackendFail: async (response, instance) => {
      const { code } = response.data;

      // Token expired, refresh and retry
      if (code === 401) {
        const newToken = await refreshToken();
        localStorage.setItem('token', newToken);

        // Update header and retry
        response.config.headers.Authorization = `Bearer ${newToken}`;
        return instance.request(response.config);
      }
    },
    // Error handling
    onError: async error => {
      showMessage(error.response?.data.message || error.message);
    }
  }
);

// Usage examples

// 1. Get user info
async function getUser(id: number) {
  const user = await request<User>({
    url: `/users/${id}`,
    method: 'GET'
  });
  return user;
}

// 2. Create user
async function createUser(data: Partial<User>) {
  const user = await request<User>({
    url: '/users',
    method: 'POST',
    data
  });
  return user;
}

// 3. Download file
async function downloadReport(reportId: string) {
  const fileData = await request({
    url: `/reports/${reportId}/download`,
    method: 'GET',
    responseType: 'blob'
  });

  // Trigger browser download
  const url = URL.createObjectURL(fileData.file);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileData.filename || 'report.pdf';
  a.click();
  URL.revokeObjectURL(url);
}

// 4. Upload file
async function uploadFile(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  const result = await request({
    url: '/upload',
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return result;
}
```

### Flat Response Instance

```typescript
import { createFlatRequest } from '@soybeanjs/request';

const flatRequest = createFlatRequest(axiosConfig, options);

// All requests return { data, error, response }
async function safeGetUser(id: number) {
  const { data, error } = await flatRequest<User>({
    url: `/users/${id}`
  });

  if (error) {
    console.error('Failed to get user:', error.message);
    return null;
  }

  return data;
}
```

## 🔧 API Reference

### createRequest

Create standard request instance.

```typescript
function createRequest<ResponseData, ApiData, State>(
  axiosConfig?: CreateAxiosDefaults,
  options?: Partial<RequestOption<ResponseData, ApiData, State>>
): RequestInstance<ApiData, State>;
```

### createFlatRequest

Create flat request instance, no exception thrown.

```typescript
function createFlatRequest<ResponseData, ApiData, State>(
  axiosConfig?: CreateAxiosDefaults,
  options?: Partial<RequestOption<ResponseData, ApiData, State>>
): FlatRequestInstance<ResponseData, ApiData, State>;
```

### Type Definitions

```typescript
// Request instance
interface RequestInstance<ApiData, State> {
  <T = ApiData, R extends ResponseType = 'json'>(config: CustomAxiosRequestConfig<R>): Promise<MappedType<R, T>>;
  raw<T = ApiData, R extends ResponseType = 'json'>(config: CustomAxiosRequestConfig<R>): Promise<AxiosResponse<MappedType<R, T>>>;
  state: State;
}

// Flat request instance
interface FlatRequestInstance<ResponseData, ApiData, State> {
  <T = ApiData, R extends ResponseType = 'json'>(
    config: CustomAxiosRequestConfig<R>
  ): Promise<FlatResponseData<ResponseData, MappedType<R, T>>>;
  state: State;
}

// Flat response data
type FlatResponseData<ResponseData, ApiData> =
  | { data: ApiData; error: null; response: AxiosResponse<ResponseData> }
  | { data: null; error: AxiosError<ResponseData>; response: AxiosResponse<ResponseData> };

// File response data
interface FileResponseData<T = Blob | ArrayBuffer | ReadableStream> {
  file: T;
  filename: string;
  contentType: string;
}

// Response type mapping
type ResponseType = 'json' | 'blob' | 'arraybuffer' | 'stream' | 'text' | 'document';
```

## ❓ FAQ

### Why two types of request instances?

- **createRequest**: Suitable for most scenarios, throws exception on failure, can use try-catch
- **createFlatRequest**: Suitable for scenarios requiring unified success/failure handling, no exception thrown, determine through return value

### How to handle business errors and network errors?

```typescript
{
  // All request errors including backend, network and HTTP errors handled by onError
  onError: async (error) => {
    if (!error.response) {
      // Network error
    } else if (error.response.status >= 500) {
      // Server error
    }
  },

  // Backend business errors handled by isBackendSuccess and onBackendFail
  isBackendSuccess: (response) => response.data.code === 200,
  onBackendFail: async (response) => {
    // Handle business errors like code: 401, 403, etc.
  }
}
```

### How to get filename when downloading files?

The library automatically parses filename from `Content-Disposition` response header. For custom parsing:

```typescript
const fileData = await request({
  url: '/download',
  responseType: 'blob',
  getFileName: response => {
    // Custom parsing logic
    return 'my-file.pdf';
  }
});
```

### How to cancel a request?

```typescript
const controller = new AbortController();

const promise = request({
  url: '/users',
  signal: controller.signal
});

// Cancel request
controller.abort();
```

## 📄 License

[MIT](./LICENSE) License © 2026 [Soybean](https://github.com/soybeanjs)
