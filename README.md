# @soybeanjs/request

[English](./README.en_US.md) | 简体中文

一个基于 Axios 封装的轻量级、类型安全的 HTTP 请求库，提供优雅的 API 设计和强大的功能支持。

## ✨ 特性

- 🎯 **类型安全**：完整的 TypeScript 类型支持，智能类型推导
- 🔄 **双实例模式**：支持标准请求实例和扁平化响应实例
- 📦 **文件下载**：自动解析文件名和内容类型，支持多种文件格式
- 🎣 **生命周期钩子**：提供完整的请求生命周期管理
- 🔁 **自动重试**：集成 axios-retry，支持请求失败自动重试
- 🛡️ **错误处理**：统一的错误处理机制，支持业务错误和网络错误
- 📝 **响应转换**：灵活的响应数据转换功能
- 🎨 **状态管理**：内置状态管理，可在实例间共享数据

## 📦 安装

```bash
# npm
npm install @soybeanjs/request

# yarn
yarn add @soybeanjs/request

# pnpm
pnpm add @soybeanjs/request
```

## 🚀 快速开始

### 基础使用

```typescript
import { createRequest } from '@soybeanjs/request';

interface ApiResponse<T = any> {
  code: number;
  data: T;
  message: string;
}

// 创建请求实例
const request = createRequest(
  {
    baseURL: 'https://api.example.com',
    timeout: 10000
  },
  {
    // 转换响应数据
    // !!!注意这里一定要给response指定类型,这样才能有类型推导
    transform: (response: AxiosResponse<ApiResponse>) => {
      return response.data.result;
    },
    // 请求前拦截
    onRequest: async config => {
      // 添加 token
      config.headers.Authorization = `Bearer ${getToken()}`;
      return config;
    },
    // 判断后端业务是否成功
    isBackendSuccess: response => {
      return response.data.code === 200;
    },
    // 后端业务失败处理
    onBackendFail: async (response, instance) => {
      // 处理 token 过期等情况
      if (response.data.code === 401) {
        await refreshToken();
        // 重新发起请求
        return instance.request(response.config);
      }
    },
    // 错误处理
    onError: async error => {
      console.error('Request failed:', error.message);
    }
  }
);

// 发起请求
const data = await request({
  url: '/users',
  method: 'GET'
});
```

### 扁平化响应实例

不抛出异常，通过返回值判断成功或失败：

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

## 📖 核心概念

### RequestOption 配置项

| 配置项             | 类型       | 必填 | 说明                                 |
| ------------------ | ---------- | ---- | ------------------------------------ |
| `transform`        | `Function` | 是   | 转换响应数据为业务数据               |
| `onRequest`        | `Function` | 否   | 请求前拦截器，可添加 token 等        |
| `isBackendSuccess` | `Function` | 是   | 判断后端业务逻辑是否成功             |
| `onBackendFail`    | `Function` | 否   | 后端业务失败回调，如处理 token 过期  |
| `onError`          | `Function` | 否   | 请求错误处理，如显示错误提示         |
| `defaultState`     | `Object`   | 否   | 默认状态对象                         |
| `backendErrorFlag` | `string`   | 否   | 后端错误标识，默认 `'BACKEND_ERROR'` |
| `backendErrorMsg`  | `string`   | 否   | 后端错误消息                         |

### 请求处理流程

```
用户发起请求
    ↓
onRequest 拦截器（添加 token 等）
    ↓
发送 HTTP 请求
    ↓
接收响应
    ↓
transformResponse（json类型时自动转换 blob/arraybuffer）
    ↓
判断 responseType
    ├─ json → isBackendSuccess？
    │   ├─ 成功 → transform → 返回业务数据
    │   └─ 失败 → onBackendFail → onError
    ├─ 文件类型 → 返回文件信息对象
    └─ 其他 → 返回原始数据
```

## 🎯 高级功能

### 1. 文件下载

支持自动解析文件名和内容类型：

