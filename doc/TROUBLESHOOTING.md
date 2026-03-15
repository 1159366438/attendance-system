# 考勤系统故障排除指南

<p align="center">
  <strong>版本：v1.0.1-beta</strong> | 
  <strong>最后更新：2026-03-15</strong> | 
  <strong>适用版本：v1.0.0 及以上</strong>
</p>

本文档帮助解决在部署、启动或使用考勤系统过程中可能遇到的常见问题。  
若问题仍未解决，请提交 [GitHub Issue](https://github.com/1159366438/attendance-system/issues) 并提供详细日志。

---

## 目录
- [1. 登录认证失败](#1-登录认证失败)
- [2. 后端服务启动失败（端口冲突）](#2-后端服务启动失败端口冲突)
- [3. 数据库连接错误](#3-数据库连接错误)
- [4. 前端依赖安装失败](#4-前端依赖安装失败)
- [5. 地图功能无法定位（v1.2.0+）](#5-地图功能无法定位-v120)

---

## 1. 登录认证失败

### 现象
- 使用默认账号 `admin / 123456` 登录时，提示“用户名或密码错误”。
- 后端日志出现 `BCryptPasswordEncoder` 相关错误。

### 原因
- 数据库中存储的密码哈希值不正确（常见于 **v1.0.0** 及之前版本，或手动修改数据导致）。
- 旧版本的初始密码哈希值生成错误，与新版本 BCrypt 算法不兼容。

### 解决方案

#### 手动修复（适用于所有版本）
1. 登录 MySQL 数据库，切换到考勤系统数据库：
   ```sql
   USE `attendance_system`;
   ```
2. 确认当前 `user` 表中 `admin` 用户的密码哈希值：
   ```sql
   SELECT username, password FROM `user` WHERE username = 'admin';
   ```
3. 若哈希值不是以下正确值，则执行更新：
   ```sql
   UPDATE `user` 
   SET `password` = '$2a$10$byZHeNtemB1DFSAPJgGLzuuVLHig9xsUq4fbVaip806VYU1mFO9BG' 
   WHERE username = 'admin';
   ```
   > 该哈希值对应明文密码 `123456`。

4. 若需重置其他用户的密码，可将上述 SQL 中的 `admin` 替换为对应用户名。

#### 使用初始化脚本（仅限全新安装）
如果数据库为空，可重新执行 `schema.sql` 初始化脚本，其中已包含正确的默认密码哈希。

---

## 2. 后端服务启动失败（端口冲突）

### 现象
- 执行 `mvn spring-boot:run` 后，控制台输出：
  ```
  Web server failed to start. Port 8080 was already in use.
  ```

### 原因
- 默认端口 `8080` 被其他进程（如另一个 Java 程序、Tomcat、或已运行的后端实例）占用。

### 解决方案
#### 方案一：修改后端端口
编辑 `backend/src/main/resources/application.yml`，在 `server` 节点下修改端口（例如改为 `8081`）：
```yaml
server:
  port: 8081
```
重新启动后端服务。

#### 方案二：终止占用端口的进程
- **Windows**：
  1. 以管理员身份打开命令提示符，查找占用 8080 端口的进程 PID：
     ```cmd
     netstat -ano | findstr :8080
     ```
  2. 终止该进程（假设 PID 为 12345）：
     ```cmd
     taskkill /PID 12345 /F
     ```
- **Linux / macOS**：
  ```bash
  lsof -i:8080
  kill -9 <PID>
  ```

---

## 3. 数据库连接错误

### 现象
- 启动后端时出现如下错误之一：
  - `Access denied for user 'root'@'localhost'`
  - `Unknown database 'attendance_system'`
  - `Communications link failure`

### 原因
- 数据库用户名、密码错误。
- 指定的数据库不存在。
- MySQL 服务未启动，或网络不通。

### 解决方案
1. **确认 MySQL 服务已启动**：
   - Windows：在服务管理中查看 `MySQL` 状态。
   - Linux：`systemctl status mysql` 或 `service mysql status`。

2. **检查数据库连接配置**  
   打开 `backend/src/main/resources/application.yml`，核对以下配置与实际环境一致：
   ```yaml
   spring:
     datasource:
       url: jdbc:mysql://localhost:3306/attendance_system?useSSL=false&serverTimezone=UTC
       username: root
       password: yourpassword
   ```
   - 将 `yourpassword` 替换为你的 MySQL 密码。
   - 若数据库名称不是 `attendance_system`，请修改 `url` 中的数据库名。

3. **创建数据库（如果不存在）**  
   登录 MySQL 并执行：
   ```sql
   CREATE DATABASE IF NOT EXISTS `attendance_system` 
     DEFAULT CHARACTER SET utf8mb4 
     COLLATE utf8mb4_unicode_ci;
   ```

4. **导入表结构**（如果尚未导入）：
   ```bash
   mysql -u root -p attendance_system < backend/src/main/resources/schema.sql
   ```

---

## 4. 前端依赖安装失败

### 现象
- 在 `frontend/cock-vue3-vite` 目录下执行 `npm install` 时，出现：
  - `ERR! code EINTEGRITY`
  - `ERR! network` 或 `ETIMEDOUT`
  - `ERR! code 128`

### 原因
- npm 缓存损坏。
- 网络问题（公司防火墙、代理、镜像源不稳定）。
- Node.js 版本不兼容（项目要求 Node.js 20+）。

### 解决方案
1. **检查 Node.js 版本**：
   ```bash
   node -v
   ```
   确保版本 ≥ 20。若不符合，请升级 Node.js。

2. **清除 npm 缓存**：
   ```bash
   npm cache clean --force
   ```

3. **切换至国内镜像源（如遇网络问题）**：
   ```bash
   npm config set registry https://registry.npmmirror.com
   ```

4. **删除 `node_modules` 和 `package-lock.json` 后重装**：
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

5. **若使用代理，配置 npm 代理**（根据需要）：
   ```bash
   npm config set proxy http://your-proxy:port
   npm config set https-proxy http://your-proxy:port
   ```

---
**文档结束**