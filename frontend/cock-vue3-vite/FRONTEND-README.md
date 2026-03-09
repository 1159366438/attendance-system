**前端 — cock-vue3-vite**

- **概述**：基于 Vue 3 + Vite + TypeScript 的轻量前端，使用 Pinia 做状态管理，Element Plus 作为 UI 框架，axios 进行请求。

- **快速开始**：

```powershell
# 进入前端目录
cd d:\IdeaProjects\attendance-system\frontend\cock-vue3-vite
npm install
npm run dev       # 启动开发服务器
npm run build     # 生成生产构建
npm run preview   # 本地预览构建结果
```

- **前置条件**：建议使用 Node >= 16.8。如遇依赖问题，可删除 `node_modules` 后重装。

- **项目结构（要点）**：
	- `src/`：应用源码（入口：`src/main.ts`）。
	- `src/main.ts`：应用引导（router、pinia、Element Plus 注册）。
	- `src/App.vue`：根组件（加载 `layouts/Layout.vue`）。
	- `src/router/`, `src/store/`, `src/pages/`, `src/components/`, `src/api/`：按功能组织。
	- `assets/`, `public/`：静态资源。
	- `index.html`, `vite.config.ts`：Vite 入口与配置（见 [vite.config.ts](vite.config.ts#L1)）。
	- `package.json`：依赖与脚本（见 [package.json](package.json#L1)）。
	- `package-lock.json`：锁定依赖（见 [package-lock.json](package-lock.json#L1)）。

- **重要说明**：
	- 我已将 `vite` 从 beta 版本升级为稳定的 `^7.0.0`，并更新了 `package-lock.json`。
	- 开发服务器已配置将 `/api` 转发到 `http://localhost:8080`（详见 [vite.config.ts](vite.config.ts#L1) 的 proxy 配置）。
	- 全局 API 地址在 `vite.config.ts` 中通过 `__API_BASE_URL__` 定义。

- **故障排查**：
	- 若 `npm run dev` 失败，请检查 Node 版本；必要时运行 `npm cache clean --force` 然后重装依赖。
	- 若需回滚依赖改动，请从 git 恢复 `package.json` 与 `package-lock.json`。

- **代码规范**：
	- **注释**：所有代码注释必须用**中文**编写，确保代码易读易维护。
	- **Git 提交信息**：所有 commit message 必须用**中文**，格式如 `feat: 添加新功能` 或 `fix: 修复某个问题`。

---

此文档用于说明前端结构与运行步骤。如需我将 README 翻译为更详尽的部署/贡献指南，我可以继续扩展。