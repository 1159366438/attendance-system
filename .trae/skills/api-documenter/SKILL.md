---
name: "api-documenter"
description: "生成项目API接口文档，包括请求方式、路径、参数、响应格式和前后端接口映射关系。Invoke when user asks for API documentation, interface documentation, or mapping between frontend and backend APIs."
---

# API 文档生成器

此技能帮助您生成项目的完整API接口文档，包括请求方式、路径、参数和响应格式。

## 功能

- 分析项目中的API接口
- 生成详细的接口文档
- 包含请求方式、路径、参数和响应格式
- 提供示例请求和响应
- 映射前端接口与后端方法的对应关系
- 展示API的返回值类型和结构

## 使用场景

当用户需要以下内容时请调用此技能：
- 查看项目的所有API接口
- 获取API接口的详细文档
- 需要接口的请求参数和响应格式说明
- 需要生成API文档
- 了解前端API调用与后端方法的映射关系
- 查看API返回值的详细结构

## 输出格式

API文档将包含以下信息：
- 接口名称
- 请求方法（GET/POST/PUT/DELETE等）
- 请求路径
- 请求参数（路径参数、查询参数、请求体参数）
- 前端接口名称
- 对应的后端方法名称
- 响应格式
- 返回值类型和结构
- 示例请求和响应
- 错误码说明

## 步骤

1. 扫描项目中的API接口定义
2. 提取前端API调用与后端方法的对应关系
3. 提取接口相关信息（请求方式、路径、参数、返回值等）
4. 按照标准格式整理文档
5. 生成完整的API文档

# Attendance System API 接口文档

## 1. 接口概述

### 1.1 基本信息
- **协议**: HTTPS
- **域名**: `https://api.yourdomain.com`
- **版本**: v1.0.0
- **字符编码**: UTF-8
- **内容格式**: JSON

### 1.2 公共请求参数
无特殊公共请求参数

### 1.3 公共响应参数
| 字段名 | 类型   | 是否必须 | 描述       |
|--------|--------|----------|------------|
| code   | Int    | 是       | 业务状态码 |
| msg    | String | 是       | 响应消息   |
| data   | Object | 否       | 响应数据   |

### 1.4 通用状态码
| 状态码 | 说明          | 描述           |
|--------|---------------|----------------|
| 200    | Success       | 操作成功       |
| 400    | Bad Request   | 请求参数错误   |
| 401    | Unauthorized  | 未授权访问     |
| 403    | Forbidden     | 权限不足       |
| 404    | Not Found     | 资源不存在     |
| 500    | Server Error  | 服务器内部错误 |

---

## 2. 用户相关接口

### 2.1 获取用户信息

#### 接口描述
获取指定用户的基本信息

#### 请求信息
- **请求地址**: `/api/user/info`
- **请求方法**: GET
- **内容类型**: application/x-www-form-urlencoded
- **认证方式**: Session/Cookie

#### 请求参数
| 参数名 | 类型    | 是否必须 | 示例值 | 描述             |
|--------|---------|----------|--------|------------------|
| userId | Integer | 否       | 1      | 用户ID，默认为1  |

#### 响应参数
| 参数名 | 类型    | 是否必须 | 示例值      | 描述         |
|--------|---------|----------|-------------|--------------|
| code   | Integer | 是       | 200         | 业务状态码   |
| msg    | String  | 是       | "操作成功"  | 响应消息     |
| data   | Object  | 否       | -           | 用户信息对象 |

##### data 详细参数
| 参数名     | 类型    | 是否必须 | 示例值                          | 描述                     |
|------------|---------|----------|---------------------------------|--------------------------|
| id         | Integer | 是       | 1                               | 用户ID                   |
| username   | String  | 是       | "admin"                         | 用户名                   |
| password   | String  | 是       | "$2a$10$..."                    | 加密后的密码             |
| avatar     | String  | 否       | null                            | 头像URL                  |
| createTime | String  | 是       | "2024-03-06T08:11:00.000+00:00" | 创建时间                 |
| updateTime | String  | 是       | "2024-03-06T08:11:00.000+00:00" | 更新时间                 |
| isDeleted  | Integer | 是       | 0                               | 删除标识(0-未删除,1-已删除) |

#### 请求示例
```
GET /api/user/info?userId=1
Host: api.yourdomain.com
Cookie: JSESSIONID=xxx
```

#### 响应示例
```json
{
  "code": 200,
  "msg": "操作成功",
  "data": {
    "id": 1,
    "username": "admin",
    "password": "$2a$10$NQVgZc5sQB7FvHMRxJrwkedBqMTMtwL0C2YdytKE.Ur9eyo9ydwYm",
    "avatar": null,
    "createTime": "2024-03-06T08:11:00.000+00:00",
    "updateTime": "2024-03-06T08:11:00.000+00:00",
    "isDeleted": 0
  }
}
```

