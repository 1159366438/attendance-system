# 考勤系统 (Attendance System) - v1.0.0 内测版

基于前后端分离架构的现代化考勤管理系统，旨在提供高效的员工打卡和考勤记录管理功能。

当前版本：v1.0.0 内测版 | 发布日期：2026-03-12

## 技术栈

### 前端技术
- **Vue.js 3** [![Version](https://img.shields.io/badge/version-^3.5.25-blue)](#) - 渐进式 JavaScript 框架，使用 Composition API 和 `<script setup>` 语法
- **TypeScript** [![Version](https://img.shields.io/badge/version-~5.9.3-blue)](#) - 为 JavaScript 添加静态类型检查，提升代码质量和可维护性
- **Vite** [![Version](https://img.shields.io/badge/version-7.3.1-blue)](#) - 下一代前端构建工具，提供快速的热更新和构建速度
- **Element Plus** [![Version](https://img.shields.io/badge/version-^2.13.2-blue)](#) - 基于 Vue 3 的桌面端组件库，提供丰富的 UI 组件
- **@element-plus/icons-vue** [![Version](https://img.shields.io/badge/version-^2.3.2-blue)](#) - Element Plus 图标库，提供丰富的 SVG 图标
- **Pinia** [![Version](https://img.shields.io/badge/version-^2.3.1-blue)](#) - Vue 官方推荐的状态管理库，轻量且易于使用
- **Vue Router** [![Version](https://img.shields.io/badge/version-^4.6.4-blue)](#) - Vue.js 的官方路由管理器，支持嵌套路由和动态路由
- **Axios** [![Version](https://img.shields.io/badge/version-^1.13.5-blue)](#) - 基于 Promise 的 HTTP 客户端，用于发起 API 请求
- **国际化 (i18n)** - 支持多语言，便于系统国际化部署

### 后端技术
- **Spring Boot 4** [![Version](https://img.shields.io/badge/version-4.0.2-blue)](#) - 用于快速构建基于 Spring 的应用程序
- **MyBatis** [![Version](https://img.shields.io/badge/version-3.0.5-blue)](#) - 持久层框架，简化数据库操作
- **MySQL Connector** [![Status](https://img.shields.io/badge/status-版本由SpringBoot自动管理-blue)](#) - MySQL 数据库连接驱动
- **Java JDK** [![Version](https://img.shields.io/badge/version-17-blue)](#) - Java 开发工具包

## 项目特点

- **现代化架构**：采用前后端分离设计，便于团队协作和独立部署
- **组件化开发**：使用 Vue 3 的组件化思想，提高代码复用性和可维护性
- **状态管理**：使用 Pinia 进行全局状态管理，统一数据流
- **响应式设计**：适配不同屏幕尺寸，支持移动端和桌面端访问
- **国际化支持**：内置多语言支持，便于全球化部署
- **代码规范**：遵循业界最佳实践，使用 TypeScript 提升代码质量

## 开发环境

- **Node.js** [![Version](https://img.shields.io/badge/version-v20.x-blue)](#) - JavaScript 运行时环境
- **ESLint** [![Version](https://img.shields.io/badge/version-v9.x-blue)](#) - JavaScript/TypeScript 代码检查工具
- **Prettier** [![Version](https://img.shields.io/badge/version-v3.x-blue)](#) - 代码格式化工具
- **Git** [![Version](https://img.shields.io/badge/version-v2.x-blue)](#) - 版本控制系统

## 版本发展规划

### 当前版本
- **v1.0.0** - 内测版（当前版本）：基础打卡功能、用户登录、分页查询

### 后续版本规划
- **v1.1.0** - 内测版：部门与权限管理（RBAC、多表设计）
- **v1.2.0** - 内测版：打卡规则 + 地图集成（规则引擎、地图API）
- **v1.3.0** - 内测版：增强查询 + 导出功能（复杂查询、Excel生成）
- **v1.4.0** - 内测版：性能优化 + 部署优化（Redis、Docker）
- **v1.5.0** - 内测版：移动适配（响应式、PWA）
- **v2.0.0** - 正式版：集成所有功能，经过充分测试，稳定可用

## 快速开始

### 环境要求
- Node.js (v20.x 或更高版本)
- Java JDK (v17 或更高版本)
- Maven (v3.8 或更高版本)
- MySQL (v8.0 或更高版本)

### 克隆项目

```bash
# 克隆整个项目
git clone https://github.com/1159366438/attendance-system.git
cd attendance-system
```

### 后端启动

```bash
# 进入后端目录
cd backend

# 使用 Maven 构建并运行
mvn spring-boot:run
```

### 前端启动

```bash
# 进入前端目录
cd frontend/cock-vue3-vite

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 项目结构

```
attendance-system/
├── backend/                           # 后端 Spring Boot 项目
│   ├── src/main/java/com/example/    # Java 源代码
│   │   ├── common/                   # 通用类
│   │   ├── config/                   # 配置类
│   │   ├── controller/               # 控制器层
│   │   ├── dao/                      # 数据访问层
│   │   ├── dto/                      # 数据传输对象
│   │   ├── entity/                   # 实体类
│   │   ├── service/                  # 业务逻辑层
│   │   └── PunchCardApplication.java # 启动类
│   ├── src/main/resources/           # 资源文件
│   │   ├── mapper/                   # MyBatis 映射文件
│   │   ├── application.properties    # 应用配置
│   │   ├── application.yml           # 应用配置
│   │   └── schema.sql                # 数据库初始化脚本
│   ├── pom.xml                       # Maven 依赖配置
│   └── target/                       # 构建输出目录
├── frontend/                         # 前端项目目录
│   └── cock-vue3-vite/              # Vue 3 + Vite 项目
│       ├── src/                      # 源代码
│       ├── public/                   # 静态资源
│       ├── package.json              # 项目配置
│       └── vite.config.js            # Vite 配置
├── doc/                              # 文档目录
│   ├── api.md                        # API 接口文档
│   ├── database.md                   # 数据库设计文档
│   └── plan.md                       # 开发计划文档
├── .gitignore                        # Git 忽略配置
├── .gitattributes                      # Git 属性配置
├── .mvn/                             # Maven Wrapper
└── README.md                         # 项目说明文件
```

## 技术待集成

- **Redis** [![Status](https://img.shields.io/badge/status-待集成-yellow)](#) - 内存数据结构存储，可用作缓存和会话存储
- **Docker** [![Status](https://img.shields.io/badge/status-待集成-yellow)](#) - 容器化平台，便于应用部署和扩展
- **RabbitMQ** [![Status](https://img.shields.io/badge/status-待集成-yellow)](#) - 消息队列，支持异步处理和解耦
- **Spring Cloud** [![Status](https://img.shields.io/badge/status-待集成-yellow)](#) - 微服务架构解决方案