```typescript
// 下载文件
const fileData = await request({
  url: '/download/report.pdf',
  method: 'GET',
  responseType: 'blob'
});

// fileData 包含：
// {
//   file: Blob,
//   filename: 'report.pdf',
//   contentType: 'application/pdf'
// }

// 自定义文件名解析
const fileData = await request({
  url: '/download/file',
  responseType: 'blob',
  getFileName: response => {
    // 自定义解析逻辑
    return 'custom-filename.pdf';
  }
});

// 使用 [fileSaver](https://github.com/eligrey/FileSaver.js) 下载文件
import { saveAs } from 'file-saver';

saveAs(fileData.file, fileData.filename);

// 或者自行通过创建链接下载
const url = URL.createObjectURL(fileData.file);
const a = document.createElement('a');
a.href = url;
a.download = fileData.filename;
a.click();
URL.revokeObjectURL(url);

// 以上通过链接下载的方式等同于使用内置的 downloadFile 工具函数
import { downloadFile } from '@soybeanjs/request';
```

支持的文件类型：

- `blob` → `FileResponseData<Blob>`
- `arraybuffer` → `FileResponseData<ArrayBuffer>`
- `stream` → `FileResponseData<ReadableStream<Uint8Array>>`

### 2. 响应类型支持

```typescript
// JSON（默认）, 需要添加一个范型参数指定业务数据类型,其他类型无需指定

interface UserData {
  id: number;
  name: string;
}
const data = await request<UserData>({
  url: '/users/123'
});

// 文本
const text = await request({
  url: '/data.csv',
  responseType: 'text'
});

// HTML/XML 文档
const doc = await request({
  url: '/template.html',
  responseType: 'document'
});

// Blob（文件）
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

### 3. 状态管理

在请求实例中共享状态：

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
  // ...其他配置
});

// 访问和修改状态
request.state.token = 'new-token';
request.state.userId = 123;

// 在钩子中使用状态
onRequest: config => {
  config.headers.Authorization = `Bearer ${request.state.token}`;
  return config;
};
```

### 4. 自动重试

```typescript
const request = createRequest(
  {
    baseURL: 'https://api.example.com',
    // axios-retry 配置
    retries: 3,
    retryDelay: retryCount => retryCount * 1000,
    retryCondition: error => {
      // 仅在网络错误或 5xx 错误时重试
      return !error.response || error.response.status >= 500;
    }
  },
  options
);
```

### 5. 类型推导

完整的 TypeScript 类型支持：

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

// ResponseData：后端原始响应类型
// ApiData：业务数据类型
const request = createRequest(axiosConfig, {
  transform: (response: AxiosResponse<ApiResponse>) => response.data.data
});

// 类型推导：data 的类型是 ApiResponse<User>
const user = await request<User>({
  url: '/users/123'
});
```

## 🛠️ 实用工具

### parseContentDisposition

解析 `Content-Disposition` 响应头获取文件名：

```typescript
import { parseContentDisposition } from '@soybeanjs/request';

const filename = parseContentDisposition("attachment; filename*=UTF-8''%E6%96%87%E4%BB%B6.pdf");
// '文件.pdf'
```

支持的格式：

- RFC 5987 编码：`filename*=UTF-8''example%20file.pdf`
- 普通格式：`filename="example.pdf"` 或 `filename=example.pdf`

## 📝 完整示例

### 带认证的 API 请求

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

// 创建请求实例
const request = createRequest(
  {
    baseURL: 'https://api.example.com',
    timeout: 10000
  },
  {
    // 转换响应数据
    transform: (response: AxiosResponse<ApiResponse>) => {
      return response.data.data;
    },
    // 请求拦截
    onRequest: async config => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    // 判断业务成功
    isBackendSuccess: response => {
      return response.data.code === 200;
    },
    // 业务失败处理
    onBackendFail: async (response, instance) => {
      const { code } = response.data;

      // Token 过期，刷新后重试
      if (code === 401) {
        const newToken = await refreshToken();
        localStorage.setItem('token', newToken);

        // 更新请求头并重试
        response.config.headers.Authorization = `Bearer ${newToken}`;
        return instance.request(response.config);
      }
    },
    // 错误处理
    onError: async error => {
      showMessage(error.response?.data.message || error.message);
    }
  }
);

// 使用示例

// 1. 获取用户信息
async function getUser(id: number) {
  const user = await request<User>({
    url: `/users/${id}`,
    method: 'GET'
  });
  return user;
}

// 2. 创建用户
async function createUser(data: Partial<User>) {
  const user = await request<User>({
    url: '/users',
    method: 'POST',
    data
  });
  return user;
}

// 3. 下载文件
async function downloadReport(reportId: string) {
  const fileData = await request({
    url: `/reports/${reportId}/download`,
    method: 'GET',
    responseType: 'blob'
  });

  // 触发浏览器下载
  const url = URL.createObjectURL(fileData.file);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileData.filename || 'report.pdf';
  a.click();
  URL.revokeObjectURL(url);
}

// 4. 上传文件
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

### 扁平化响应实例

```typescript
import { createFlatRequest } from '@soybeanjs/request';