#### 错误码
| 错误码 | 说明       | 描述             |
|--------|------------|------------------|
| 200    | Success    | 获取用户信息成功 |
| 404    | Not Found  | 用户不存在       |
| 500    | Server Error| 获取用户信息失败 |

---

### 2.2 用户登录

#### 接口描述
用户登录认证接口

#### 请求信息
- **请求地址**: `/api/user/login`
- **请求方法**: POST
- **内容类型**: application/json
- **认证方式**: 无需认证

#### 请求参数
| 参数名   | 类型   | 是否必须 | 示例值     | 描述   |
|----------|--------|----------|------------|--------|
| username | String | 是       | "admin"    | 用户名 |
| password | String | 是       | "password" | 密码   |

#### 请求体示例
```json
{
  "username": "admin",
  "password": "password"
}
```

#### 响应参数
| 参数名 | 类型    | 是否必须 | 示例值      | 描述         |
|--------|---------|----------|-------------|--------------|
| code   | Integer | 是       | 200         | 业务状态码   |
| msg    | String  | 是       | "操作成功"  | 响应消息     |
| data   | Object  | 否       | -           | 登录结果数据 |

##### data 详细参数
| 参数名 | 类型 | 是否必须 | 示例值 | 描述 |
|--------|------|----------|--------|------|
| user | Object | 是 | - | 用户信息对象 |

#### 响应示例
```json
{
  "code": 200,
  "msg": "操作成功",
  "data": {
    "user": {
      "id": 1,
      "username": "admin",
      "password": "$2a$10$NQVgZc5sQB7FvHMRxJrwkedBqMTMtwL0C2YdytKE.Ur9eyo9ydwYm",
      "avatar": null,
      "createTime": "2024-03-06T08:11:00.000+00:00",
      "updateTime": "2024-03-06T08:11:00.000+00:00",
      "isDeleted": 0
    }
  }
}
```

#### 错误码
| 错误码 | 说明         | 描述               |
|--------|--------------|--------------------|
| 200    | Success      | 登录成功           |
| 400    | Bad Request  | 用户名或密码不能为空 |
| 401    | Unauthorized | 用户名不存在       |
| 500    | Server Error | 登录失败           |

---

### 2.3 用户登出

#### 接口描述
用户登出接口

#### 请求信息
- **请求地址**: `/api/user/logout`
- **请求方法**: POST
- **内容类型**: application/json
- **认证方式**: Session/Cookie

#### 请求参数
无

#### 响应参数
| 参数名 | 类型    | 是否必须 | 示例值     | 描述       |
|--------|---------|----------|------------|------------|
| code   | Integer | 是       | 200        | 业务状态码 |
| msg    | String  | 是       | "登出成功" | 响应消息   |
| data   | String  | 否       | null       | 响应数据   |

#### 请求示例
```
POST /api/user/logout
Host: api.yourdomain.com
Cookie: JSESSIONID=xxx
Content-Type: application/json
```

#### 响应示例
```json
{
  "code": 200,
  "msg": "登出成功",
  "data": null
}
```

#### 错误码
| 错误码 | 说明       | 描述       |
|--------|------------|------------|
| 200    | Success    | 登出成功   |
| 500    | Server Error| 登出失败   |

---

## 3. 打卡相关接口

### 3.1 获取打卡记录

#### 接口描述
获取指定用户的打卡记录（支持分页）

#### 请求信息
- **请求地址**: `/api/punch/record`
- **请求方法**: GET
- **内容类型**: application/x-www-form-urlencoded
- **认证方式**: Session/Cookie

#### 请求参数
| 参数名 | 类型    | 是否必须 | 示例值 | 默认值 | 描述     |
|--------|---------|----------|--------|--------|----------|
| userId | Integer | 是       | 1      | -      | 用户ID   |
| page   | Integer | 否       | 1      | 1      | 页码     |
| size   | Integer | 否       | 15     | 15     | 每页条数 |

#### 响应参数
| 参数名 | 类型    | 是否必须 | 示例值      | 描述         |
|--------|---------|----------|-------------|--------------|
| code   | Integer | 是       | 200         | 业务状态码   |
| msg    | String  | 是       | "操作成功"  | 响应消息     |
| data   | Object  | 否       | -           | 分页数据对象 |

