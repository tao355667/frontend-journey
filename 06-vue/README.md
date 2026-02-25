# 🟩 Vue 3 入门教程（<script setup> + TypeScript）

> **现代化的 Vue 3 学习路径，直接从 `<script setup>` 开始，高效掌握 Vue 开发**

[![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D?logo=vue.js)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite)](https://vitejs.dev/)

---

## 📖 教程简介

本教程是一套面向初学者的 Vue 3 现代化入门指南。不同于传统教程从 Options API 开始，我们**直接从 `<script setup>` 语法糖开始**，这是 Vue 3 推荐的现代开发方式。

### 为什么跳过 Options API 和 setup()？

- **`<script setup>` 是 Vue 3 官方推荐的开发方式**，代码更简洁、更直观
- **不需要先学习 Options API 再迁移**，一步到位掌握现代写法
- **不需要先学习 setup() 函数再学习语法糖**，直接上手 `<script setup>`
- **更符合现代前端开发习惯**，类似 React Hooks 和 Svelte 的写法

### 👥 适合人群

- **前端新手**：有 HTML/CSS/JavaScript 基础，想学习现代前端框架
- **Vue 2 开发者**：想要升级到 Vue 3，学习 `<script setup>` 现代写法
- **其他框架用户**：熟悉 React/Svelte，想了解 Vue 的现代写法
- **技术提升者**：希望掌握 Vue 3 最推荐的开发方式

### 🎯 学习目标

完成本教程后，你将能够：

- ✅ 熟练使用 `<script setup>` 编写 Vue 3 组件
- ✅ 掌握响应式系统（ref、reactive、computed）
- ✅ 理解组件通信、生命周期、插槽等核心概念
- ✅ 使用 TypeScript 进行类型安全的 Vue 开发
- ✅ 独立完成中等复杂度的 Vue 项目

---

## ⭐ 教程特点

| 特点 | 说明 |
|------|------|
| 📚 **现代优先** | 直接使用 `<script setup>`，跳过过时的写法 |
| 🔤 **TypeScript 为主** | 默认使用 TypeScript，现代开发的标准 |
| 🛠️ **实践导向** | 每个章节配套练习，第16章综合项目巩固所学 |
| 💡 **循序渐进** | 从基础到进阶，知识点逐步展开 |
| 📝 **详细注释** | 代码配有详细中文注释，降低学习门槛 |
| 🔄 **及时更新** | 跟随 Vue 3 最新版本更新，保持内容时效性 |

---

## 🛤️ 学习路径

```
┌─────────────────────────────────────────────────────────────────┐
│                   Vue 3 现代学习路径                              │
└─────────────────────────────────────────────────────────────────┘

 ┌─────────────────┐
 │  📘 基础篇       │    5 章 · 建议 1 周
 │  快速上手        │    <script setup> 基础语法
 └────────┬────────┘
          │
          ▼
 ┌─────────────────┐
 │  📗 核心功能篇   │    5 章 · 建议 1 周
 │  响应式系统      │    ref、computed、watch
 └────────┬────────┘
          │
          ▼
 ┌─────────────────┐
 │  📙 组件进阶篇   │    4 章 · 建议 1 周
 │  组件系统        │    Props、Emits、插槽、生命周期
 └────────┬────────┘
          │
          ▼
 ┌─────────────────┐
 │  📕 高级特性篇   │    1 章 · 建议 2-3 天
 │  进阶技术        │    Teleport、Suspense、组合式函数
 └────────┬────────┘
          │
          ▼
 ┌─────────────────┐
 │  📓 实践篇       │    1 章 · 建议 3-5 天
 │  综合项目        │    融会贯通，独立完成项目
 └─────────────────┘

 总学习时间：约 3-5 周（每天 2-3 小时）
```

### 📊 阶段划分

| 阶段 | 章节 | 学习时间 | 掌握程度 |
|------|------|----------|----------|
| 🔰 基础篇 | 01-05 | 1 周 | 掌握 `<script setup>` 基础 |
| 🔧 核心功能 | 06-10 | 1 周 | 熟练使用响应式系统 |
| ⚙️ 组件进阶 | 11-14 | 1 周 | 掌握组件通信和高级特性 |
| 🚀 高级特性 | 15 | 2-3 天 | 了解进阶技术 |
| 🎯 实践项目 | 16 | 3-5 天 | 独立开发能力 |

---

## 📋 章节内容表

### 📘 基础篇（<script setup> 快速上手）

| 章节 | 内容 | 学习目标 | 学习时间 |
|------|------|----------|----------|
| **01** | Vue 3 简介、安装、第一个应用 | 了解 Vue 3，创建项目，运行示例 | 2-3 小时 |
| **02** | 模板语法（插值、指令、修饰符） | 掌握 mustache 语法、v-bind、v-on 等 | 2-3 小时 |
| **03** | `<script setup>` 基础 | 理解响应式数据和事件处理 | 2-3 小时 |
| **04** | 计算属性 computed | 学会使用计算属性优化模板逻辑 | 2-3 小时 |
| **05** | 侦听器 watch | 掌握数据监听和异步处理 | 2-3 小时 |

### 📗 核心功能篇（响应式系统）

| 章节 | 内容 | 学习目标 | 学习时间 |
|------|------|----------|----------|
| **06** | ref 与 reactive | 掌握响应式数据的创建方式 | 3-4 小时 |
| **07** | 条件渲染（v-if, v-show） | 掌握条件显示和性能优化 | 2-3 小时 |
| **08** | 列表渲染（v-for, key） | 熟练渲染列表，理解 key 的重要性 | 2-3 小时 |
| **09** | 事件处理与表单绑定 | 掌握事件绑定和 v-model | 3-4 小时 |
| **10** | class 与 style 绑定 | 灵活运用动态样式绑定 | 2-3 小时 |

### 📙 组件进阶篇

| 章节 | 内容 | 学习目标 | 学习时间 |
|------|------|----------|----------|
| **11** | 组件基础与 props | 学会创建和使用组件，理解 props | 3-4 小时 |
| **12** | 组件事件（emits）与 v-model | 掌握父子组件通信 | 3-4 小时 |
| **13** | 插槽（Slots） | 灵活控制组件内容分发 | 3-4 小时 |
| **14** | 生命周期钩子 | 理解组件生命周期的各个阶段 | 2-3 小时 |

### 📕 高级特性篇

| 章节 | 内容 | 学习目标 | 学习时间 |
|------|------|----------|----------|
| **15** | Teleport、Suspense、组合式函数 | 掌握高级特性和代码复用 | 3-4 小时 |

### 📓 实践篇

| 章节 | 内容 | 学习目标 | 学习时间 |
|------|------|----------|----------|
| **16** | 综合实践项目（Todo List） | 独立完成完整项目，融会贯通 | 3-5 天 |

---

## 🚀 如何使用本教程

### 学习步骤

1. **📖 阅读文档** - 每章开始前先阅读章节文档，理解核心概念
2. **💻 运行示例** - 查看并运行章节示例代码，观察运行效果
3. **✏️ 动手练习** - 完成章节后的练习题，巩固知识点
4. **📝 做笔记** - 记录重要概念和易错点，建立自己的知识体系
5. **🔍 查阅官方文档** - 遇到疑问时参考 [Vue 官方文档](https://cn.vuejs.org/)

### ⏰ 时间规划建议

#### 全职学习（每天 6-8 小时）

```
第 1 周：基础篇（01-05）
第 2 周：核心功能（06-10）
第 3 周：组件进阶 + 高级特性（11-15）
第 4 周：实践项目（16）
```

#### 兼职学习（每天 2-3 小时）

```
第 1-2 周：基础篇（01-05）
第 3-4 周：核心功能（06-10）
第 5-6 周：组件进阶 + 高级特性（11-15）
第 7 周：实践项目（16）
```

### 💡 学习建议

- 🎯 **坚持实践**：光学不练等于白学，每个示例都要动手敲一遍
- 🤔 **多思考**：不要只记语法，要理解背后的设计思想
- 🔄 **多复习**：每学完一个阶段回头复习，加深理解
- 💬 **多交流**：遇到问题可以在 Issues 区讨论或加入 Vue 社区
- 🏗️ **做项目**：学习过程中可以尝试用所学知识做小项目

---

## 📁 目录结构

```
06-vue/
├── README.md                    # 本文件 - 教程入口
├── package.json                 # 项目配置
├── tsconfig.json                # TypeScript 配置
├── vite.config.ts               # Vite 构建配置
├── index.html                   # 入口 HTML
│
├── 01-chapter-1/                # 第1章：Vue 3 简介
│   ├── README.md               # 章节说明
│   ├── examples/               # 示例代码
│   └── exercises/              # 练习题
│
├── 02-chapter-2/                # 第2章：模板语法
│   ├── README.md
│   ├── examples/
│   └── exercises/
│
├── 03-chapter-3/                # 第3章：<script setup> 基础
│   ├── README.md
│   ├── examples/
│   └── exercises/
│
├── 04-chapter-4/                # 第4章：计算属性
│   ├── README.md
│   ├── examples/
│   └── exercises/
│
├── 05-chapter-5/                # 第5章：侦听器
│   ├── README.md
│   ├── examples/
│   └── exercises/
│
├── 06-chapter-6/                # 第6章：ref 与 reactive
│   ├── README.md
│   ├── examples/
│   └── exercises/
│
├── 07-chapter-7/                # 第7章：条件渲染
│   ├── README.md
│   ├── examples/
│   └── exercises/
│
├── 08-chapter-8/                # 第8章：列表渲染
│   ├── README.md
│   ├── examples/
│   └── exercises/
│
├── 09-chapter-9/                # 第9章：事件处理与表单绑定
│   ├── README.md
│   ├── examples/
│   └── exercises/
│
├── 10-chapter-10/               # 第10章：class 与 style 绑定
│   ├── README.md
│   ├── examples/
│   └── exercises/
│
├── 11-chapter-11/               # 第11章：组件基础与 props
│   ├── README.md
│   ├── examples/
│   └── exercises/
│
├── 12-chapter-12/               # 第12章：组件事件与 v-model
│   ├── README.md
│   ├── examples/
│   └── exercises/
│
├── 13-chapter-13/               # 第13章：插槽
│   ├── README.md
│   ├── examples/
│   └── exercises/
│
├── 14-chapter-14/               # 第14章：生命周期钩子
│   ├── README.md
│   ├── examples/
│   └── exercises/
│
├── 15-chapter-15/               # 第15章：Teleport、Suspense、组合式函数
│   ├── README.md
│   ├── examples/
│   └── exercises/
│
├── 16-chapter-16/               # 第16章：Todo List 项目
│   ├── README.md
│   ├── src/
│   │   ├── components/
│   │   ├── composables/
│   │   ├── types/
│   │   └── App.vue
│   └── package.json
│
└── shared/                      # 共享资源
    ├── components/             # 公共组件
    ├── styles/                 # 公共样式
    └── utils/                  # 工具函数
```

---

## 🛠️ 工具准备

### 必备工具

| 工具 | 版本要求 | 说明 | 下载链接 |
|------|----------|------|----------|
| **Node.js** | >= 18.0 | JavaScript 运行时 | [下载](https://nodejs.org/) |
| **npm/pnpm** | >= 9.0 | 包管理器 | 随 Node.js 安装 |
| **VS Code** | 最新版 | 代码编辑器 | [下载](https://code.visualstudio.com/) |
| **浏览器** | Chrome/Firefox/Edge | 调试运行 | 推荐使用 Chrome |

### 推荐 VS Code 插件

```
📦 必备插件
├── Vue - Official          # Vue 官方插件（原 Volar）
├── TypeScript Importer     # 自动导入 TypeScript 类型
├── ESLint                  # 代码规范检查
├── Prettier                # 代码格式化
└── Auto Rename Tag         # 自动重命名标签
```

### 可选工具

- **Git** - 版本控制（推荐学习过程中使用 Git 管理代码）
- **Vue DevTools** - 浏览器扩展，用于调试 Vue 应用
- **Postman** - API 调试工具（做项目时可能需要）

---

## ❓ 常见问题

### Q1: 我需要什么前置知识？

**答：** 建议具备以下基础：
- HTML/CSS 基础（了解标签、选择器、盒模型）
- JavaScript ES6+ 基础（变量、函数、箭头函数、解构、Promise 等）
- 了解基本的命令行操作

如果你还不熟悉这些，建议先花 1-2 周时间补充基础知识。

### Q2: 为什么不学 Options API？

**答：** Options API 是 Vue 2 和 Vue 3 早期使用的写法，现在已经不是官方推荐的方式。`<script setup>` 是 Vue 3.2+ 引入的现代写法，具有以下优势：
- 代码更简洁，减少样板代码
- 更好的 TypeScript 支持
- 更符合现代前端开发习惯
- Vue 官方文档现在默认展示 `<script setup>` 写法

对于新学习 Vue 的开发者，建议直接学习 `<script setup>`，这也是目前业界的主流写法。

### Q3: 学完后能看懂 Options API 代码吗？

**答：** 大部分情况下可以。虽然 `<script setup>` 和 Options API 语法不同，但核心概念（响应式数据、计算属性、生命周期等）是相通的。如果你需要在遗留项目中使用 Options API，可以参考 Vue 官方文档的对照说明。

### Q4: 学完这个教程能做什么？

**答：** 完成本教程后，你可以：
- 使用 Vue 3 + `<script setup>` 开发中小型 Web 应用
- 阅读和理解 Vue 项目的源码
- 配合 UI 组件库（如 Element Plus、Ant Design Vue）快速开发
- 为进一步学习 Vue 生态（Vue Router、Pinia、Nuxt.js）打下基础

### Q5: 学习过程中遇到问题怎么办？

**答：**
1. 首先查阅本章节的文档和示例代码
2. 查看 [Vue 官方文档](https://cn.vuejs.org/) 对应章节
3. 在搜索引擎搜索错误信息
4. 在 GitHub Issues 提问（如果本教程有仓库）
5. 加入 Vue 社区或论坛寻求帮助

### Q6: 学完这个还需要学什么？

**答：** Vue 生态的重要技术：
- **Vue Router** - 单页应用路由管理
- **Pinia** - 状态管理（Vuex 的继任者）
- **Vite** - 构建工具（本教程已使用）
- **Nuxt.js** - 服务端渲染框架
- **UI 组件库** - Element Plus、Ant Design Vue 等

---

## 📚 参考资源

### 官方文档

- [Vue 3 官方文档（中文）](https://cn.vuejs.org/) - 最权威的学习资料
- [Vue Router 文档](https://router.vuejs.org/zh/) - 路由管理
- [Pinia 文档](https://pinia.vuejs.org/zh/) - 状态管理
- [Vite 文档](https://cn.vitejs.dev/) - 构建工具

### 社区资源

- [Vue 论坛](https://forum.vuejs.org/) - 官方论坛
- [GitHub Vue](https://github.com/vuejs/core) - Vue 源码
- [Awesome Vue](https://github.com/vuejs/awesome-vue) - Vue 生态资源汇总

### 推荐书籍

- 《Vue.js 设计与实现》 - 深入理解 Vue 原理
- 《Vue.js 实战》 - 项目驱动学习

---

## 🎓 开始学习

### 快速开始

1. **克隆或下载** 本教程到本地
2. **进入** 任意章节目录
3. **安装依赖**：`npm install`
4. **运行示例**：`npm run dev`
5. **打开浏览器** 访问 `http://localhost:5173`

### 👉 前往第 1 章

准备好了吗？让我们开始 Vue 3 学习之旅！

[**01-chapter-1: Vue 3 简介、安装、第一个应用 →**](01-chapter-1/README.md)

---

## 📄 许可证

本教程采用 [MIT License](LICENSE) 开源协议。

欢迎学习、分享和改进，但请保留原作者信息。

---

## 🤝 贡献指南

如果你发现文档或代码有错误，或者有更好的建议：

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

---

<div align="center">

**Happy Coding with Vue 3! 🎉**

Made with ❤️ and `<script setup>`

</div>
