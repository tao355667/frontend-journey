# React 入门教程

> 从零开始系统学习 React，构建现代化前端应用

---

## 教程简介

本教程是一套完整的 React 入门指南，专为零基础学习者设计。通过 13 个章节的系统学习，您将掌握 React 的核心概念和常用特性，能够独立构建简单的 Web 应用。

React 是 Facebook 开源的 JavaScript 库，用于构建用户界面。它采用组件化的开发方式，让前端代码更加模块化、可维护。React 的核心理念是"声明式编程"和"虚拟 DOM"，能够高效地更新和渲染界面。

本教程采用概念讲解式的教学风格，每个知识点都配有通俗的解释和完整的代码示例。学习过程中，您将通过实践练习巩固所学知识，最终完成一个功能完整的待办事项应用。

---

## 教程特点

- **循序渐进**：从基础概念开始，逐步深入高级特性
- **概念清晰**：每个知识点都有通俗易懂的解释和类比
- **示例丰富**：每个概念都配有完整的、可运行的代码示例
- **实践导向**：每章末尾都有练习题，帮助巩固所学知识
- **项目驱动**：最后章节通过完成一个待办事项应用，综合运用所有知识

---

## 学习路径

```
┌─────────────────────────────────────────────────────────────────┐
│                        React 入门教程                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────┐                                                  │
│  │ 1.环境搭建 │ ──► 2.JSX语法 ──► 3.函数组件 ──► 4.Class组件  │
│  └────┬─────┘         (第2章)      (第3章)       (第4章)       │
│       │                                                      │  │
│       ▼                                                      ▼  │
│  ┌──────────┐                                         ┌──────────┐
│  │ 5.Props  │ ──► 6.State ──► 7.事件 ──► 8.条件渲染   │ 13.项目  │
│  └────┬─────┘     (第6章)   (第7章)    (第8章)       │ (todo应用)│
│       │                                                   └────┬───┘
│       ▼                                                        │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐                │
│  │ 9.列表渲染│──►│10.表单处理│──►│11.Hooks  │                │
│  └────┬─────┘    └────┬─────┘    └────┬─────┘                │
│       │               │               │                       │
│       ▼               ▼               ▼                       │
│       └───────────────┴───────────────┘                       │
│                         │                                      │
│                         ▼                                      │
│                 ┌──────────────┐                              │
│                 │12.组件通信    │                              │
│                 └──────────────┘                              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**学习建议**：建议按照章节顺序学习，因为后面的章节会用到前面章节的知识。

---

## 章节内容

### 第一部分：基础入门

| 章节 | 名称 | 学习目标 | 预计时间 |
|------|------|---------|---------|
| 第1章 | React简介与环境搭建 | 理解 React 核心概念，搭建开发环境 | 30分钟 |
| 第2章 | JSX语法 | 掌握 JSX 语法规则，能够编写模板 | 45分钟 |
| 第3章 | 函数组件 | 理解组件概念，创建和使用函数组件 | 40分钟 |
| 第4章 | Class组件 | 掌握类组件的创建和生命周期 | 45分钟 |

### 第二部分：核心概念

| 章节 | 名称 | 学习目标 | 预计时间 |
|------|------|---------|---------|
| 第5章 | Props属性 | 理解组件间数据传递，掌握 Props 用法 | 40分钟 |
| 第6章 | State状态管理 | 掌握状态管理，实现响应式界面 | 50分钟 |
| 第7章 | 事件处理 | 学会绑定事件，处理用户交互 | 35分钟 |
| 第8章 | 条件渲染 | 掌握条件渲染的各种方式 | 30分钟 |

### 第三部分：进阶内容

| 章节 | 名称 | 学习目标 | 预计时间 |
|------|------|---------|---------|
| 第9章 | 列表渲染 | 学会用 map 渲染列表，理解 key | 35分钟 |
| 第10章 | 表单处理 | 掌握受控组件，实现表单验证 | 45分钟 |
| 第11章 | Hooks深入 | 深入理解常用 Hooks | 50分钟 |
| 第12章 | 组件通信 | 掌握组件间通信方式 | 40分钟 |

### 第四部分：项目实践

| 章节 | 名称 | 学习目标 | 预计时间 |
|------|------|---------|---------|
| 第13章 | 待办事项应用 | 综合运用所有知识，完成项目 | 60分钟 |

---

## 目录结构

```
05-react/
├── README.md                          # 教程总览
│
├── 01-react-intro/                    # 第1章：React简介与环境搭建
│   ├── README.md
│   └── example.html
│
├── 02-jsx/                            # 第2章：JSX语法
│   ├── README.md
│   ├── basic.jsx
│   ├── expressions.jsx
│   ├── attributes.jsx
│   └── practice-solution.html
│
├── 03-function-component/             # 第3章：函数组件
│   ├── README.md
│   ├── simple-component.jsx
│   ├── component-reuse.jsx
│   └── practice-solution.html
│
├── 04-class-component/                # 第4章：Class组件
│   ├── README.md
│   ├── basic-class.jsx
│   ├── constructor-demo.jsx
│   └── practice-solution.html
│
├── 05-props/                          # 第5章：Props属性
│   ├── README.md
│   ├── basic-props.jsx
│   ├── props-types.jsx
│   └── practice-solution.html
│
├── 06-state/                          # 第6章：State状态管理
│   ├── README.md
│   ├── use-state-demo.jsx
│   ├── set-state-demo.jsx
│   └── practice-solution.html
│
├── 07-events/                         # 第7章：事件处理
│   ├── README.md
│   ├── basic-events.jsx
│   ├── event-object.jsx
│   └── practice-solution.html
│
├── 08-conditional-rendering/          # 第8章：条件渲染
│   ├── README.md
│   ├── logical-operator.jsx
│   ├── ternary-operator.jsx
│   └── practice-solution.html
│
├── 09-list-rendering/                 # 第9章：列表渲染
│   ├── README.md
│   ├── map-rendering.jsx
│   ├── key-importance.jsx
│   └── practice-solution.html
│
├── 10-forms/                          # 第10章：表单处理
│   ├── README.md
│   ├── controlled-component.jsx
│   ├── form-validation.jsx
│   └── practice-solution.html
│
├── 11-hooks/                          # 第11章：Hooks深入
│   ├── README.md
│   ├── use-effect-demo.jsx
│   ├── use-ref-demo.jsx
│   └── practice-solution.html
│
├── 12-component-communication/        # 第12章：组件通信
│   ├── README.md
│   ├── parent-to-child.jsx
│   ├── child-to-parent.jsx
│   └── practice-solution.html
│
└── 13-todo-project/                   # 第13章：待办事项项目
    ├── README.md
    ├── todo-app.jsx
    ├── todo-item.jsx
    └── todo-list.jsx