##### data 详细参数
| 参数名 | 类型    | 是否必须 | 示例值 | 描述         |
|--------|---------|----------|--------|--------------|
| records| Array   | 是       | []     | 打卡记录列表 |
| total  | Integer | 是       | 1      | 总记录数     |
| page   | Integer | 是       | 1      | 当前页码     |
| size   | Integer | 是       | 15     | 每页条数     |
| pages  | Integer | 是       | 1      | 总页数       |

##### records 数组元素详细参数
| 参数名         | 类型    | 是否必须 | 示例值                          | 描述                     |
|----------------|---------|----------|---------------------------------|--------------------------|
| id             | Integer | 是       | 1                               | 记录ID                   |
| userId         | Integer | 是       | 1                               | 用户ID                   |
| checkInTime    | String  | 是       | "2024-03-06T08:11:00.000+00:00" | 打卡时间                 |
| checkInType    | Integer | 是       | 1                               | 打卡类型(1-上班打卡)     |
| checkInStatus  | Integer | 是       | 1                               | 打卡状态(1-正常)         |
| checkInLocation| String  | 是       | "公司"                          | 打卡地点                 |
| createTime     | String  | 是       | "2024-03-06T08:11:00.000+00:00" | 创建时间                 |
| updateTime     | String  | 是       | "2024-03-06T08:11:00.000+00:00" | 更新时间                 |
| isDeleted      | Integer | 是       | 0                               | 删除标识(0-未删除,1-已删除) |

#### 请求示例
```
GET /api/punch/record?userId=1&page=1&size=15
Host: api.yourdomain.com
Cookie: JSESSIONID=xxx
```

#### 响应示例
```json
{
  "code": 200,
  "msg": "操作成功",
  "data": {
    "records": [
      {
        "id": 1,
        "userId": 1,
        "checkInTime": "2024-03-06T08:11:00.000+00:00",
        "checkInType": 1,
        "checkInStatus": 1,
        "checkInLocation": "公司",
        "createTime": "2024-03-06T08:11:00.000+00:00",
        "updateTime": "2024-03-06T08:11:00.000+00:00",
        "isDeleted": 0
      }
    ],
    "total": 1,
    "page": 1,
    "size": 15,
    "pages": 1
  }
}
```

#### 错误码
| 错误码 | 说明       | 描述             |
|--------|------------|------------------|
| 200    | Success    | 获取打卡记录成功 |
| 500    | Server Error| 获取打卡记录失败 |

---

### 3.2 上班打卡

#### 接口描述
用户上班打卡接口

#### 请求信息
- **请求地址**: `/api/punch/in`
- **请求方法**: POST
- **内容类型**: application/json
- **认证方式**: Session/Cookie

#### 请求参数
| 参数名   | 类型    | 是否必须 | 示例值                        | 描述     |
|----------|---------|----------|-------------------------------|----------|
| username | String  | 是       | "admin"                       | 用户名   |
| punchTime| String  | 是       | "2024-03-06T08:11:00.000Z"  | 打卡时间 |
| userId   | Integer | 是       | 1                             | 用户ID   |

#### 请求体示例
```json
{
  "username": "admin",
  "punchTime": "2024-03-06T08:11:00.000Z",
  "userId": 1
}
```

#### 响应参数
| 参数名 | 类型    | 是否必须 | 示例值     | 描述       |
|--------|---------|----------|------------|------------|
| code   | Integer | 是       | 200        | 业务状态码 |
| msg    | String  | 是       | "打卡成功" | 响应消息   |
| data   | String  | 否       | null       | 响应数据   |

#### 请求示例
```
POST /api/punch/in
Host: api.yourdomain.com
Cookie: JSESSIONID=xxx
Content-Type: application/json

{
  "username": "admin",
  "punchTime": "2024-03-06T08:11:00.000Z",
  "userId": 1
}
```

#### 响应示例
```json
{
  "code": 200,
  "msg": "打卡成功",
  "data": null
}
```

#### 错误码
| 错误码 | 说明      | 描述         |
|--------|-----------|--------------|
| 200    | Success   | 打卡成功     |
| 400    | Bad Request | 用户ID不能为空 |
| 404    | Not Found | 用户不存在   |
| 500    | Server Error | 打卡失败   |

---

## 4. 接口调用说明

### 4.1 接口安全
- 所有敏感接口需通过Session或Cookie进行身份验证
- 用户登录后才能访问受保护的资源

### 4.2 接口限流
- 单个IP每分钟最多请求100次
- 单个用户每分钟最多请求50次

### 4.3 数据格式
- 所有时间格式统一使用ISO 8601标准格式
- 所有金额单位为分
- 所有ID字段为整数类型

### 4.4 错误处理
- 客户端应根据返回的code字段判断请求结果
- msg字段仅用于调试，不应在生产环境中展示给用户
- data字段可能为空，客户端应做好判空处理