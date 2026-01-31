# React 简介与环境搭建

## 本章目的

理解 React 的核心概念，掌握开发环境的搭建方法，创建第一个 React 应用。

---

## 内容概述

本章将介绍 React 的基本概念、核心优势，以及如何搭建开发环境。您将了解 React 是什么、为什么选择 React，并通过实际操作创建您的第一个 React 页面。通过本章的学习，您将建立起对 React 的整体认知，为后续深入学习打下基础。

---

## 1.1 什么是 React

### 通俗解释

React 是一个用于构建用户界面的 JavaScript 库。可以把它想象成一套"乐高积木"，它提供了各种预制的小零件（组件），您可以用这些零件快速搭建出完整的网站界面。

React 的核心思想是"组件化"。就像汽车由发动机、轮胎、方向盘等部件组成一样，网页也可以分解成头部、导航栏、内容区、侧边栏、底部等独立的部分。每个部分就是一个组件，可以单独开发、测试和复用。

### 实际类比

把 React 想象成一家餐厅的厨房系统：

- **组件就像厨师**：每个厨师专注于特定的菜品（组件职责单一）
- **虚拟 DOM 就像点菜单**：先在点菜单上记录所有改动，确认无误后再一次性通知厨房执行
- **状态管理就像食材库存**：食材变化时，相关菜品自动更新

### 技术定义

React 由 Facebook 于 2013 年开源，是目前最流行的前端框架之一。它的主要特点包括：

- **声明式**：您描述"想要什么"，而不是"如何做"
- **组件化**：将界面拆分成独立、可复用的组件
- **虚拟 DOM**：使用内存中的 DOM 副本，最小化实际 DOM 操作
- **单向数据流**：数据自上而下传递，清晰可控

### 核心优势

选择 React 的主要原因：

| 优势 | 说明 |
|------|------|
| 高效更新 | 虚拟 DOM 机制减少不必要的重渲染 |
| 组件复用 | 一次编写，到处使用 |
| 生态丰富 | 庞大的第三方库和工具支持 |
| 社区活跃 | 遇到问题容易找到解决方案 |
| 学习曲线平缓 | 核心概念简单，易于上手 |
| 跨平台 | React Native 可开发移动应用 |

---

## 1.2 核心概念解析

### 组件（Component）

组件是 React 应用的基本构建块。可以把组件想象成一个"黑盒子"，它接收输入（数据），输出（用户界面）。

```
输入（Props/State） ──► 组件 ──► 输出（UI）
```

组件有两种主要类型：

- **函数组件**：使用 JavaScript 函数定义的组件
- **类组件**：使用 ES6 类定义的组件

### 虚拟 DOM（Virtual DOM）

虚拟 DOM 是真实 DOM 的轻量级 JavaScript 对象表示。

```
真实 DOM（浏览器渲染）     虚拟 DOM（内存中）
┌─────────────────┐      ┌─────────────────┐
│ <div>...</div>  │      │ JavaScript 对象 │
│                 │      │                 │
│ 更新需要操作    │      │ 更新只操作内存  │
│ 真实 DOM 树     │      │ 对象，易于比较  │
└─────────────────┘      └─────────────────┘
```

当状态变化时，React 会：

1. 创建新的虚拟 DOM 树
2. 与旧的虚拟 DOM 进行对比（Diff 算法）
3. 只更新发生变化的部分到真实 DOM

### JSX 语法

JSX 是 JavaScript 的语法扩展，允许在 JavaScript 中编写类似 HTML 的代码。

```jsx
// JSX 语法示例
const element = <h1>Hello, React!</h1>;
```

JSX 不是模板语言，它会被编译为普通的 JavaScript 函数调用。

---

## 1.3 开发环境搭建

### 方式一：使用 CDN（快速入门）

这种方式最适合初学者，无需安装 Node.js，直接在 HTML 文件中引入 React 即可。

创建 `example.html` 文件：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>第一个 React 应用</title>
    <!-- 引入 React 和 ReactDOM -->
    <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
    <!-- 引入 Babel，用于将 JSX 转换为 JavaScript -->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
    <!-- React 应用将渲染到这里 -->
    <div id="root"></div>

    <!-- 编写 React 代码 -->
    <script type="text/babel">
        // 创建函数组件
        function Welcome() {
            return <h1>欢迎学习 React!</h1>;
        }

        // 渲染组件到页面
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<Welcome />);
    </script>
</body>
</html>
```

用浏览器打开这个文件，您将看到"欢迎学习 React!"的标题。

### 方式二：使用 Create React App（推荐项目开发）

Create React App 是官方推荐的 React 项目创建工具。

#### 环境要求

- Node.js 版本 14 或更高
- npm 版本 5.6 或更高，或 Yarn

#### 创建步骤

```bash
# 1. 全局安装 create-react-app（可选）
npm install -g create-react-app

# 2. 创建新项目
npx create-react-app my-react-app

# 3. 进入项目目录
cd my-react-app

