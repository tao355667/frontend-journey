# Vue 简介与安装

## 本章目的

了解 Vue.js 是什么，为什么需要它，并掌握 Vue 3 的安装方法。

---

## 内容概述

- Vue.js 是什么？
- Vue 的核心特性
- Vue 2 vs Vue 3
- 如何安装 Vue
- 第一个 Vue 应用

---

## 核心概念讲解

### 什么是 Vue.js？

Vue.js（读音 /vjuː/，类似 "view"）是一个用于构建用户界面的渐进式 JavaScript 框架。它提供了一套声明式、组件化的编程模型，帮助你高效地开发界面。

#### 类比理解

想象你在搭建一个乐高城堡：
- **传统 JavaScript** 就像是一块块散落的乐高积木，你需要自己找每一块、看说明书、拼好。
- **Vue.js** 则像是一个乐高套装，已经为你分类好了零件，有详细的步骤图，你只需要按照顺序拼装即可。

### Vue 的核心特性

#### 1. 声明式渲染

Vue 基于标准 HTML 拓展了一套模板语法，使我们能声明式地描述 HTML 输出与 JavaScript 状态之间的关系。

```html
<!-- 声明式：告诉 Vue "我希望这里显示 count 的值" -->
<p>Count: {{ count }}</p>
```

#### 2. 响应性

Vue 会自动跟踪 JavaScript 状态并在其发生变化时响应式地更新 DOM。

```javascript
// 修改这个值，页面会自动更新
this.count = 5  // 页面上的显示会立即变成 5
```

#### 3. 组件化

一个应用可以包含多个互相独立的组件，每个组件封装了自己的逻辑和样式。

```
App (根组件)
├── Header (头部组件)
├── Sidebar (侧边栏组件)
└── Content (内容组件)
    ├── Article (文章组件)
    └── Comments (评论组件)
```

### Vue 2 vs Vue 3

| 特性 | Vue 2 | Vue 3 |
|------|-------|-------|
| API 风格 | 主要使用选项式 API | 组合式 API + 选项式 API |
| 响应式原理 | Object.defineProperty | Proxy (性能更好) |
| TypeScript 支持 | 支持但不够完美 | 原生支持，更好 |
| 性能 | 优秀 | 更快，体积更小 |
| 组合式 API | 需要 @vue/composition-api 插件 | 内置支持 |

### Vue 的安装方式

Vue 有多种安装方式，从简单到复杂：

#### 方式 1：CDN 引入（最简单，适合学习）

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vue CDN 示例</title>
  <!-- 引入 Vue -->
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
</head>
<body>
  <div id="app">
    <h1>{{ message }}</h1>
    <button @click="count++">点击了 {{ count }} 次</button>
  </div>

  <script>
    const { createApp, ref } = Vue

    createApp({
      setup() {
        const message = ref('Hello Vue!')
        const count = ref(0)
        return { message, count }
      }
    }).mount('#app')
  </script>
</body>
</html>
```

#### 方式 2：Vite 项目（推荐，适合实际开发）

```bash
# 创建 Vue 3 项目
npm create vue@latest my-vue-app

# 或创建 Vite + Vue 项目
npm create vite@latest my-vue-app -- --template vue

# 进入目录
cd my-vue-app

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

#### 方式 3：Vue CLI（Vue 2 时代的方式）

```bash
# 全局安装 Vue CLI
npm install -g @vue/cli

# 创建项目
vue create my-vue-app

# 启动项目
npm run serve
```

---

## 代码示例说明

### JavaScript 版本

文件：`js/first-app.html`

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>第一个 Vue 应用 - JS 版本</title>
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
    }
    .counter {
      background: #f0f0f0;
      padding: 20px;
      border-radius: 8px;
      text-align: center;
    }
    button {
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
      background: #42b883;
      color: white;
      border: none;
      border-radius: 4px;
    }
    button:hover {
      background: #35495e;
    }
  </style>
</head>
<body>
  <div id="app">
    <!-- 模板语法：双大括号插值 -->
    <h1>{{ title }}</h1>
    
    <div class="counter">
      <!-- 显示计数 -->
      <p>当前计数: {{ count }}</p>
      
      <!-- 事件绑定：@click 是 v-on:click 的简写 -->
      <button @click="increment">增加</button>
      <button @click="decrement">减少</button>
      <button @click="reset">重置</button>
    </div>

    <!-- 条件渲染 -->
    <p v-if="count > 5">计数超过 5 了！</p>
    <p v-else-if="count < 0">计数小于 0 了！</p>
    <p v-else>计数在正常范围内</p>
  </div>

  <script>
    // 从 Vue 中提取 createApp 和 ref
    const { createApp, ref } = Vue

    // 创建 Vue 应用
    createApp({
      // setup 函数是 Vue 3 组合式 API 的入口点
      setup() {
        // ref 用于创建响应式数据
        // 在模板中直接使用 count，在 JavaScript 中需要使用 count.value
        const title = ref('欢迎使用 Vue 3！')
        const count = ref(0)

        // 定义方法
        const increment = () => {
          count.value++  // 修改 ref 的值需要使用 .value
        }

        const decrement = () => {
          count.value--
        }

        const reset = () => {
          count.value = 0
        }

        // 返回的数据和方法可以在模板中使用
        return {
          title,
          count,
          increment,
          decrement,
          reset
        }
      }
    }).mount('#app')  // 挂载到 id 为 app 的元素上
  </script>