```

---

## 工具准备

### 必备工具

- **代码编辑器**：Visual Studio Code（推荐）、Sublime Text、WebStorm
- **浏览器**：Chrome（推荐）、Firefox、Edge
- **Node.js**：版本 14 或更高版本，用于运行开发服务器

### 可选工具

- **包管理器**：npm（Node.js 自带）、Yarn
- **版本控制**：Git，用于管理代码版本
- **浏览器扩展**：React Developer Tools，用于调试 React 应用

---

## 如何使用

### 学习步骤

1. **阅读章节 README**：先仔细阅读章节的说明文档，理解概念
2. **运行示例代码**：将示例代码复制到本地运行，观察效果
3. **完成练习题**：尝试独立完成练习题
4. **查看参考答案**：完成后再参考答案，检查自己的理解
5. **总结笔记**：记录关键概念和容易出错的地方

### 学习建议

- **动手实践**：不要只看教程，一定要动手写代码
- **循序渐进**：不要跳过章节，确保理解每个知识点
- **及时练习**：每学完一章就完成练习题，巩固知识
- **调试代码**：遇到问题时，使用浏览器开发者工具调试
- **多问多查**：遇到不懂的概念，查阅文档或搜索引擎

### 时间规划

| 学习强度 | 每日时间 | 完成周期 |
|---------|---------|---------|
| 轻松学习 | 30分钟 | 约 3 周 |
| 正常学习 | 1小时 | 约 2 周 |
| 强化学习 | 2小时 | 约 1 周 |

---

## 学习目标

完成本教程后，您将能够：

- 理解 React 的核心理念和优势
- 熟练使用 JSX 语法编写模板
- 创建和使用函数组件、类组件
- 理解组件间的数据传递（Props）和状态管理（State）
- 处理用户事件，实现交互功能
- 实现条件渲染和列表渲染
- 处理表单输入和验证
- 使用常用 Hooks（useState、useEffect、useRef）
- 掌握组件间的通信方式
- 独立完成简单的 React 应用

---

## 常见问题

### Q1：学习本教程需要什么基础？

本教程为零基础设计，但建议您具备以下基础：
- 了解 HTML 和 CSS 基础
- 熟悉 JavaScript 基本语法
- 了解 ES6 语法（箭头函数、解构赋值等）

### Q2：应该使用 Create React App 还是 Vite？

两种方式都可以。Create React App 是官方推荐方式，Vite 是更现代的工具构建速度更快。本教程示例使用 CDN 引入方式，方便快速入门。

### Q3：函数组件和类组件应该用哪个？

React 官方推荐使用函数组件配合 Hooks。类组件仍然可以使用，但在新项目中建议使用函数组件。

### Q4：练习题需要全部完成吗？

建议尽量完成所有练习题。如果时间紧张，至少完成基础练习题。

### Q5：遇到问题怎么办？

- 检查代码是否有拼写错误
- 查看浏览器控制台的错误信息
- 对比参考答案，找出问题所在
- 在搜索引擎查找类似问题
- 查阅 React 官方文档

---

## 参考资源

### 官方文档

- [React 官方文档](https://react.dev/)
- [React 中文文档](https://zh-hans.react.dev/)
- [Create React App 文档](https://create-react-app.dev/)

### 学习资源

- [MDN Web Docs](https://developer.mozilla.org/)
- [JavaScript.info](https://javascript.info/)
- [ES6 入门教程](http://es6.ruanyifeng.com/)

### 社区支持

- [GitHub React](https://github.com/facebook/react)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/reactjs)
- [React subreddit](https://www.reddit.com/r/reactjs/)

---

## 开始学习

准备好开始您的 React 学习之旅了吗？

从第一章开始：[第1章 - React 简介与环境搭建](./01-react-intro/README.md)

---

## 版权声明

本教程仅供学习使用，希望能够帮助您快速入门 React 开发。

祝您学习愉快！
