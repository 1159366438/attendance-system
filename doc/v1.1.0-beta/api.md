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
- [打卡接口](./api/punch.md) - 打卡记录、打卡操作等接口
- [部门接口](./api/department.md) - 部门管理相关接口
- [角色接口](./api/role.md) - 权限管理相关接口

---

## 接口概览

### 用户相关接口
- `GET /api/user/info` - 获取用户信息
- `POST /api/user/login` - 用户登录
- `POST /api/user/logout` - 用户登出
- `POST /api/user/register` - 用户注册

### 打卡相关接口
- `GET /api/punch/record` - 获取打卡记录（分页）
- `POST /api/punch/in` - 上班打卡

### 部门管理接口
- `GET /api/department/list` - 获取部门列表
- `POST /api/department/create` - 创建部门
- `PUT /api/department/update` - 更新部门信息
- `DELETE /api/department/delete` - 删除部门

### 权限管理接口
- `GET /api/role/list` - 获取角色列表
- `POST /api/role/assign` - 分配用户角色
- `POST /api/role/check-permission` - 权限验证
- `GET /api/role/user-roles` - 获取用户角色

---

## 附录

### A. 时间格式说明
- 日期时间格式：`yyyy-MM-dd HH:mm:ss`
- 时间戳格式：ISO 8601 格式

### B. 错误处理建议
- 客户端应检查响应码是否为200
- 根据错误码进行相应处理
- 记录错误日志以便调试

### C. 版本历史
- **v1.0.1-beta** (2026-03-14): 初始API文档发布
- **v1.1.0-beta** (2026-03-15): 按模块拆分API文档，增加用户注册功能