</body>
</html>
```

### TypeScript 版本

文件：`ts/first-app.html`

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>第一个 Vue 应用 - TS 版本</title>
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
    }
    .counter {
      background: #f0f0f0;
      padding: 20px;
      border-radius: 8px;
      text-align: center;
    }
    button {
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
      background: #42b883;
      color: white;
      border: none;
      border-radius: 4px;
      margin: 0 5px;
    }
    button:hover {
      background: #35495e;
    }
  </style>
</head>
<body>
  <div id="app">
    <h1>{{ title }}</h1>
    
    <div class="counter">
      <p>当前计数: {{ count }}</p>
      <button @click="increment">增加</button>
      <button @click="decrement">减少</button>
      <button @click="reset">重置</button>
    </div>

    <p v-if="count > 5">计数超过 5 了！</p>
    <p v-else-if="count < 0">计数小于 0 了！</p>
    <p v-else>计数在正常范围内</p>
  </div>

  <script type="module">
    // TypeScript 版本（实际在 HTML 中我们用类型注释来模拟）
    const { createApp, ref } = Vue

    // 在真实的 TS 项目中，你会这样写：
    // import { createApp, ref } from 'vue'
    // import type { Ref } from 'vue'

    createApp({
      setup() {
        // TypeScript 中需要明确类型
        // const title: Ref<string> = ref('欢迎使用 Vue 3！')
        // const count: Ref<number> = ref(0)
        
        const title = ref('欢迎使用 Vue 3！')  // 类型推断为 string
        const count = ref(0)                   // 类型推断为 number

        const increment = (): void => {
          count.value++
        }

        const decrement = (): void => {
          count.value--
        }

        const reset = (): void => {
          count.value = 0
        }

        return {
          title,
          count,
          increment,
          decrement,
          reset
        }
      }
    }).mount('#app')
  </script>
</body>
</html>
```

---

## JS 与 TS 对比

| 方面 | JavaScript | TypeScript |
|------|-----------|------------|
| **类型检查** | 运行时才能发现类型错误 | 编译时就能发现类型错误 |
| **代码提示** | 有限的智能提示 | 更好的代码补全和提示 |
| **ref 声明** | `const count = ref(0)` | `const count: Ref<number> = ref(0)` 或自动推断 |
| **方法返回类型** | 无需声明 | `(): void => {...}` |
| **重构支持** | 较困难 | 更安全、更容易 |
| **学习曲线** | 平缓 | 需要学习类型系统 |

### 什么时候用 JS？什么时候用 TS？

- **用 JavaScript**：
  - 学习 Vue 基础知识时
  - 小型项目或个人项目
  - 快速原型开发
  - 团队成员对 TS 不熟悉

- **用 TypeScript**：
  - 中大型项目
  - 团队协作开发
  - 需要长期维护的项目
  - 追求代码质量和可维护性

---

## 最佳实践

### ✅ 推荐做法

1. **使用 Vite 创建项目**：现代、快速、配置简单
2. **从 CDN 开始学习**：不需要配置环境，专注学习 Vue 本身
3. **使用 Vue Devtools 浏览器插件**：方便调试 Vue 应用
4. **遵循官方风格指南**：保持代码一致性

### ❌ 应避免的做法

1. **不要混用 Vue 2 和 Vue 3 的语法**：Vue 3 虽然支持选项式 API，但某些特性有变化
2. **不要直接修改 DOM**：让 Vue 管理 DOM，不要手动操作
3. **不要忽略响应式原理的理解**：理解 ref 和 reactive 的区别很重要

---

## 练习题

### 基础练习

创建一个简单的计数器应用：
1. 显示当前计数
2. 提供增加、减少按钮
3. 当计数大于 10 时显示 "计数很大"，小于 0 时显示 "计数为负"

### 进阶练习

扩展计数器功能：
1. 添加一个输入框，允许用户设置步长（每次增加或减少的数量）
2. 添加一个 "翻倍" 按钮，将当前计数乘以 2
3. 记录历史操作（显示每次操作的记录）

### 挑战练习

创建一个简单的待办事项列表：
1. 可以添加新的待办事项
2. 可以标记待办事项为已完成
3. 可以删除待办事项
4. 显示待办事项总数和已完成数量

---

## 学习目标检查清单

- [ ] 理解什么是 Vue.js 和它的核心特性
- [ ] 了解 Vue 2 和 Vue 3 的主要区别
- [ ] 掌握至少一种 Vue 的安装方式
- [ ] 能够创建并运行第一个 Vue 应用
- [ ] 理解响应式数据的概念（ref）
- [ ] 理解模板语法（插值、事件绑定）
- [ ] 了解 JS 和 TS 在 Vue 开发中的区别

---

## 练习题答案

详见 `practice-solution.html` 文件。

---

## 下一步

完成本章学习后，进入 [第 2 章：模板语法](../02-chapter-2/README.md)，学习 Vue 模板的各种语法特性。