const flatRequest = createFlatRequest(axiosConfig, options);

// 所有请求都返回 { data, error, response }
async function safeGetUser(id: number) {
  const { data, error } = await flatRequest<User>({
    url: `/users/${id}`
  });

  if (error) {
    console.error('获取用户失败:', error.message);
    return null;
  }

  return data;
}
```

## 🔧 API 参考

### createRequest

创建标准请求实例。

```typescript
function createRequest<ResponseData, ApiData, State>(
  axiosConfig?: CreateAxiosDefaults,
  options?: Partial<RequestOption<ResponseData, ApiData, State>>
): RequestInstance<ApiData, State>;
```

### createFlatRequest

创建扁平化请求实例，不抛出异常。

```typescript
function createFlatRequest<ResponseData, ApiData, State>(
  axiosConfig?: CreateAxiosDefaults,
  options?: Partial<RequestOption<ResponseData, ApiData, State>>
): FlatRequestInstance<ResponseData, ApiData, State>;
```

### 类型定义

```typescript
// 请求实例
interface RequestInstance<ApiData, State> {
  <T = ApiData, R extends ResponseType = 'json'>(config: CustomAxiosRequestConfig<R>): Promise<MappedType<R, T>>;
  state: State;
}

// 扁平化请求实例
interface FlatRequestInstance<ResponseData, ApiData, State> {
  <T = ApiData, R extends ResponseType = 'json'>(
    config: CustomAxiosRequestConfig<R>
  ): Promise<FlatResponseData<ResponseData, MappedType<R, T>>>;
  state: State;
}

// 扁平化响应数据
type FlatResponseData<ResponseData, ApiData> =
  | { data: ApiData; error: null; response: AxiosResponse<ResponseData> }
  | { data: null; error: AxiosError<ResponseData>; response: AxiosResponse<ResponseData> };

// 文件响应数据
interface FileResponseData<T = Blob | ArrayBuffer | ReadableStream> {
  file: T;
  filename: string;
  contentType: string;
}

// 响应类型映射
type ResponseType = 'json' | 'blob' | 'arraybuffer' | 'stream' | 'text' | 'document';
```

## ❓ FAQ

### 为什么需要两种请求实例？

- **createRequest**：适合大多数场景，请求失败会抛出异常，可使用 try-catch 捕获
- **createFlatRequest**：适合需要统一处理成功和失败的场景，不会抛出异常，通过返回值判断

### 如何处理业务错误和网络错误？

```typescript
{
  // 所有的请求错误,包括后端错误,网络错误和 HTTP 错误通过 onError 处理
  onError: async (error) => {
    if (!error.response) {
      // 网络错误
    } else if (error.response.status >= 500) {
      // 服务器错误
    }
  },

  // 后端业务错误通过 isBackendSuccess 和 onBackendFail 处理
  isBackendSuccess: (response) => response.data.code === 200,
  onBackendFail: async (response) => {
    // 处理业务错误，如 code: 401, 403 等
  }
}
```

### 文件下载如何获取文件名？

库会自动从响应头的 `Content-Disposition` 解析文件名。如果需要自定义：

```typescript
const fileData = await request({
  url: '/download',
  responseType: 'blob',
  getFileName: response => {
    // 自定义解析逻辑
    return 'my-file.pdf';
  }
});
```

### 如何实现请求取消？

```typescript
const controller = new AbortController();

const promise = request({
  url: '/users',
  signal: controller.signal
});

// 取消请求
controller.abort();
```

## 📄 License

[MIT](./LICENSE) License © 2026 [Soybean](https://github.com/soybeanjs)