# 4. 启动开发服务器
npm start
```

项目创建完成后，将自动启动开发服务器，在浏览器中访问 http://localhost:3000 即可看到应用。

#### 项目结构

```
my-react-app/
├── public/              # 静态资源目录
│   └── index.html       # HTML 模板
├── src/                 # 源代码目录
│   ├── App.js          # 主组件
│   ├── App.css         # 组件样式
│   ├── index.js        # 入口文件
│   └── index.css       # 全局样式
├── package.json        # 项目配置和依赖
└── README.md           # 项目说明
```

### 方式三：使用 Vite（更快的构建工具）

Vite 是一个现代化的前端构建工具，启动速度更快。

```bash
# 1. 创建项目
npm create vite@latest my-react-app -- --template react

# 2. 进入项目目录
cd my-react-app

# 3. 安装依赖
npm install

# 4. 启动开发服务器
npm run dev
```

---

## 1.4 第一个 React 应用

### 代码解析

以下是一个完整的 React 应用示例，包含了基本结构：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>React 入门示例</title>
    <!-- 引入 React 核心库 -->
    <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
    <!-- 引入 ReactDOM，用于渲染 React 组件到 DOM -->
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
    <!-- 引入 Babel，用于解析 JSX 语法 -->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
    <div id="root"></div>

    <script type="text/babel">
        // 1. 定义组件：使用函数组件
        function App() {
            // 返回 JSX：描述组件的外观
            return (
                <div>
                    <h1>我的第一个 React 应用</h1>
                    <p>React 是一个用于构建用户界面的 JavaScript 库</p>
                </div>
            );
        }

        // 2. 创建根节点：指定 React 应用渲染到哪个 DOM 元素
        const root = ReactDOM.createRoot(document.getElementById('root'));

        // 3. 渲染组件：将 App 组件渲染到根节点
        root.render(<App />);
    </script>
</body>
</html>
```

### 代码说明

| 代码部分 | 说明 |
|---------|------|
| `ReactDOM.createRoot()` | 创建 React 应用的根节点 |
| `root.render(<App />)` | 将组件渲染到页面 |
| `<App />` | JSX 语法，表示使用 App 组件 |
| `function App() {...}` | 函数组件的定义 |

---

## 1.5 开发者工具

### React Developer Tools

React Developer Tools 是浏览器扩展程序，用于调试 React 应用。

#### 安装方法

- Chrome：访问 [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) 安装
- Firefox：访问 [React Developer Tools](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/) 安装

#### 功能介绍

安装后，打开任意 React 网站，您将看到：

- **Components 面板**：查看组件树结构
- **Profiler 面板**：分析组件性能

### 使用方法

1. 打开浏览器的开发者工具（F12）
2. 切换到 "Components" 或 "Profiler" 标签
3. 可以查看组件的属性、状态，以及性能数据

---

## 1.6 常见问题

### Q1：React 和 ReactDOM 有什么区别？

React 是核心库，提供了创建组件和管理的状态的基本 API。ReactDOM 是专门用于 Web 平台的渲染库，负责将 React 组件渲染到浏览器 DOM 中。这种分离设计使得 React 可以同时支持 Web（ReactDOM）和移动端（React Native）。

### Q2：为什么需要 Babel？

浏览器原生不支持 JSX 语法，Babel 是一个 JavaScript 编译器，将 JSX 代码转换为浏览器可以理解的普通 JavaScript 代码。在开发阶段使用 Babel，在生产环境可以预先编译 JSX。

### Q3：React 18 有什么新特性？

React 18 引入了并发渲染、新的 hooks（如 useId、useSyncExternalStore）、自动批处理等特性，提供了更好的性能和开发体验。

---

## 练习题

### 基础练习

**练习要求**：创建一个 React 页面，显示您的个人信息，包括姓名、年龄、所在城市。

**参考效果**：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>个人信息页面</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
    <div id="root"></div>

    <script type="text/babel">
        function Profile() {
            return (
                <div style={{border: '1px solid #ccc', padding: '20px', maxWidth: '400px'}}>
                    <h2>个人信息</h2>
                    <p><strong>姓名：</strong>张三</p>
                    <p><strong>年龄：</strong>25岁</p>
                    <p><strong>城市：</strong>北京</p>
                </div>
            );
        }

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<Profile />);
    </script>
</body>
</html>
```

### 进阶练习

**练习要求**：创建一个包含多个组件的页面，包括 Header、Content、Footer 三个组件。

**提示**：
- 创建三个函数组件：Header、Content、Footer
- 在 App 组件中组合使用这三个组件

### 挑战练习

**练习要求**：创建一个简单的计数器页面，显示当前计数，并提供"增加"和"减少"两个按钮。

**提示**：虽然还没有学习状态管理，但您可以尝试使用原生 JavaScript 变量，并在每次点击时重新调用 render 方法来更新显示。

---

## 学习目标检查

- [ ] 理解 React 的核心理念（组件化、虚拟 DOM）
- [ ] 了解函数组件和类组件的区别
- [ ] 能够使用 CDN 方式创建 React 页面
- [ ] 能够使用 Create React App 创建项目
- [ ] 理解 JSX 语法的基本形式
- [ ] 掌握 React Developer Tools 的基本使用

---

## 文件说明

本章包含以下文件：

| 文件名 | 说明 |
|--------|------|
| `README.md` | 本章教程文档 |
| `example.html` | 第一个 React 应用示例 |

---

## 参考资料

- [React 官方文档](https://react.dev/)
- [React 快速入门](https://react.dev/learn)
- [Create React App 文档](https://create-react-app.dev/)
