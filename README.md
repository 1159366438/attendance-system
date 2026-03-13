# 考勤系统 (Attendance System)

<p align="center">
  <img src="https://img.shields.io/badge/版本-v1.0.0%20内测版-blue?style=for-the-badge" alt="版本">
  <img src="https://img.shields.io/badge/发布日期-2026--03--12-green?style=for-the-badge" alt="发布日期">
  <img src="https://img.shields.io/badge/许可证-MIT-yellow?style=for-the-badge" alt="许可证">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Vue.js-3.5.25-4FC08D?logo=vuedotjs&style=flat-square" alt="Vue">
  <img src="https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript&style=flat-square" alt="TypeScript">
  <img src="https://img.shields.io/badge/Spring%20Boot-4.0.2-6DB33F?logo=springboot&style=flat-square" alt="Spring Boot">
  <img src="https://img.shields.io/badge/MySQL-8.0-4479A1?logo=mysql&style=flat-square" alt="MySQL">
  <img src="https://img.shields.io/badge/Element%20Plus-2.13.2-409EFF?logo=element&style=flat-square" alt="Element Plus">
  <img src="https://img.shields.io/badge/Pinia-2.3.1-FFD859?logo=pinia&style=flat-square" alt="Pinia">
</p>

<p align="center">
  一款基于前后端分离架构的现代化考勤管理系统，为企业提供高效、可靠的员工打卡与考勤记录管理服务。<br>
  轻量、易扩展、支持多语言，助力企业数字化管理升级。
</p>

---

## 📋 目录

