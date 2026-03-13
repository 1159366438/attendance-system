# 考勤系统代码规范文档

<p align="center">
  <strong>版本：v1.0.0</strong> | 
  <strong>最后更新：2026-03-13</strong> | 
  <strong>状态：已生效</strong>
</p>

## 目录

- [1. 前言](#1-前言)
- [2. 通用规范](#2-通用规范)
  - [2.1 缩进与格式](#21-缩进与格式)
  - [2.2 命名规范](#22-命名规范)
  - [2.3 注释规范](#23-注释规范)
  - [2.4 日志规范](#24-日志规范)
  - [2.5 异常处理](#25-异常处理)
- [3. 前端规范（Vue 3 + TypeScript）](#3-前端规范vue-3--typescript)
  - [3.1 技术栈](#31-技术栈)
  - [3.2 目录结构](#32-目录结构)
  - [3.3 组件规范](#33-组件规范)
  - [3.4 状态管理（Pinia）规范](#34-状态管理pinia规范)
  - [3.5 样式规范](#35-样式规范)
  - [3.6 路由规范](#36-路由规范)
- [4. 后端规范（Spring Boot + MyBatis）](#4-后端规范spring-boot--mybatis)
  - [4.1 技术栈](#41-技术栈)
  - [4.2 目录结构](#42-目录结构)
  - [4.3 代码分层](#43-代码分层)
  - [4.4 命名规范](#44-命名规范)
  - [4.5 接口设计规范](#45-接口设计规范)
  - [4.6 异常处理](#46-异常处理)
  - [4.7 日志规范](#47-日志规范)
- [5. 数据库规范](#5-数据库规范)
  - [5.1 设计规范](#51-设计规范)
  - [5.2 命名规范](#52-命名规范)
  - [5.3 SQL 编写规范](#53-sql-编写规范)
- [6. Git 提交规范](#6-git-提交规范)
  - [6.1 分支管理](#61-分支管理)
  - [6.2 提交信息格式](#62-提交信息格式)
  - [6.3 提交频率](#63-提交频率)
- [7. 文档规范](#7-文档规范)
  - [7.1 文档类型](#71-文档类型)
  - [7.2 文档编写要求](#72-文档编写要求)
- [8. 代码审查规范](#8-代码审查规范)
- [9. 附则](#9-附则)

---

## 1. 前言

为提高团队协作效率，保证代码质量与一致性，特制定本代码规范。本规范适用于考勤系统（Attendance System）的所有开发人员，包括前端、后端及数据库设计。所有新代码及重构代码必须遵循本规范，已有代码逐步迁移。

---

## 2. 通用规范

### 2.1 缩进与格式
- **缩进**：使用 2 个空格（前端、后端、配置文件等），禁止使用 Tab 字符。
- **编码**：所有源文件采用 UTF-8 编码。
- **行尾**：Unix/Linux 风格（LF），Windows 用户需配置 Git 自动转换。
- **最大行宽**：不超过 120 字符（建议 80-100），超出需换行。
- **文件末尾**：保留一个空行。
- **空格**：
  - 逗号后紧跟一个空格。
  - 操作符（如 `=`、`+`、`-`、`*`、`/`）前后各一个空格。
  - 控制流关键字（`if`、`for`、`while`）后跟一个空格。
  - 左大括号前不换行，后跟一个空格。

### 2.2 命名规范
| 类型 | 规范 | 示例 |
|------|------|------|
| 变量/函数 | 小驼峰 | `userName`、`getUserInfo()` |
| 类/接口/类型 | 大驼峰 | `UserService`、`ApiResponse` |
| 常量 | 全大写+下划线 | `MAX_RETRY_COUNT` |
| 枚举 | 类名大驼峰，枚举值全大写 | `UserStatus.ACTIVE` |
| 文件名 | 小写+连字符（前端） / 大驼峰（后端类） | `user-profile.vue` / `UserController.java` |
| 目录名 | 小写+连字符（前端） / 小写（后端包） | `components/` / `com/example/service` |

### 2.3 注释规范
- **文件头注释**：每个源文件开头应包含版权声明（可选）及文件描述。
  ```java
  /**
   * 用户控制器
   * @author Zhang San
   * @since 2026-03-13
   */
  ```
- **类/接口注释**：描述功能、作者、日期。
- **方法注释**：描述功能、参数、返回值、异常。
- **行内注释**：仅用于解释复杂逻辑，保持简洁。

### 2.4 日志规范
- 使用 SLF4J + Logback（后端）或 console.log / debug 库（前端）。
- 日志级别：ERROR、WARN、INFO、DEBUG、TRACE，按场景使用。
- 禁止在日志中输出敏感信息（密码、token 等）。

### 2.5 异常处理
- 禁止吞食异常，必须记录或抛出。
- 自定义异常需继承 `RuntimeException`，统一异常处理。

---

## 3. 前端规范（Vue 3 + TypeScript）

### 3.1 技术栈
- Vue 3 (Composition API + `<script setup>`)
- TypeScript
- Vite
- Element Plus
- Pinia
- Vue Router
- Axios

### 3.2 目录结构
```
src/
├── assets/          # 静态资源（图片、字体、全局样式）
├── components/      # 公共组件
├── composables/     # 组合式函数（hooks）
├── layouts/         # 布局组件
├── pages/           # 页面级组件（按路由划分）
├── router/          # 路由配置
├── stores/          # Pinia 状态仓库
├── types/           # TypeScript 类型定义
├── utils/           # 工具函数
├── api/             # API 请求接口
├── styles/          # 全局样式变量、混入
├── App.vue
└── main.ts
```

### 3.3 组件规范
- **组件名**：大驼峰，与文件名一致，如 `UserProfile.vue`。
- **单文件组件**：按 `<template>`、`<script>`、`<style>` 顺序。
- **Props**：必须定义类型、默认值、是否必需。
  ```typescript
  const props = withDefaults(defineProps<{
    userId: number;
    userName?: string;
  }>(), {
    userName: '默认名称'
  });
  ```
- **事件**：使用 kebab-case 事件名，如 `update:model-value`。
- **组合式函数**：提取可复用逻辑到 `composables/`，命名以 `use` 开头，如 `usePagination`。
- **模板**：尽量简洁，复杂逻辑移至 script。

### 3.4 状态管理（Pinia）规范
- Store 按模块拆分，存放在 `stores/` 目录。
- Store 命名以 `use` 开头 + 模块名，如 `useUserStore`。
- 使用 Setup Store 语法（函数形式）。
- Action 命名：动词开头，如 `fetchUserList`。

### 3.5 样式规范
- **作用域**：组件样式必须添加 `scoped` 属性，避免污染全局。
- **预处理器**：使用 SCSS，变量、混入统一放在 `styles/`。
- **类名**：采用 BEM 命名风格，如 `user-card__title--large`。

### 3.6 路由规范
- 路由文件按模块拆分，使用懒加载。
- 路由 name 与 path 保持一致（大驼峰）。
- 嵌套路由合理设计。

---

## 4. 后端规范（Spring Boot + MyBatis）

### 4.1 技术栈
- Java 17
- Spring Boot 4
- MyBatis
- MySQL
- Maven

### 4.2 目录结构
```
src/main/java/com/example/
├── common/          # 通用类（常量、工具、异常、响应体）
├── config/          # 配置类（跨域、MyBatis、安全）
├── controller/      # 控制器层
├── service/         # 业务逻辑层（接口+实现）
├── dao/             # 数据访问层（Mapper 接口）
├── entity/          # 实体类（与数据库表对应）
├── dto/             # 数据传输对象（请求/响应）
└── PunchCardApplication.java
```

### 4.3 代码分层
- **Controller**：处理请求参数校验、调用 Service、返回统一响应。
- **Service**：业务逻辑实现，事务控制。
- **DAO**：数据库操作接口，与 Mapper XML 对应。
- **Entity**：与表结构一一对应，使用 Lombok 简化代码。
- **DTO**：按需定义，避免直接暴露 Entity。

### 4.4 命名规范
- **类名**：大驼峰，如 `UserController`。
- **方法名**：小驼峰，动词开头，如 `getUserById`。
- **接口名**：以 `I` 开头或直接名词，团队统一即可。
- **包名**：全小写，如 `com.example.service`。

### 4.5 接口设计规范
- **RESTful**：遵循资源导向，如 `GET /users/{id}`。
- **请求方法**：
  - GET：查询
  - POST：创建
  - PUT：全量更新
  - PATCH：部分更新
  - DELETE：删除
- **统一响应格式**：
  ```json
  {
    "code": 200,
    "msg": "success",
    "data": {}
  }
  ```
- **分页请求**：统一使用 `PageParam` DTO，返回 `PageResult`。

### 4.6 异常处理
- 全局异常处理器 `@RestControllerAdvice`。
- 自定义业务异常 `BusinessException`，包含错误码和消息。
- 校验异常 `MethodArgumentNotValidException` 统一处理。

### 4.7 日志规范
- 使用 Lombok `@Slf4j` 注解。
- 关键操作（增删改）必须打印 INFO 日志。
- 异常必须打印 ERROR 日志，包括堆栈。

---

## 5. 数据库规范

### 5.1 设计规范
- 所有表必须使用 InnoDB 引擎，字符集 `utf8mb4`。
- 每张表必须有主键 `id`（自增整数或雪花ID）。
- 必须包含 `create_time` 和 `update_time` 字段（`TIMESTAMP`）。
- 逻辑删除使用 `is_deleted` 字段（`TINYINT`，默认 0）。

### 5.2 命名规范
- **表名**：小写+下划线，单数形式，如 `user`、`punch_record`。
- **字段名**：小写+下划线，不使用驼峰，如 `check_in_time`。
- **主键**：`id`。
- **外键**：`referenced_table_id`，如 `user_id`。
- **唯一索引**：`uk_字段名`。
- **普通索引**：`idx_字段名`。

### 5.3 SQL 编写规范
- 关键字大写，如 `SELECT`、`INSERT`。
- 每行一个字段，缩进对齐。
- 禁止使用 `SELECT *`，必须明确字段。
- 使用预编译语句（`#{}`），避免 SQL 注入。

---

## 6. Git 提交规范

### 6.1 分支管理
- **主分支**：`master`（生产环境），`develop`（开发环境）。
- **功能分支**：`feature/xxx`，从 `develop` 切出。
- **修复分支**：`bugfix/xxx`，从 `develop` 或 `master` 切出。
- **发布分支**：`release/vx.x.x`，从 `develop` 切出，测试后合并到 `master` 和 `develop`。
- **标签**：每个正式版本打标签，如 `v1.0.0`。

### 6.2 提交信息格式
采用 Conventional Commits 规范：

```
<类型>[可选范围]: <描述>

[可选正文]

[可选脚注]
```

**类型**：
- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式（不影响逻辑）
- `refactor`: 重构
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建/工具变更
- `revert`: 回滚

**示例**：
```
feat(user): 添加用户登录功能

实现基于 JWT 的登录认证，包括密码加密验证和 token 返回。

Closes #123
```

### 6.3 提交频率
- 原子提交：每个提交只做一件事，逻辑完整。
- 避免大文件提交，敏感信息（密码）不得提交。

---

## 7. 文档规范

### 7.1 文档类型
- **README.md**：项目介绍、快速开始、技术栈。
- **API 文档**：接口定义、请求/响应示例、错误码。
- **数据库设计文档**：ER 图、表结构、索引。
- **开发计划**：版本规划、功能列表。
- **部署文档**：环境要求、部署步骤。

### 7.2 文档编写要求
- 统一存放在 `doc/` 目录。
- 使用 Markdown 格式，结构清晰。
- 图表可用 Mermaid 或图片。
- 及时更新，与代码保持同步。

---

## 8. 代码审查规范

- **审查流程**：
  1. 开发者在功能分支完成开发后，创建 Pull Request 到目标分支（如 `develop`）。
  2. 至少一名 reviewer 审查通过后方可合并。
  3. 解决所有评论后，由 reviewer 合并。
- **审查要点**：
  - 代码风格符合规范。
  - 逻辑正确，无明显 bug。
  - 单元测试覆盖关键路径。
  - 文档同步更新。
  - 无安全漏洞。

---

## 9. 附则

- 本规范自发布之日起生效。
- 如有争议，由技术负责人最终裁定。
- 规范将根据项目发展适时修订，修订前需团队讨论通过。

---

**规范制定：考勤系统开发团队**  
**生效日期：2026-03-13**