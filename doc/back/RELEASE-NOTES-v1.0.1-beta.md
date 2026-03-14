# v1.0.1-beta 发布说明

**发布日期**: 2026-03-13  
**版本**: v1.0.1-beta  
**类型**: 修复版

## 概述

v1.0.1-beta 是 v1.0.0 的重要修复和优化版本，主要解决了登录认证问题、完善了安全性，并对代码质量进行了大幅提升。这个版本将硬编码值替换为常量，提升了代码的可维护性和一致性。

## 主要更新

### 🔧 修复问题
- 修复 BCrypt 密码哈希验证问题
- 修复 Element Plus 废弃 API 警告
- 解决 Git 分支管理问题

### ⚡ 新增功能
- 将所有硬编码值替换为常量（分页参数、错误码、成功消息等）
- 统一错误码管理，创建 ErrorCodeConstants 类
- 实现 ResponseResult 的常量化改造（error 和 success 方法）
- 完善日志记录规范，统一使用 SLF4J
- 修复 API 文档与代码不一致问题

### 📝 文档更新
- 更新开发计划文档，详细记录 v1.0.1 的改进内容
- 添加代码标准文档 (CODE_STANDARD.md)
- 添加故障排除指南 (TROUBLESHOOTING.md)

### 🏗️ 代码结构改进
- 创建 AppConstants 类统一管理应用常量
- 优化前后端异常处理机制
- 改进用户认证和授权流程

## 技术细节

### 后端改进
- 统一错误码管理，提高 API 返回的一致性
- 将分页参数、打卡类型/状态、用户默认值等提取为常量
- 改进 CORS 配置，使用常量管理前端 URL
- 优化异常处理，使用全局异常处理器

### 前端改进
- 修复 Element Plus 废弃 API 使用（将 `type="text"` 替换为 `link`）
- 优化 API 调用和错误处理
- 改进用户体验

## 如何升级

1. 克隆最新代码：
   ```bash
   git clone https://github.com/1159366438/attendance-system.git
   ```

2. 或者拉取最新更新：
   ```bash
   git pull origin master
   ```

3. 后端启动：
   ```bash
   cd backend
   mvn clean compile
   mvn spring-boot:run
   ```

4. 前端启动：
   ```bash
   cd frontend/cock-vue3-vite
   npm install
   npm run dev
   ```

## 已知问题

暂无严重已知问题。

## 致谢

感谢所有参与 v1.0.1-beta 版本开发和测试的贡献者们。