export type paths = {
    "/api/v1/api": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** 创建API */
        post: operations["postApiV1Api"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/api/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 获取API详情 */
        get: operations["getApiV1ApiById"];
        /** 更新API */
        put: operations["putApiV1ApiById"];
        post?: never;
        /** 删除API */
        delete: operations["deleteApiV1ApiById"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/api/all": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 获取全部API（用于选项加载） */
        get: operations["getApiV1ApiAll"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/api/list": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 获取API列表 */
        get: operations["getApiV1ApiList"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/auth/login": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** 用户登录 */
        post: operations["login"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/auth/logout": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** 用户登出 */
        post: operations["logout"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/auth/register": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** 用户注册 */
        post: operations["register"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/auth/token/refresh": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** 刷新访问令牌 */
        post: operations["refreshToken"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/auth/user/info": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 获取当前用户信息 */
        get: operations["getUserInfo"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/dict": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** 创建字典 */
        post: operations["postApiV1Dict"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/dict-item": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** 创建字典项 */
        post: operations["postApiV1DictItem"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/dict-item/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 获取字典项详情 */
        get: operations["getApiV1DictItemById"];
        /** 更新字典项 */
        put: operations["putApiV1DictItemById"];
        post?: never;
        /** 删除字典项 */
        delete: operations["deleteApiV1DictItemById"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/dict-item/all": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 获取全部字典项（用于选项加载） */
        get: operations["getApiV1DictItemAll"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/dict-item/list": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 获取字典项列表 */
        get: operations["getApiV1DictItemList"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/dict-item/tree/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 获取字典项树 */
        get: operations["getApiV1DictItemTreeById"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/dict/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 获取字典详情 */
        get: operations["getApiV1DictById"];
        /** 更新字典 */
        put: operations["putApiV1DictById"];
        post?: never;
        /** 删除字典 */
        delete: operations["deleteApiV1DictById"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/dict/all": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 获取全部字典（用于选项加载） */
        get: operations["getApiV1DictAll"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/dict/list": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 获取字典列表 */
        get: operations["getApiV1DictList"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/menu": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** 创建菜单 */
        post: operations["postApiV1Menu"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/menu/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 获取菜单详情 */
        get: operations["getApiV1MenuById"];
        /** 更新菜单 */
        put: operations["putApiV1MenuById"];
        post?: never;
        /** 删除菜单 */
        delete: operations["deleteApiV1MenuById"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/menu/all": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 获取所有菜单 */
        get: operations["getApiV1MenuAll"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/menu/batch": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** 批量删除菜单 */
        post: operations["postApiV1MenuBatch"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/menu/exist/path": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** 根据路径检查菜单路由是否存在 */
        post: operations["postApiV1MenuExistPath"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/menu/list": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 获取菜单列表 */
        get: operations["getApiV1MenuList"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/menu/public": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 获取公开的菜单列表 */
        get: operations["getApiV1MenuPublic"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/menu/tree": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 获取菜单树 */
        get: operations["getApiV1MenuTree"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/menu/user": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 获取用户菜单 */
        get: operations["getApiV1MenuUser"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/org": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** 创建组织 */
        post: operations["postApiV1Org"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/org/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 获取组织详情 */
        get: operations["getApiV1OrgById"];
        /** 更新组织 */
        put: operations["putApiV1OrgById"];
        post?: never;
        /** 删除组织 */
        delete: operations["deleteApiV1OrgById"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/org/{id}/users": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 获取组织的所有用户 */
        get: operations["getApiV1OrgByIdUsers"];
        put?: never;
        /** 向组织添加用户 */
        post: operations["postApiV1OrgByIdUsers"];
        /** 从组织移除用户 */
        delete: operations["deleteApiV1OrgByIdUsers"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/org/all": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 获取全部组织（用于选项加载） */
        get: operations["getApiV1OrgAll"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/org/list": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 获取组织列表 */
        get: operations["getApiV1OrgList"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/permission": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** 创建权限 */
        post: operations["postApiV1Permission"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/permission/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 获取权限详情 */
        get: operations["getApiV1PermissionById"];
        /** 更新权限 */
        put: operations["putApiV1PermissionById"];
        post?: never;
        /** 删除权限 */
        delete: operations["deleteApiV1PermissionById"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/permission/all": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 获取全部权限（用于选项加载） */
        get: operations["getApiV1PermissionAll"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/permission/list": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 获取权限列表 */
        get: operations["getApiV1PermissionList"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/plugins/demo/info": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 获取 Demo 后端插件信息 */
        get: operations["getApiV1PluginsDemoInfo"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/plugins/demo/request-logs": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 获取 Demo 后端插件请求日志 */
        get: operations["getApiV1PluginsDemoRequestLogs"];
        put?: never;
        /** 写入 Demo 后端插件请求日志 */
        post: operations["postApiV1PluginsDemoRequestLogs"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/role": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** 创建角色 */
        post: operations["postApiV1Role"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/role/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 获取角色详情 */
        get: operations["getApiV1RoleById"];
        /** 更新角色 */
        put: operations["putApiV1RoleById"];
        post?: never;
        /** 删除角色 */
        delete: operations["deleteApiV1RoleById"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/role/all": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 获取全部角色 */
        get: operations["getApiV1RoleAll"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/role/detail/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 获取角色详情(包含权限列表) */
        get: operations["getApiV1RoleDetailById"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/role/list": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 获取角色列表 */
        get: operations["getApiV1RoleList"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/role/user": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 获取用户角色列表 */
        get: operations["getApiV1RoleUser"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/role/user/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 根据用户id获取角色列表 */
        get: operations["getApiV1RoleUserById"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/user": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** 创建新用户 */
        post: operations["postApiV1User"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/user/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 获取用户详情 */
        get: operations["getApiV1UserById"];
        /** 更新用户信息 */
        put: operations["putApiV1UserById"];
        post?: never;
        /** 删除用户 */
        delete: operations["deleteApiV1UserById"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/user/list": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 获取用户列表 */
        get: operations["getApiV1UserList"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/user/password": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /** 更新用户密码 */
        put: operations["putApiV1UserPassword"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
};
export type webhooks = Record<string, never>;
export type components = {
    schemas: never;
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
};
export type $defs = Record<string, never>;
export interface operations {
    postApiV1Api: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    description?: string | null;
                    enabled?: ("Y" | "N" | "D") | null;
                    /**
                     * @description API方法
                     * @enum {string}
                     */
                    method: "get" | "post" | "put" | "delete" | "patch" | "options" | "head";
                    /** @description API名称 */
                    name: string;
                    /** @description API路径 */
                    path: string;
                };
            };
        };
        responses: {
            /** @description API创建成功 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        createdBy?: string | null;
                        createdTime?: string | null;
                        description?: string | null;
                        enabled?: ("Y" | "N" | "D") | null;
                        /** @description ID */
                        id: string;
                        /**
                         * @description API方法
                         * @enum {string}
                         */
                        method: "get" | "post" | "put" | "delete" | "patch" | "options" | "head";
                        /** @description API名称 */
                        name: string;
                        /** @description API路径 */
                        path: string;
                        updatedBy?: string | null;
                        updatedTime?: string | null;
                    };
                };
            };
        };
    };
    getApiV1ApiById: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description API ID */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 成功获取API详情 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        createdBy?: string | null;
                        createdTime?: string | null;
                        description?: string | null;
                        enabled?: ("Y" | "N" | "D") | null;
                        /** @description ID */
                        id: string;
                        /**
                         * @description API方法
                         * @enum {string}
                         */
                        method: "get" | "post" | "put" | "delete" | "patch" | "options" | "head";
                        /** @description API名称 */
                        name: string;
                        /** @description API路径 */
                        path: string;
                        updatedBy?: string | null;
                        updatedTime?: string | null;
                    };
                };
            };
        };
    };
    putApiV1ApiById: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description API ID */
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    description?: (string | null) | null;
                    enabled?: (("Y" | "N" | "D") | null) | null;
                    method?: ("get" | "post" | "put" | "delete" | "patch" | "options" | "head") | null;
                    name?: string | null;
                    path?: string | null;
                };
            };
        };
        responses: {
            /** @description API更新成功 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        createdBy?: string | null;
                        createdTime?: string | null;
                        description?: string | null;
                        enabled?: ("Y" | "N" | "D") | null;
                        /** @description ID */
                        id: string;
                        /**
                         * @description API方法
                         * @enum {string}
                         */
                        method: "get" | "post" | "put" | "delete" | "patch" | "options" | "head";
                        /** @description API名称 */
                        name: string;
                        /** @description API路径 */
                        path: string;
                        updatedBy?: string | null;
                        updatedTime?: string | null;
                    };
                };
            };
        };
    };
    deleteApiV1ApiById: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description API ID */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description API删除成功 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": boolean;
                };
            };
        };
    };
    getApiV1ApiAll: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 成功获取全部API（非分页） */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        createdBy?: string | null;
                        createdTime?: string | null;
                        description?: string | null;
                        enabled?: ("Y" | "N" | "D") | null;
                        /** @description ID */
                        id: string;
                        /**
                         * @description API方法
                         * @enum {string}
                         */
                        method: "get" | "post" | "put" | "delete" | "patch" | "options" | "head";
                        /** @description API名称 */
                        name: string;
                        /** @description API路径 */
                        path: string;
                        updatedBy?: string | null;
                        updatedTime?: string | null;
                    }[];
                };
            };
        };
    };
    getApiV1ApiList: {
        parameters: {
            query?: {
                enabled?: (("Y" | "N" | "D") | null) | null;
                method?: ("get" | "post" | "put" | "delete" | "patch" | "options" | "head") | null;
                name?: string | null;
                page?: (number | string) | null;
                pageSize?: (number | string) | null;
                path?: string | null;
                sort?: string | null;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 成功获取API列表 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description API列表 */
                        list: {
                            createdBy?: string | null;
                            createdTime?: string | null;
                            description?: string | null;
                            enabled?: ("Y" | "N" | "D") | null;
                            /** @description ID */
                            id: string;
                            /**
                             * @description API方法
                             * @enum {string}
                             */
                            method: "get" | "post" | "put" | "delete" | "patch" | "options" | "head";
                            /** @description API名称 */
                            name: string;
                            /** @description API路径 */
                            path: string;
                            updatedBy?: string | null;
                            updatedTime?: string | null;
                        }[];
                        /** @description 页码 */
                        page: number | string;
                        /** @description 每页数量 */
                        pageSize: number | string;
                        /** @description 总数 */
                        total: number;
                    };
                };
            };
        };
    };
    login: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** @description 密码 */
                    password: string;
                    /** @description 用户名 */
                    username: string;
                };
            };
        };
        responses: {
            /** @description 登录成功 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description 刷新令牌 */
                        refreshToken: string;
                        /** @description 访问令牌 */
                        token: string;
                    };
                };
            };
        };
    };
    logout: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** @description 刷新令牌 */
                    refreshToken: string;
                    /** @description 访问令牌 */
                    token: string;
                };
            };
        };
        responses: {
            /** @description 登出成功 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": boolean;
                };
            };
        };
    };
    register: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /**
                     * Format: email
                     * @description 邮箱
                     */
                    email: string;
                    fullName?: string | null;
                    /** @description 密码 */
                    password: string;
                    /** @description 用户名 */
                    username: string;
                };
            };
        };
        responses: {
            /** @description 注册成功 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description 刷新令牌 */
                        refreshToken: string;
                        /** @description 访问令牌 */
                        token: string;
                    };
                };
            };
        };
    };
    refreshToken: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** @description 刷新令牌 */
                    refreshToken: string;
                    /** @description 访问令牌 */
                    token: string;
                };
            };
        };
        responses: {
            /** @description 令牌刷新成功 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description 刷新令牌 */
                        refreshToken: string;
                        /** @description 访问令牌 */
                        token: string;
                    };
                };
            };
        };
    };
    getUserInfo: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 获取成功 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        avatar?: string | null;
                        email?: string | null;
                        enabled?: ("Y" | "N" | "D") | null;
                        fullName?: string | null;
                        homePath?: string | null;
                        /** @description ID */
                        id: string;
                        phone?: string | null;
                        /** @description 用户名 */
                        username: string;
                    };
                };
            };
        };
    };
    postApiV1Dict: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** @description 字典编码 */
                    code: string;
                    description?: string | null;
                    enabled?: ("Y" | "N" | "D") | null;
                    isSystem?: ("Y" | "N") | null;
                    /** @description 字典名称 */
                    name: string;
                };
            };
        };
        responses: {
            /** @description 成功创建字典 */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description 字典编码 */
                        code: string;
                        createdBy?: string | null;
                        createdTime?: string | null;
                        description?: string | null;
                        enabled?: ("Y" | "N" | "D") | null;
                        /** @description ID */
                        id: string;
                        isSystem?: ("Y" | "N") | null;
                        /** @description 字典名称 */
                        name: string;
                        updatedBy?: string | null;
                        updatedTime?: string | null;
                    };
                };
            };
        };
    };
    postApiV1DictItem: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    description?: string | null;
                    /** @description 字典ID */
                    dictId: string;
                    enabled?: ("Y" | "N" | "D") | null;
                    /** @description 字典项文本 */
                    label: string;
                    order?: number | null;
                    parentId?: string | null;
                    /** @description 字典项值 */
                    value: string;
                };
            };
        };
        responses: {
            /** @description 成功创建字典项 */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        createdBy?: string | null;
                        createdTime?: string | null;
                        description?: string | null;
                        /** @description 字典ID */
                        dictId: string;
                        enabled?: ("Y" | "N" | "D") | null;
                        /** @description ID */
                        id: string;
                        /** @description 字典项文本 */
                        label: string;
                        order?: number | null;
                        parentId?: string | null;
                        updatedBy?: string | null;
                        updatedTime?: string | null;
                        /** @description 字典项值 */
                        value: string;
                    };
                };
            };
        };
    };
    getApiV1DictItemById: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description 字典项ID */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 成功获取字典项详情 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        createdBy?: string | null;
                        createdTime?: string | null;
                        description?: string | null;
                        /** @description 字典ID */
                        dictId: string;
                        enabled?: ("Y" | "N" | "D") | null;
                        /** @description ID */
                        id: string;
                        /** @description 字典项文本 */
                        label: string;
                        order?: number | null;
                        parentId?: string | null;
                        updatedBy?: string | null;
                        updatedTime?: string | null;
                        /** @description 字典项值 */
                        value: string;
                    };
                };
            };
        };
    };
    putApiV1DictItemById: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description 字典项ID */
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    description?: (string | null) | null;
                    dictId?: string | null;
                    enabled?: (("Y" | "N" | "D") | null) | null;
                    label?: string | null;
                    order?: (number | null) | null;
                    parentId?: (string | null) | null;
                    value?: string | null;
                };
            };
        };
        responses: {
            /** @description 成功更新字典项 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        createdBy?: string | null;
                        createdTime?: string | null;
                        description?: string | null;
                        /** @description 字典ID */
                        dictId: string;
                        enabled?: ("Y" | "N" | "D") | null;
                        /** @description ID */
                        id: string;
                        /** @description 字典项文本 */
                        label: string;
                        order?: number | null;
                        parentId?: string | null;
                        updatedBy?: string | null;
                        updatedTime?: string | null;
                        /** @description 字典项值 */
                        value: string;
                    };
                };
            };
        };
    };
    deleteApiV1DictItemById: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description 字典项ID */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 成功删除字典项 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": boolean;
                };
            };
        };
    };
    getApiV1DictItemAll: {
        parameters: {
            query: {
                /** @description 字典ID */
                dictId: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 成功获取全部字典项（非分页） */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        createdBy?: string | null;
                        createdTime?: string | null;
                        description?: string | null;
                        /** @description 字典ID */
                        dictId: string;
                        enabled?: ("Y" | "N" | "D") | null;
                        /** @description ID */
                        id: string;
                        /** @description 字典项文本 */
                        label: string;
                        order?: number | null;
                        parentId?: string | null;
                        updatedBy?: string | null;
                        updatedTime?: string | null;
                        /** @description 字典项值 */
                        value: string;
                    }[];
                };
            };
        };
    };
    getApiV1DictItemList: {
        parameters: {
            query?: {
                dictId?: string | null;
                enabled?: (("Y" | "N" | "D") | null) | null;
                label?: string | null;
                page?: (number | string) | null;
                pageSize?: (number | string) | null;
                sort?: string | null;
                value?: string | null;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 成功获取字典项列表 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description 字典项列表 */
                        list: {
                            createdBy?: string | null;
                            createdTime?: string | null;
                            description?: string | null;
                            /** @description 字典ID */
                            dictId: string;
                            enabled?: ("Y" | "N" | "D") | null;
                            /** @description ID */
                            id: string;
                            /** @description 字典项文本 */
                            label: string;
                            order?: number | null;
                            parentId?: string | null;
                            updatedBy?: string | null;
                            updatedTime?: string | null;
                            /** @description 字典项值 */
                            value: string;
                        }[];
                        /** @description 页码 */
                        page: number | string;
                        /** @description 每页数量 */
                        pageSize: number | string;
                        /** @description 总数 */
                        total: number;
                    };
                };
            };
        };
    };
    getApiV1DictItemTreeById: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description 字典ID */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 成功获取字典项树 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description 子字典项 */
                        children: {
                            createdBy?: string | null;
                            createdTime?: string | null;
                            description?: string | null;
                            /** @description 字典ID */
                            dictId: string;
                            enabled?: ("Y" | "N" | "D") | null;
                            /** @description ID */
                            id: string;
                            /** @description 字典项文本 */
                            label: string;
                            order?: number | null;
                            parentId?: string | null;
                            updatedBy?: string | null;
                            updatedTime?: string | null;
                            /** @description 字典项值 */
                            value: string;
                        }[];
                        createdBy?: string | null;
                        createdTime?: string | null;
                        description?: string | null;
                        /** @description 字典ID */
                        dictId: string;
                        enabled?: ("Y" | "N" | "D") | null;
                        /** @description ID */
                        id: string;
                        /** @description 字典项文本 */
                        label: string;
                        order?: number | null;
                        parentId?: string | null;
                        updatedBy?: string | null;
                        updatedTime?: string | null;
                        /** @description 字典项值 */
                        value: string;
                    }[];
                };
            };
        };
    };
    getApiV1DictById: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description 字典ID */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 成功获取字典详情 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description 字典编码 */
                        code: string;
                        createdBy?: string | null;
                        createdTime?: string | null;
                        description?: string | null;
                        enabled?: ("Y" | "N" | "D") | null;
                        /** @description ID */
                        id: string;
                        isSystem?: ("Y" | "N") | null;
                        /** @description 字典名称 */
                        name: string;
                        updatedBy?: string | null;
                        updatedTime?: string | null;
                    };
                };
            };
        };
    };
    putApiV1DictById: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description 字典ID */
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    code?: string | null;
                    description?: (string | null) | null;
                    enabled?: (("Y" | "N" | "D") | null) | null;
                    isSystem?: (("Y" | "N") | null) | null;
                    name?: string | null;
                };
            };
        };
        responses: {
            /** @description 成功更新字典 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description 字典编码 */
                        code: string;
                        createdBy?: string | null;
                        createdTime?: string | null;
                        description?: string | null;
                        enabled?: ("Y" | "N" | "D") | null;
                        /** @description ID */
                        id: string;
                        isSystem?: ("Y" | "N") | null;
                        /** @description 字典名称 */
                        name: string;
                        updatedBy?: string | null;
                        updatedTime?: string | null;
                    };
                };
            };
        };
    };
    deleteApiV1DictById: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description 字典ID */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 成功删除字典 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": boolean;
                };
            };
        };
    };
    getApiV1DictAll: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 成功获取全部字典（非分页） */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description 字典编码 */
                        code: string;
                        createdBy?: string | null;
                        createdTime?: string | null;
                        description?: string | null;
                        enabled?: ("Y" | "N" | "D") | null;
                        /** @description ID */
                        id: string;
                        isSystem?: ("Y" | "N") | null;
                        /** @description 字典名称 */
                        name: string;
                        updatedBy?: string | null;
                        updatedTime?: string | null;
                    }[];
                };
            };
        };
    };
    getApiV1DictList: {
        parameters: {
            query?: {
                code?: string | null;
                enabled?: (("Y" | "N" | "D") | null) | null;
                isSystem?: (("Y" | "N") | null) | null;
                name?: string | null;
                page?: (number | string) | null;
                pageSize?: (number | string) | null;
                sort?: string | null;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 成功获取字典列表 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description 字典列表 */
                        list: {
                            /** @description 字典编码 */
                            code: string;
                            createdBy?: string | null;
                            createdTime?: string | null;
                            description?: string | null;
                            enabled?: ("Y" | "N" | "D") | null;
                            /** @description ID */
                            id: string;
                            isSystem?: ("Y" | "N") | null;
                            /** @description 字典名称 */
                            name: string;
                            updatedBy?: string | null;
                            updatedTime?: string | null;
                        }[];
                        /** @description 页码 */
                        page: number | string;
                        /** @description 每页数量 */
                        pageSize: number | string;
                        /** @description 总数 */
                        total: number;
                    };
                };
            };
        };
    };
    postApiV1Menu: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** @description 菜单编码 */
                    code: string;
                    description?: string | null;
                    enabled?: ("Y" | "N" | "D") | null;
                    href?: string | null;
                    i18nKey?: string | null;
                    icon?: string | null;
                    iframeUrl?: string | null;
                    keepAlive?: ("Y" | "N") | null;
                    /**
                     * @description 菜单类型
                     * @enum {string}
                     */
                    menuType: "directory" | "menu" | "page" | "iframe" | "link" | "button" | "other";
                    multiTab?: ("Y" | "N") | null;
                    /** @description 菜单名称 */
                    name: string;
                    order?: (number | string) | null;
                    parentId?: string | null;
                    pinned?: ("Y" | "N") | null;
                    requiresAuth?: ("Y" | "N") | null;
                    routeComponent?: string | null;
                    routeLayout?: string | null;
                    routeName?: string | null;
                    routeParams?: {
                        [key: string]: string | number | boolean | null | unknown;
                    } | null;
                    routePath?: string | null;
                    routeQueries?: {
                        [key: string]: string | number | boolean | null | unknown;
                    } | null;
                    routeRedirect?: string | null;
                };
            };
        };
        responses: {
            /** @description 菜单创建成功 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description 菜单编码 */
                        code: string;
                        createdBy?: string | null;
                        createdTime?: string | null;
                        description?: string | null;
                        enabled?: ("Y" | "N" | "D") | null;
                        href?: string | null;
                        i18nKey?: string | null;
                        icon?: string | null;
                        /** @description ID */
                        id: string;
                        iframeUrl?: string | null;
                        keepAlive?: ("Y" | "N") | null;
                        /**
                         * @description 菜单类型
                         * @enum {string}
                         */
                        menuType: "directory" | "menu" | "page" | "iframe" | "link" | "button" | "other";
                        multiTab?: ("Y" | "N") | null;
                        /** @description 菜单名称 */
                        name: string;
                        order?: (number | string) | null;
                        parentId?: string | null;
                        pinned?: ("Y" | "N") | null;
                        requiresAuth?: ("Y" | "N") | null;
                        routeComponent?: string | null;
                        routeLayout?: string | null;
                        routeName?: string | null;
                        routeParams?: {
                            [key: string]: string | number | boolean | null | unknown;
                        } | null;
                        routePath?: string | null;
                        routeQueries?: {
                            [key: string]: string | number | boolean | null | unknown;
                        } | null;
                        routeRedirect?: string | null;
                        updatedBy?: string | null;
                        updatedTime?: string | null;
                    };
                };
            };
        };
    };
    getApiV1MenuById: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description 菜单ID */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 成功获取菜单详情 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description 菜单编码 */
                        code: string;
                        createdBy?: string | null;
                        createdTime?: string | null;
                        description?: string | null;
                        enabled?: ("Y" | "N" | "D") | null;
                        href?: string | null;
                        i18nKey?: string | null;
                        icon?: string | null;
                        /** @description ID */
                        id: string;
                        iframeUrl?: string | null;
                        keepAlive?: ("Y" | "N") | null;
                        /**
                         * @description 菜单类型
                         * @enum {string}
                         */
                        menuType: "directory" | "menu" | "page" | "iframe" | "link" | "button" | "other";
                        multiTab?: ("Y" | "N") | null;
                        /** @description 菜单名称 */
                        name: string;
                        order?: (number | string) | null;
                        parentId?: string | null;
                        pinned?: ("Y" | "N") | null;
                        requiresAuth?: ("Y" | "N") | null;
                        routeComponent?: string | null;
                        routeLayout?: string | null;
                        routeName?: string | null;
                        routeParams?: {
                            [key: string]: string | number | boolean | null | unknown;
                        } | null;
                        routePath?: string | null;
                        routeQueries?: {
                            [key: string]: string | number | boolean | null | unknown;
                        } | null;
                        routeRedirect?: string | null;
                        updatedBy?: string | null;
                        updatedTime?: string | null;
                    };
                };
            };
        };
    };
    putApiV1MenuById: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description 菜单ID */
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    code?: string | null;
                    description?: (string | null) | null;
                    enabled?: (("Y" | "N" | "D") | null) | null;
                    href?: (string | null) | null;
                    i18nKey?: (string | null) | null;
                    icon?: (string | null) | null;
                    iframeUrl?: (string | null) | null;
                    keepAlive?: (("Y" | "N") | null) | null;
                    menuType?: ("directory" | "menu" | "page" | "iframe" | "link" | "button" | "other") | null;
                    multiTab?: (("Y" | "N") | null) | null;
                    name?: string | null;
                    order?: ((number | string) | null) | null;
                    parentId?: (string | null) | null;
                    pinned?: (("Y" | "N") | null) | null;
                    requiresAuth?: (("Y" | "N") | null) | null;
                    routeComponent?: (string | null) | null;
                    routeLayout?: (string | null) | null;
                    routeName?: (string | null) | null;
                    routeParams?: ({
                        [key: string]: string | number | boolean | null | unknown;
                    } | null) | null;
                    routePath?: (string | null) | null;
                    routeQueries?: ({
                        [key: string]: string | number | boolean | null | unknown;
                    } | null) | null;
                    routeRedirect?: (string | null) | null;
                };
            };
        };
        responses: {
            /** @description 菜单更新成功 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description 菜单编码 */
                        code: string;
                        createdBy?: string | null;
                        createdTime?: string | null;
                        description?: string | null;
                        enabled?: ("Y" | "N" | "D") | null;
                        href?: string | null;
                        i18nKey?: string | null;
                        icon?: string | null;
                        /** @description ID */
                        id: string;
                        iframeUrl?: string | null;
                        keepAlive?: ("Y" | "N") | null;
                        /**
                         * @description 菜单类型
                         * @enum {string}
                         */
                        menuType: "directory" | "menu" | "page" | "iframe" | "link" | "button" | "other";
                        multiTab?: ("Y" | "N") | null;
                        /** @description 菜单名称 */
                        name: string;
                        order?: (number | string) | null;
                        parentId?: string | null;
                        pinned?: ("Y" | "N") | null;
                        requiresAuth?: ("Y" | "N") | null;
                        routeComponent?: string | null;
                        routeLayout?: string | null;
                        routeName?: string | null;
                        routeParams?: {
                            [key: string]: string | number | boolean | null | unknown;
                        } | null;
                        routePath?: string | null;
                        routeQueries?: {
                            [key: string]: string | number | boolean | null | unknown;
                        } | null;
                        routeRedirect?: string | null;
                        updatedBy?: string | null;
                        updatedTime?: string | null;
                    };
                };
            };
        };
    };
    deleteApiV1MenuById: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description 菜单ID */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 菜单删除成功 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": boolean;
                };
            };
        };
    };
    getApiV1MenuAll: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 成功获取所有菜单 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description 菜单编码 */
                        code: string;
                        createdBy?: string | null;
                        createdTime?: string | null;
                        description?: string | null;
                        enabled?: ("Y" | "N" | "D") | null;
                        href?: string | null;
                        i18nKey?: string | null;
                        icon?: string | null;
                        /** @description ID */
                        id: string;
                        iframeUrl?: string | null;
                        keepAlive?: ("Y" | "N") | null;
                        /**
                         * @description 菜单类型
                         * @enum {string}
                         */
                        menuType: "directory" | "menu" | "page" | "iframe" | "link" | "button" | "other";
                        multiTab?: ("Y" | "N") | null;
                        /** @description 菜单名称 */
                        name: string;
                        order?: (number | string) | null;
                        parentId?: string | null;
                        pinned?: ("Y" | "N") | null;
                        requiresAuth?: ("Y" | "N") | null;
                        routeComponent?: string | null;
                        routeLayout?: string | null;
                        routeName?: string | null;
                        routeParams?: {
                            [key: string]: string | number | boolean | null | unknown;
                        } | null;
                        routePath?: string | null;
                        routeQueries?: {
                            [key: string]: string | number | boolean | null | unknown;
                        } | null;
                        routeRedirect?: string | null;
                        updatedBy?: string | null;
                        updatedTime?: string | null;
                    }[];
                };
            };
        };
    };
    postApiV1MenuBatch: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** @description 菜单ID列表 */
                    ids: string[];
                };
            };
        };
        responses: {
            /** @description 批量删除菜单成功 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": boolean;
                };
            };
        };
    };
    postApiV1MenuExistPath: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** @description 路由路径 */
                    path: string;
                };
            };
        };
        responses: {
            /** @description 检查菜单路由是否存在成功 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": boolean;
                };
            };
        };
    };
    getApiV1MenuList: {
        parameters: {
            query?: {
                code?: string | null;
                enabled?: (("Y" | "N" | "D") | null) | null;
                keepAlive?: (("Y" | "N") | null) | null;
                menuType?: ("directory" | "menu" | "page" | "iframe" | "link" | "button" | "other") | null;
                multiTab?: (("Y" | "N") | null) | null;
                name?: string | null;
                page?: (number | string) | null;
                pageSize?: (number | string) | null;
                pinned?: (("Y" | "N") | null) | null;
                requiresAuth?: (("Y" | "N") | null) | null;
                routeLayout?: (string | null) | null;
                routeName?: (string | null) | null;
                routePath?: (string | null) | null;
                sort?: string | null;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 成功获取菜单列表 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description 菜单列表 */
                        list: {
                            /** @description 菜单编码 */
                            code: string;
                            createdBy?: string | null;
                            createdTime?: string | null;
                            description?: string | null;
                            enabled?: ("Y" | "N" | "D") | null;
                            href?: string | null;
                            i18nKey?: string | null;
                            icon?: string | null;
                            /** @description ID */
                            id: string;
                            iframeUrl?: string | null;
                            keepAlive?: ("Y" | "N") | null;
                            /**
                             * @description 菜单类型
                             * @enum {string}
                             */
                            menuType: "directory" | "menu" | "page" | "iframe" | "link" | "button" | "other";
                            multiTab?: ("Y" | "N") | null;
                            /** @description 菜单名称 */
                            name: string;
                            order?: (number | string) | null;
                            parentId?: string | null;
                            pinned?: ("Y" | "N") | null;
                            requiresAuth?: ("Y" | "N") | null;
                            routeComponent?: string | null;
                            routeLayout?: string | null;
                            routeName?: string | null;
                            routeParams?: {
                                [key: string]: string | number | boolean | null | unknown;
                            } | null;
                            routePath?: string | null;
                            routeQueries?: {
                                [key: string]: string | number | boolean | null | unknown;
                            } | null;
                            routeRedirect?: string | null;
                            updatedBy?: string | null;
                            updatedTime?: string | null;
                        }[];
                        /** @description 页码 */
                        page: number | string;
                        /** @description 每页数量 */
                        pageSize: number | string;
                        /** @description 总数 */
                        total: number;
                    };
                };
            };
        };
    };
    getApiV1MenuPublic: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 成功获取公开的菜单列表 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description 菜单编码 */
                        code: string;
                        createdBy?: string | null;
                        createdTime?: string | null;
                        description?: string | null;
                        enabled?: ("Y" | "N" | "D") | null;
                        href?: string | null;
                        i18nKey?: string | null;
                        icon?: string | null;
                        /** @description ID */
                        id: string;
                        iframeUrl?: string | null;
                        keepAlive?: ("Y" | "N") | null;
                        /**
                         * @description 菜单类型
                         * @enum {string}
                         */
                        menuType: "directory" | "menu" | "page" | "iframe" | "link" | "button" | "other";
                        multiTab?: ("Y" | "N") | null;
                        /** @description 菜单名称 */
                        name: string;
                        order?: (number | string) | null;
                        parentId?: string | null;
                        pinned?: ("Y" | "N") | null;
                        requiresAuth?: ("Y" | "N") | null;
                        routeComponent?: string | null;
                        routeLayout?: string | null;
                        routeName?: string | null;
                        routeParams?: {
                            [key: string]: string | number | boolean | null | unknown;
                        } | null;
                        routePath?: string | null;
                        routeQueries?: {
                            [key: string]: string | number | boolean | null | unknown;
                        } | null;
                        routeRedirect?: string | null;
                        updatedBy?: string | null;
                        updatedTime?: string | null;
                    }[];
                };
            };
        };
    };
    getApiV1MenuTree: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 成功获取菜单树 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description 子菜单 */
                        children: {
                            /** @description 菜单编码 */
                            code: string;
                            createdBy?: string | null;
                            createdTime?: string | null;
                            description?: string | null;
                            enabled?: ("Y" | "N" | "D") | null;
                            href?: string | null;
                            i18nKey?: string | null;
                            icon?: string | null;
                            /** @description ID */
                            id: string;
                            iframeUrl?: string | null;
                            keepAlive?: ("Y" | "N") | null;
                            /**
                             * @description 菜单类型
                             * @enum {string}
                             */
                            menuType: "directory" | "menu" | "page" | "iframe" | "link" | "button" | "other";
                            multiTab?: ("Y" | "N") | null;
                            /** @description 菜单名称 */
                            name: string;
                            order?: (number | string) | null;
                            parentId?: string | null;
                            pinned?: ("Y" | "N") | null;
                            requiresAuth?: ("Y" | "N") | null;
                            routeComponent?: string | null;
                            routeLayout?: string | null;
                            routeName?: string | null;
                            routeParams?: {
                                [key: string]: string | number | boolean | null | unknown;
                            } | null;
                            routePath?: string | null;
                            routeQueries?: {
                                [key: string]: string | number | boolean | null | unknown;
                            } | null;
                            routeRedirect?: string | null;
                            updatedBy?: string | null;
                            updatedTime?: string | null;
                        }[];
                        /** @description 菜单编码 */
                        code: string;
                        createdBy?: string | null;
                        createdTime?: string | null;
                        description?: string | null;
                        enabled?: ("Y" | "N" | "D") | null;
                        href?: string | null;
                        i18nKey?: string | null;
                        icon?: string | null;
                        /** @description ID */
                        id: string;
                        iframeUrl?: string | null;
                        keepAlive?: ("Y" | "N") | null;
                        /**
                         * @description 菜单类型
                         * @enum {string}
                         */
                        menuType: "directory" | "menu" | "page" | "iframe" | "link" | "button" | "other";
                        multiTab?: ("Y" | "N") | null;
                        /** @description 菜单名称 */
                        name: string;
                        order?: (number | string) | null;
                        parentId?: string | null;
                        pinned?: ("Y" | "N") | null;
                        requiresAuth?: ("Y" | "N") | null;
                        routeComponent?: string | null;
                        routeLayout?: string | null;
                        routeName?: string | null;
                        routeParams?: {
                            [key: string]: string | number | boolean | null | unknown;
                        } | null;
                        routePath?: string | null;
                        routeQueries?: {
                            [key: string]: string | number | boolean | null | unknown;
                        } | null;
                        routeRedirect?: string | null;
                        updatedBy?: string | null;
                        updatedTime?: string | null;
                    };
                };
            };
        };
    };
    getApiV1MenuUser: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 成功获取用户菜单 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description 菜单编码 */
                        code: string;
                        createdBy?: string | null;
                        createdTime?: string | null;
                        description?: string | null;
                        enabled?: ("Y" | "N" | "D") | null;
                        href?: string | null;
                        i18nKey?: string | null;
                        icon?: string | null;
                        /** @description ID */
                        id: string;
                        iframeUrl?: string | null;
                        keepAlive?: ("Y" | "N") | null;
                        /**
                         * @description 菜单类型
                         * @enum {string}
                         */
                        menuType: "directory" | "menu" | "page" | "iframe" | "link" | "button" | "other";
                        multiTab?: ("Y" | "N") | null;
                        /** @description 菜单名称 */
                        name: string;
                        order?: (number | string) | null;
                        parentId?: string | null;
                        pinned?: ("Y" | "N") | null;
                        requiresAuth?: ("Y" | "N") | null;
                        routeComponent?: string | null;
                        routeLayout?: string | null;
                        routeName?: string | null;
                        routeParams?: {
                            [key: string]: string | number | boolean | null | unknown;
                        } | null;
                        routePath?: string | null;
                        routeQueries?: {
                            [key: string]: string | number | boolean | null | unknown;
                        } | null;
                        routeRedirect?: string | null;
                        updatedBy?: string | null;
                        updatedTime?: string | null;
                    }[];
                };
            };
        };
    };
    postApiV1Org: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** @description 组织编码 */
                    code: string;
                    description?: string | null;
                    enabled?: ("Y" | "N" | "D") | null;
                    /** @description 组织名称 */
                    name: string;
                    parentId?: string | null;
                    roleIds?: string[] | null;
                };
            };
        };
        responses: {
            /** @description 组织创建成功 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description 组织编码 */
                        code: string;
                        createdBy?: string | null;
                        createdTime?: string | null;
                        description?: string | null;
                        enabled?: ("Y" | "N" | "D") | null;
                        /** @description ID */
                        id: string;
                        /** @description 组织名称 */
                        name: string;
                        parentId?: string | null;
                        updatedBy?: string | null;
                        updatedTime?: string | null;
                    };
                };
            };
        };
    };
    getApiV1OrgById: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description 组织ID */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 成功获取组织详情 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description 组织编码 */
                        code: string;
                        createdBy?: string | null;
                        createdTime?: string | null;
                        description?: string | null;
                        enabled?: ("Y" | "N" | "D") | null;
                        /** @description ID */
                        id: string;
                        /** @description 组织名称 */
                        name: string;
                        parentId?: string | null;
                        updatedBy?: string | null;
                        updatedTime?: string | null;
                    };
                };
            };
        };
    };
    putApiV1OrgById: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description 组织ID */
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    code?: string | null;
                    description?: (string | null) | null;
                    enabled?: (("Y" | "N" | "D") | null) | null;
                    name?: string | null;
                    parentId?: (string | null) | null;
                    roleIds?: (string[] | null) | null;
                };
            };
        };
        responses: {
            /** @description 组织更新成功 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description 组织编码 */
                        code: string;
                        createdBy?: string | null;
                        createdTime?: string | null;
                        description?: string | null;
                        enabled?: ("Y" | "N" | "D") | null;
                        /** @description ID */
                        id: string;
                        /** @description 组织名称 */
                        name: string;
                        parentId?: string | null;
                        updatedBy?: string | null;
                        updatedTime?: string | null;
                    };
                };
            };
        };
    };
    deleteApiV1OrgById: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description 组织ID */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 组织删除成功 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description 组织编码 */
                        code: string;
                        createdBy?: string | null;
                        createdTime?: string | null;
                        description?: string | null;
                        enabled?: ("Y" | "N" | "D") | null;
                        /** @description ID */
                        id: string;
                        /** @description 组织名称 */
                        name: string;
                        parentId?: string | null;
                        updatedBy?: string | null;
                        updatedTime?: string | null;
                    };
                };
            };
        };
    };
    getApiV1OrgByIdUsers: {
        parameters: {
            query: {
                /** @description 页码 */
                page: number | string;
                /** @description 每页数量 */
                pageSize: number | string;
            };
            header?: never;
            path: {
                /** @description 组织ID */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 成功获取组织的所有用户 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        list: {
                            avatar?: string | null;
                            createdBy?: string | null;
                            createdTime?: string | null;
                            email?: string | null;
                            enabled?: ("Y" | "N" | "D") | null;
                            fullName?: string | null;
                            homePath?: string | null;
                            /** @description ID */
                            id: string;
                            phone?: string | null;
                            updatedBy?: string | null;
                            updatedTime?: string | null;
                            /** @description 用户名 */
                            username: string;
                        }[];
                        /** @description 页码 */
                        page: number | string;
                        /** @description 每页数量 */
                        pageSize: number | string;
                        /** @description 总数 */
                        total: number;
                    };
                };
            };
        };
    };
    postApiV1OrgByIdUsers: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description 组织ID */
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    userIds: string[];
                };
            };
        };
        responses: {
            /** @description 成功向组织添加用户 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        userIds: string[];
                    };
                };
            };
        };
    };
    deleteApiV1OrgByIdUsers: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description 组织ID */
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    userIds: string[];
                };
            };
        };
        responses: {
            /** @description 成功从组织移除用户 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        userIds: string[];
                    };
                };
            };
        };
    };
    getApiV1OrgAll: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 成功获取全部组织（非分页） */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description 组织编码 */
                        code: string;
                        createdBy?: string | null;
                        createdTime?: string | null;
                        description?: string | null;
                        enabled?: ("Y" | "N" | "D") | null;
                        /** @description ID */
                        id: string;
                        /** @description 组织名称 */
                        name: string;
                        parentId?: string | null;
                        updatedBy?: string | null;
                        updatedTime?: string | null;
                    }[];
                };
            };
        };
    };
    getApiV1OrgList: {
        parameters: {
            query?: {
                code?: string | null;
                enabled?: (("Y" | "N" | "D") | null) | null;
                name?: string | null;
                page?: (number | string) | null;
                pageSize?: (number | string) | null;
                sort?: string | null;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 成功获取组织列表 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        list: {
                            /** @description 组织编码 */
                            code: string;
                            createdBy?: string | null;
                            createdTime?: string | null;
                            description?: string | null;
                            enabled?: ("Y" | "N" | "D") | null;
                            /** @description ID */
                            id: string;
                            /** @description 组织名称 */
                            name: string;
                            parentId?: string | null;
                            updatedBy?: string | null;
                            updatedTime?: string | null;
                        }[];
                        /** @description 页码 */
                        page: number | string;
                        /** @description 每页数量 */
                        pageSize: number | string;
                        /** @description 总数 */
                        total: number;
                    };
                };
            };
        };
    };
    postApiV1Permission: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** @description 权限编码 */
                    code: string;
                    description?: string | null;
                    enabled?: ("Y" | "N" | "D") | null;
                    /** @description 权限名称 */
                    name: string;
                    resourceId?: string | null;
                    /** @description 资源类型 */
                    resourceType: string;
                };
            };
        };
        responses: {
            /** @description 权限创建成功 */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description 权限编码 */
                        code: string;
                        createdBy?: string | null;
                        createdTime?: string | null;
                        description?: string | null;
                        enabled?: ("Y" | "N" | "D") | null;
                        /** @description ID */
                        id: string;
                        /** @description 权限名称 */
                        name: string;
                        resourceId?: string | null;
                        /** @description 资源类型 */
                        resourceType: string;
                        updatedBy?: string | null;
                        updatedTime?: string | null;
                    };
                };
            };
        };
    };
    getApiV1PermissionById: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description 权限ID */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 成功获取权限详情 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description 权限编码 */
                        code: string;
                        createdBy?: string | null;
                        createdTime?: string | null;
                        description?: string | null;
                        enabled?: ("Y" | "N" | "D") | null;
                        /** @description ID */
                        id: string;
                        /** @description 权限名称 */
                        name: string;
                        resourceId?: string | null;
                        /** @description 资源类型 */
                        resourceType: string;
                        updatedBy?: string | null;
                        updatedTime?: string | null;
                    };
                };
            };
        };
    };
    putApiV1PermissionById: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description 权限ID */
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    code?: string | null;
                    description?: (string | null) | null;
                    enabled?: (("Y" | "N" | "D") | null) | null;
                    name?: string | null;
                    resourceId?: (string | null) | null;
                    resourceType?: string | null;
                };
            };
        };
        responses: {
            /** @description 权限更新成功 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description 权限编码 */
                        code: string;
                        createdBy?: string | null;
                        createdTime?: string | null;
                        description?: string | null;
                        enabled?: ("Y" | "N" | "D") | null;
                        /** @description ID */
                        id: string;
                        /** @description 权限名称 */
                        name: string;
                        resourceId?: string | null;
                        /** @description 资源类型 */
                        resourceType: string;
                        updatedBy?: string | null;
                        updatedTime?: string | null;
                    };
                };
            };
        };
    };
    deleteApiV1PermissionById: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description 权限ID */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 权限删除成功 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": boolean;
                };
            };
        };
    };
    getApiV1PermissionAll: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 成功获取全部权限（非分页） */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description 权限编码 */
                        code: string;
                        createdBy?: string | null;
                        createdTime?: string | null;
                        description?: string | null;
                        enabled?: ("Y" | "N" | "D") | null;
                        /** @description ID */
                        id: string;
                        /** @description 权限名称 */
                        name: string;
                        resourceId?: string | null;
                        /** @description 资源类型 */
                        resourceType: string;
                        updatedBy?: string | null;
                        updatedTime?: string | null;
                    }[];
                };
            };
        };
    };
    getApiV1PermissionList: {
        parameters: {
            query?: {
                code?: string | null;
                enabled?: (("Y" | "N" | "D") | null) | null;
                name?: string | null;
                page?: (number | string) | null;
                pageSize?: (number | string) | null;
                resourceType?: string | null;
                sort?: string | null;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 成功获取权限列表 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description 权限列表 */
                        list: {
                            /** @description 权限编码 */
                            code: string;
                            createdBy?: string | null;
                            createdTime?: string | null;
                            description?: string | null;
                            enabled?: ("Y" | "N" | "D") | null;
                            /** @description ID */
                            id: string;
                            /** @description 权限名称 */
                            name: string;
                            resourceId?: string | null;
                            /** @description 资源类型 */
                            resourceType: string;
                            updatedBy?: string | null;
                            updatedTime?: string | null;
                        }[];
                        /** @description 页码 */
                        page: number | string;
                        /** @description 每页数量 */
                        pageSize: number | string;
                        /** @description 总数 */
                        total: number;
                    };
                };
            };
        };
    };
    getApiV1PluginsDemoInfo: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 成功获取 Demo 后端插件信息 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        description: string;
                        name: string;
                        version: string;
                    };
                };
            };
        };
    };
    getApiV1PluginsDemoRequestLogs: {
        parameters: {
            query?: {
                method?: string | null;
                page?: (number | string) | null;
                pageSize?: (number | string) | null;
                path?: string | null;
                requestId?: string | null;
                sort?: string | null;
                statusCode?: (number | string) | null;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 成功获取 Demo 后端插件请求日志 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        list: {
                            createdTime: string;
                            durationMs: number;
                            id: string;
                            ip?: string | null;
                            method: string;
                            path: string;
                            requestId: string;
                            statusCode: number;
                            userAgent?: string | null;
                            userId?: string | null;
                        }[];
                        /** @description 页码 */
                        page: number | string;
                        /** @description 每页数量 */
                        pageSize: number | string;
                        /** @description 总数 */
                        total: number;
                    };
                };
            };
        };
    };
    postApiV1PluginsDemoRequestLogs: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    durationMs: number;
                    ip?: string | null;
                    method: string;
                    path: string;
                    requestId: string;
                    statusCode: number;
                    userAgent?: string | null;
                    userId?: string | null;
                };
            };
        };
        responses: {
            /** @description 成功写入 Demo 后端插件请求日志 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        createdTime: string;
                        durationMs: number;
                        id: string;
                        ip?: string | null;
                        method: string;
                        path: string;
                        requestId: string;
                        statusCode: number;
                        userAgent?: string | null;
                        userId?: string | null;
                    };
                };
            };
        };
    };
    postApiV1Role: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** @description 角色编码 */
                    code: string;
                    description?: string | null;
                    enabled?: ("Y" | "N" | "D") | null;
                    /** @description 角色名称 */
                    name: string;
                    permissionIds?: string[] | null;
                };
            };
        };
        responses: {
            /** @description 角色创建成功 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description 角色编码 */
                        code: string;
                        createdBy?: string | null;
                        createdTime?: string | null;
                        description?: string | null;
                        enabled?: ("Y" | "N" | "D") | null;
                        /** @description ID */
                        id: string;
                        /** @description 角色名称 */
                        name: string;
                        updatedBy?: string | null;
                        updatedTime?: string | null;
                    };
                };
            };
        };
    };
    getApiV1RoleById: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description 角色ID */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 成功获取角色详情 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description 角色编码 */
                        code: string;
                        createdBy?: string | null;
                        createdTime?: string | null;
                        description?: string | null;
                        enabled?: ("Y" | "N" | "D") | null;
                        /** @description ID */
                        id: string;
                        /** @description 角色名称 */
                        name: string;
                        updatedBy?: string | null;
                        updatedTime?: string | null;
                    };
                };
            };
        };
    };
    putApiV1RoleById: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description 角色ID */
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    code?: string | null;
                    description?: (string | null) | null;
                    enabled?: (("Y" | "N" | "D") | null) | null;
                    name?: string | null;
                    permissionIds?: (string[] | null) | null;
                };
            };
        };
        responses: {
            /** @description 角色更新成功 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description 角色编码 */
                        code: string;
                        createdBy?: string | null;
                        createdTime?: string | null;
                        description?: string | null;
                        enabled?: ("Y" | "N" | "D") | null;
                        /** @description ID */
                        id: string;
                        /** @description 角色名称 */
                        name: string;
                        updatedBy?: string | null;
                        updatedTime?: string | null;
                    };
                };
            };
        };
    };
    deleteApiV1RoleById: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description 角色ID */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 角色删除成功 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": boolean;
                };
            };
        };
    };
    getApiV1RoleAll: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 成功获取全部角色 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description 角色编码 */
                        code: string;
                        createdBy?: string | null;
                        createdTime?: string | null;
                        description?: string | null;
                        enabled?: ("Y" | "N" | "D") | null;
                        /** @description ID */
                        id: string;
                        /** @description 角色名称 */
                        name: string;
                        updatedBy?: string | null;
                        updatedTime?: string | null;
                    }[];
                };
            };
        };
    };
    getApiV1RoleDetailById: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description 角色ID */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 成功获取角色详情(包含权限列表) */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description 角色编码 */
                        code: string;
                        createdBy?: string | null;
                        createdTime?: string | null;
                        description?: string | null;
                        enabled?: ("Y" | "N" | "D") | null;
                        /** @description ID */
                        id: string;
                        /** @description 角色名称 */
                        name: string;
                        /** @description 权限列表 */
                        permissions: {
                            /** @description 权限编码 */
                            code: string;
                            /** @description ID */
                            id: string;
                            /** @description 权限名称 */
                            name: string;
                        }[];
                        updatedBy?: string | null;
                        updatedTime?: string | null;
                    };
                };
            };
        };
    };
    getApiV1RoleList: {
        parameters: {
            query?: {
                code?: string | null;
                enabled?: (("Y" | "N" | "D") | null) | null;
                name?: string | null;
                page?: (number | string) | null;
                pageSize?: (number | string) | null;
                permissionIds?: (string[] | null) | null;
                sort?: string | null;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 成功获取角色列表 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description 角色列表 */
                        list: {
                            /** @description 角色编码 */
                            code: string;
                            createdBy?: string | null;
                            createdTime?: string | null;
                            description?: string | null;
                            enabled?: ("Y" | "N" | "D") | null;
                            /** @description ID */
                            id: string;
                            /** @description 角色名称 */
                            name: string;
                            updatedBy?: string | null;
                            updatedTime?: string | null;
                            /** @description 绑定用户数量 */
                            userCount: number;
                        }[];
                        /** @description 页码 */
                        page: number | string;
                        /** @description 每页数量 */
                        pageSize: number | string;
                        /** @description 总数 */
                        total: number;
                    };
                };
            };
        };
    };
    getApiV1RoleUser: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 成功获取用户角色列表 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description 角色编码 */
                        code: string;
                        createdBy?: string | null;
                        createdTime?: string | null;
                        description?: string | null;
                        enabled?: ("Y" | "N" | "D") | null;
                        /** @description ID */
                        id: string;
                        /** @description 角色名称 */
                        name: string;
                        updatedBy?: string | null;
                        updatedTime?: string | null;
                    }[];
                };
            };
        };
    };
    getApiV1RoleUserById: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description 角色ID */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 成功根据用户id获取角色列表 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description 角色编码 */
                        code: string;
                        createdBy?: string | null;
                        createdTime?: string | null;
                        description?: string | null;
                        enabled?: ("Y" | "N" | "D") | null;
                        /** @description ID */
                        id: string;
                        /** @description 角色名称 */
                        name: string;
                        updatedBy?: string | null;
                        updatedTime?: string | null;
                    }[];
                };
            };
        };
    };
    postApiV1User: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    avatar?: string | null;
                    email?: string | null;
                    enabled?: ("Y" | "N" | "D") | null;
                    fullName?: string | null;
                    homePath?: string | null;
                    /** @description 密码 */
                    password: string;
                    phone?: string | null;
                    roleIds?: string[] | null;
                    /** @description 用户名 */
                    username: string;
                };
            };
        };
        responses: {
            /** @description 用户创建成功 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        avatar?: string | null;
                        createdBy?: string | null;
                        createdTime?: string | null;
                        email?: string | null;
                        enabled?: ("Y" | "N" | "D") | null;
                        fullName?: string | null;
                        homePath?: string | null;
                        /** @description ID */
                        id: string;
                        phone?: string | null;
                        updatedBy?: string | null;
                        updatedTime?: string | null;
                        /** @description 用户名 */
                        username: string;
                    };
                };
            };
        };
    };
    getApiV1UserById: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description 用户ID */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 成功获取用户详情 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        avatar?: string | null;
                        createdBy?: string | null;
                        createdTime?: string | null;
                        email?: string | null;
                        enabled?: ("Y" | "N" | "D") | null;
                        fullName?: string | null;
                        homePath?: string | null;
                        /** @description ID */
                        id: string;
                        phone?: string | null;
                        updatedBy?: string | null;
                        updatedTime?: string | null;
                        /** @description 用户名 */
                        username: string;
                    };
                };
            };
        };
    };
    putApiV1UserById: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description 用户ID */
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    avatar?: (string | null) | null;
                    email?: (string | null) | null;
                    enabled?: (("Y" | "N" | "D") | null) | null;
                    fullName?: (string | null) | null;
                    homePath?: (string | null) | null;
                    password?: string | null;
                    phone?: (string | null) | null;
                    roleIds?: (string[] | null) | null;
                    username?: string | null;
                };
            };
        };
        responses: {
            /** @description 用户更新成功 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        avatar?: string | null;
                        createdBy?: string | null;
                        createdTime?: string | null;
                        email?: string | null;
                        enabled?: ("Y" | "N" | "D") | null;
                        fullName?: string | null;
                        homePath?: string | null;
                        /** @description ID */
                        id: string;
                        phone?: string | null;
                        updatedBy?: string | null;
                        updatedTime?: string | null;
                        /** @description 用户名 */
                        username: string;
                    };
                };
            };
        };
    };
    deleteApiV1UserById: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description 用户ID */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 用户删除成功 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        avatar?: string | null;
                        createdBy?: string | null;
                        createdTime?: string | null;
                        email?: string | null;
                        enabled?: ("Y" | "N" | "D") | null;
                        fullName?: string | null;
                        homePath?: string | null;
                        /** @description ID */
                        id: string;
                        phone?: string | null;
                        updatedBy?: string | null;
                        updatedTime?: string | null;
                        /** @description 用户名 */
                        username: string;
                    };
                };
            };
        };
    };
    getApiV1UserList: {
        parameters: {
            query?: {
                email?: (string | null) | null;
                enabled?: (("Y" | "N" | "D") | null) | null;
                fullName?: (string | null) | null;
                homePath?: (string | null) | null;
                page?: (number | string) | null;
                pageSize?: (number | string) | null;
                password?: string | null;
                phone?: (string | null) | null;
                roleIds?: (string[] | null) | null;
                sort?: string | null;
                username?: string | null;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 成功获取用户列表 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description 用户列表 */
                        list: {
                            avatar?: string | null;
                            createdBy?: string | null;
                            createdTime?: string | null;
                            email?: string | null;
                            enabled?: ("Y" | "N" | "D") | null;
                            fullName?: string | null;
                            homePath?: string | null;
                            /** @description ID */
                            id: string;
                            phone?: string | null;
                            /** @description 角色列表 */
                            roles: {
                                /** @description 角色编码 */
                                code: string;
                                enabled?: ("Y" | "N" | "D") | null;
                                /** @description ID */
                                id: string;
                                /** @description 角色名称 */
                                name: string;
                            }[];
                            updatedBy?: string | null;
                            updatedTime?: string | null;
                            /** @description 用户名 */
                            username: string;
                        }[];
                        /** @description 页码 */
                        page: number | string;
                        /** @description 每页数量 */
                        pageSize: number | string;
                        /** @description 总数 */
                        total: number;
                    };
                };
            };
        };
    };
    putApiV1UserPassword: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** @description 当前密码 */
                    currentPassword: string;
                    /** @description 新密码 */
                    newPassword: string;
                };
            };
        };
        responses: {
            /** @description 密码更新成功 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        avatar?: string | null;
                        createdBy?: string | null;
                        createdTime?: string | null;
                        email?: string | null;
                        enabled?: ("Y" | "N" | "D") | null;
                        fullName?: string | null;
                        homePath?: string | null;
                        /** @description ID */
                        id: string;
                        phone?: string | null;
                        updatedBy?: string | null;
                        updatedTime?: string | null;
                        /** @description 用户名 */
                        username: string;
                    };
                };
            };
        };
    };
}

