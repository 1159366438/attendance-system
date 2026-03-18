# v1.1.0-beta API 接口文档

<p align="center">
  <strong>版本：v1.1.0-beta</strong> | 
  <strong>最后更新：2026-03-15</strong> | 
  <strong>作者：开发团队</strong>
</p>

## 文档目录

本API文档已按功能模块拆分为多个文件，便于查阅和维护：

- [概述](./api/overview.md) - API基本规范、公共响应结构、认证方式等
- [用户接口](./api/user.md) - 用户注册、登录、获取用户信息等接口
- [打卡接口](./api/attendance.md) - 打卡记录、打卡操作等接口
- [部门接口](./api/department.md) - 部门管理相关接口
- [角色接口](./api/role.md) - 权限管理相关接口

---

## 接口概览

### 用户相关接口
- `GET /api/users/me` - 获取当前登录用户信息（原 `/api/user/info`）
- `POST /api/users` - 用户注册（原 `/api/user/register`）
- `POST /api/auth/login` - 用户登录（原 `/api/user/login`）
- `POST /api/auth/logout` - 用户登出（原 `/api/user/logout`）

### 打卡相关接口
- `GET /api/attendance/records` - 获取打卡记录（分页，原 `/api/attendance/record`）
- `POST /api/attendance/records` - 打卡（原 `/api/attendance/in`）

### 部门管理接口
- `GET /api/departments` - 获取部门列表（原 `/api/department/list`）
- `POST /api/departments` - 创建部门（原 `/api/department/create`）
- `PUT /api/departments/{id}` - 更新指定部门（原 `/api/department/update`）
- `DELETE /api/departments/{id}` - 删除指定部门（原 `/api/department/delete`）

### 权限管理接口
- `GET /api/roles` - 获取角色列表（原 `/api/role/list`）
- `GET /api/users/{userId}/roles` - 获取指定用户的角色（原 `/api/role/user-roles`）
- `POST /api/users/{userId}/roles` - 为用户分配角色（原 `/api/role/assign`）
- `POST /api/permissions/check` - 权限验证（原 `/api/role/check-permission`）

---


✨ RESTful 风格接口概览
用户相关接口
方法	路径	说明
GET	/api/users/me	获取当前登录用户信息（原 /user/info）
POST	/api/users	用户注册（原 /user/register）
POST	/api/auth/login	用户登录（分离到 auth 模块）
POST	/api/auth/logout	用户登出
打卡相关接口
方法	路径	说明
GET	/api/attendance/records	获取打卡记录（分页，原 /attendance/record）
POST	/api/attendance/records	打卡（通过请求体区分上班/下班，原 /attendance/in）
部门管理接口
方法	路径	说明
GET	/api/departments	获取部门列表（原 /department/list）
POST	/api/departments	创建部门（原 /department/create）
PUT	/api/departments/{id}	更新指定部门（原 /department/update）
DELETE	/api/departments/{id}	删除指定部门（原 /department/delete）
权限管理接口
方法	路径	说明
GET	/api/roles	获取角色列表（原 /role/list）
GET	/api/users/{userId}/roles	获取指定用户的角色（原 /role/user-roles）
POST	/api/users/{userId}/roles	为用户分配角色（原 /role/assign）
POST	/api/permissions/check	权限验证（原 /role/check-permission，建议用 POST 传递权限标识）

## 附录

### A. 时间格式说明
- 日期时间格式：`yyyy-MM-dd HH:mm:ss`
- 时间戳格式：ISO 8601 格式

### B. 错误处理建议
- 客户端应检查响应码是否为200
- 根据错误码进行相应处理
- 记录错误日志以便调试

### C. 版本历史
- **v1.1.0-beta** (2026-03-15): 按模块拆分API文档，增加用户注册功能
- **v1.0.1-beta** (2026-03-14): 初始API文档发布