- [✨ 核心特性](#-核心特性)
- [🛠️ 技术栈](#️-技术栈)
- [🚀 快速开始](#-快速开始)
  - [环境要求](#环境要求)
  - [安装步骤](#安装步骤)
- [📁 项目结构](#-项目结构)
- [📅 版本规划](#-版本规划)
- [🔮 待集成技术](#-待集成技术)
- [🤝 贡献指南](#-贡献指南)
- [📄 许可证](#-许可证)
- [📬 联系方式](#-联系方式)

---

## ✨ 核心特性

| 特性 | 描述 |
|------|------|
| **⚡ 前后端分离** | 独立开发与部署，易于扩展与维护 |
| **🧩 组件化开发** | Vue 3 组件化设计，提升代码复用性与开发效率 |
| **🗂️ 统一状态管理** | Pinia 集中管理应用状态，数据流清晰可控 |
| **📱 响应式设计** | 完美适配桌面、平板与移动设备 |
| **🌐 国际化支持** | 内置多语言，轻松实现全球化部署 |
| **🔒 安全可靠** | JWT 身份验证，数据加密传输，保障系统安全 |
| **📊 数据可视化** | 丰富的考勤统计图表，辅助决策分析 |

---

## 🛠️ 技术栈

### 前端
| 技术 | 版本 | 说明 |
|------|------|------|
| [Vue.js 3](https://vuejs.org/) | ^3.5.25 | 渐进式 JavaScript 框架，使用 Composition API + `<script setup>` |
| [TypeScript](https://www.typescriptlang.org/) | ~5.9.3 | 静态类型检查，提升代码健壮性 |
| [Vite](https://vitejs.dev/) | ^7.3.1 | 下一代前端构建工具，极速启动与热更新 |
| [Element Plus](https://element-plus.org/) | ^2.13.2 | 基于 Vue 3 的企业级 UI 组件库 |
| [Pinia](https://pinia.vuejs.org/) | ^2.3.1 | Vue 官方推荐状态管理库 |
| [Vue Router](https://router.vuejs.org/) | ^4.6.4 | 官方路由管理器，支持嵌套路由 |
| [Axios](https://axios-http.com/) | ^1.13.5 | 基于 Promise 的 HTTP 客户端 |
| [@element-plus/icons-vue](https://element-plus.org/en-US/component/icon.html) | ^2.3.2 | Element Plus 图标库 |
| 国际化 i18n | - | 内置多语言支持 |

### 后端
| 技术 | 版本 | 说明 |
|------|------|------|
| [Spring Boot 4](https://spring.io/projects/spring-boot) | 4.0.2 | 快速构建生产级应用 |
| [MyBatis](https://mybatis.org/mybatis-3/) | 3.0.5 | 持久层框架，简化数据库操作 |
| [MySQL Connector](https://dev.mysql.com/downloads/connector/j/) | 由 Spring Boot 管理 | MySQL 数据库驱动 |
| Java JDK | 17 | 开发与运行环境 |

### 开发工具
| 工具 | 版本 | 说明 |
|------|------|------|
| Node.js | v20.x | JavaScript 运行时环境 |
| ESLint | v9.x | 代码检查工具 |
| Prettier | v3.x | 代码格式化工具 |
| Git | v2.x | 版本控制系统 |
| Maven | v3.8+ | 项目构建与管理 |

---

## 🚀 快速开始

### 环境要求
- Node.js (v20 或更高)
- Java JDK (v17 或更高)
- Maven (v3.8 或更高)
- MySQL (v8.0 或更高)

### 安装步骤

#### 1. 克隆项目
```bash
git clone https://github.com/1159366438/attendance-system.git
cd attendance-system
```

#### 2. 初始化数据库
```bash
# 创建数据库（在 MySQL 中执行）
mysql -u root -p
```
```sql
CREATE DATABASE IF NOT EXISTS `mydatabase` 
  DEFAULT CHARACTER SET utf8mb4 
  COLLATE utf8mb4_unicode_ci;
USE `mydatabase`;
```
```bash
# 导入表结构与初始数据
mysql -u root -p mydatabase < backend/src/main/resources/schema.sql
```

#### 3. 启动后端服务
```bash
cd backend
mvn spring-boot:run
```
后端服务默认运行于 `http://localhost:8080`

#### 4. 启动前端开发服务器
```bash
cd frontend/cock-vue3-vite
npm install          # 安装依赖
npm run dev          # 启动开发服务器
```
前端开发服务器默认运行于 `http://localhost:5173`

#### 5. 访问系统
打开浏览器访问 `http://localhost:5173`，使用默认管理员账号登录：
- **账号**：`admin`
- **密码**：`123456`（BCrypt 加密存储）

> ⚠️ 首次使用请及时修改默认密码。

---

## 📁 项目结构

```
attendance-system/
├── backend/                           # Spring Boot 后端
│   ├── src/main/
│   │   ├── java/com/example/
│   │   │   ├── common/                # 通用工具类
│   │   │   ├── config/                # 配置类（跨域、安全等）
│   │   │   ├── controller/             # REST API 控制器
│   │   │   ├── dao/                    # 数据访问接口
│   │   │   ├── dto/                    # 数据传输对象
│   │   │   ├── entity/                 # 实体类
│   │   │   ├── service/                 # 业务逻辑层
│   │   │   └── PunchCardApplication.java # 启动类
│   │   └── resources/
│   │       ├── mapper/                  # MyBatis XML 映射
│   │       ├── application.yml          # 应用配置
│   │       └── schema.sql                # 数据库初始化脚本
│   └── pom.xml                           # Maven 依赖管理
├── frontend/                         # Vue 3 前端
│   └── cock-vue3-vite/
│       ├── src/                       # 源代码
│       │   ├── assets/                 # 静态资源（图片、样式）
│       │   ├── components/              # 公共组件
│       │   ├── views/                   # 页面视图
│       │   ├── router/                  # 路由配置
│       │   ├── stores/                  # Pinia 状态仓库
│       │   ├── utils/                   # 工具函数
│       │   ├── App.vue                  # 根组件
│       │   └── main.ts                  # 入口文件
│       ├── public/                     # 公共静态资源
│       ├── package.json                 # 项目配置
│       └── vite.config.js               # Vite 配置
├── doc/                               # 项目文档
│   ├── api.md                          # API 接口文档
│   ├── database.md                      # 数据库设计文档
│   └── plan.md                          # 开发计划
├── .gitignore
├── .gitattributes
└── README.md                          # 项目说明文件
```

---

## 📅 版本规划

| 版本 | 类型 | 主要功能 | 预计时间 |
|------|------|----------|----------|
| v1.0.0 | 内测版 | 基础打卡、用户登录、分页查询 | ✅ 当前 |
| v1.1.0 | 内测版 | 部门与权限管理（RBAC）、多表设计 | 待定 |
| v1.2.0 | 内测版 | 打卡规则 + 地图集成（规则引擎、地图API） | 待定 |
| v1.3.0 | 内测版 | 增强查询 + Excel 导出（复杂查询、报表生成） | 待定 |
| v1.4.0 | 内测版 | 性能优化 + 部署优化（Redis 缓存、Docker 容器化） | 待定 |
| v1.5.0 | 内测版 | 移动端适配（PWA、响应式优化） | 待定 |
| v2.0.0 | 正式版 | 全功能稳定版，集成所有特性 | 待定 |

---

## 🔮 待集成技术

| 技术 | 状态 | 用途 |
|------|------|------|
| [Redis](https://redis.io/) | 🟡 待集成 | 缓存、会话管理 |
| [Docker](https://www.docker.com/) | 🟡 待集成 | 容器化部署 |
| [RabbitMQ](https://www.rabbitmq.com/) | 🟡 待集成 | 消息队列，异步处理 |
| [Spring Cloud](https://spring.io/projects/spring-cloud) | 🟡 待集成 | 微服务架构扩展 |
| [JUnit 5](https://junit.org/junit5/) | 🟡 待集成 | 单元测试 |
| [Swagger](https://swagger.io/) | 🟡 待集成 | API 文档自动生成 |

---

## 🤝 贡献指南

我们欢迎任何形式的贡献！如果您有兴趣参与，请遵循以下步骤：

1. **Fork** 本仓库
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 **Pull Request**

### 开发规范
- 代码遵循 ESLint 与 Prettier 配置
- 提交信息请使用清晰的语言（英文或中文）
- 涉及数据库变更请同步更新 `schema.sql` 及文档
- 新功能请编写相应的单元测试

---

## 📄 许可证

本项目基于 [MIT 许可证](LICENSE) 开源，您可以自由使用、修改和分发，但需保留原版权声明。

---

## 📬 联系方式

- **项目主页**：[https://github.com/1159366438/attendance-system](https://github.com/1159366438/attendance-system)
- **问题反馈**：通过 [GitHub Issues](https://github.com/1159366438/attendance-system/issues) 提交
- **邮箱**：[1159366438@qq.com]（可选）

---

<p align="center">
  <sub>Built with ❤️ by the Attendance System Team.</sub>
</p>
