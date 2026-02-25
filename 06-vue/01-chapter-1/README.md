# Vue 3 简介与安装

## 本章目的

了解 Vue.js 是什么，为什么需要它，并掌握 Vue 3 + `<script setup>` 的安装和使用方法。

---

## 内容概述

- Vue.js 是什么？
- Vue 的核心特性
- Vue 2 vs Vue 3
- 为什么选择 `<script setup>`？
- 如何安装 Vue 3
- 第一个 Vue 3 应用

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

```vue
<!-- 声明式：告诉 Vue "我希望这里显示 count 的值" -->
<template>
  <p>Count: {{ count }}</p>
</template>
```

#### 2. 响应性

Vue 会自动跟踪 JavaScript 状态并在其发生变化时响应式地更新 DOM。

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)
// 修改这个值，页面会自动更新
count.value = 5  // 页面上的显示会立即变成 5
</script>
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
| API 风格 | 主要使用选项式 API | **组合式 API + `<script setup>`** |
| 响应式原理 | Object.defineProperty | Proxy (性能更好) |
| TypeScript 支持 | 支持但不够完美 | **原生支持，更好** |
| 性能 | 优秀 | **更快，体积更小** |
| `<script setup>` | 不支持 | **Vue 3.2+ 原生支持** |

### 为什么选择 `<script setup>`？

`<script setup>` 是 Vue 3.2 引入的编译时语法糖，用于简化组合式 API 的使用。

#### 对比示例

**传统写法（Options API）：**

```vue
<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    }
  }
}
</script>
```

**`<script setup>` 写法：**

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)
const increment = () => count.value++
</script>
```

#### `<script setup>` 的优势

1. **代码更简洁**：减少约 40% 的样板代码
2. **更好的 TypeScript 支持**：类型推断更友好
3. **自动暴露**：顶层变量自动暴露给模板，无需 return
4. **自动导入组件**：无需 components 选项，直接导入即可使用
5. **更符合现代开发习惯**：类似 React Hooks 的写法

---

## Vue 的安装方式

### 方式 1：Vite 项目（推荐，适合实际开发）

```bash
# 创建 Vue 3 + TypeScript 项目
npm create vue@latest my-vue-app

# 按照提示选择：
# ✔ TypeScript? … Yes
# ✔ JSX Support? … No
# ✔ Vue Router? … Yes (可选)
# ✔ Pinia? … Yes (可选)
# ✔ Vitest? … No
# ✔ Cypress? … No
# ✔ ESLint? … Yes
# ✔ Prettier? … Yes

# 进入目录
cd my-vue-app

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 方式 2：CDN 引入（最简单，适合学习）

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vue 3 CDN 示例</title>
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
        const message = ref('Hello Vue 3!')
        const count = ref(0)
        return { message, count }
      }
    }).mount('#app')
  </script>
</body>
</html>
```

---

## 第一个 Vue 3 + `<script setup>` 应用

### 项目结构

```
my-vue-app/
├── src/
│   ├── components/       # 组件目录
│   ├── App.vue          # 根组件
│   └── main.ts          # 入口文件
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

### 根组件示例（App.vue）

```vue
<script setup lang="ts">
import { ref } from 'vue'
import HelloWorld from './components/HelloWorld.vue'

// 响应式数据
const count = ref(0)

// 方法
const increment = () => {
  count.value++
}

const decrement = () => {
  count.value--
}

const reset = () => {
  count.value = 0
}
</script>

<template>
  <div class="container">
    <h1>欢迎使用 Vue 3 + &lt;script setup&gt;！</h1>
    
    <div class="counter">
      <h2>计数器示例</h2>
      <p class="count">当前计数: {{ count }}</p>
      
      <div class="buttons">
        <button @click="decrement">-1</button>
        <button @click="reset">重置</button>
        <button @click="increment">+1</button>
      </div>
    </div>
    
    <!-- 使用子组件 -->
    <HelloWorld msg="Hello Vue 3" />
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.counter {
  background: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  margin: 20px 0;
}

.count {
  font-size: 24px;
  font-weight: bold;
  color: #42b883;
}

.buttons {
  margin-top: 15px;
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
```

### 子组件示例（HelloWorld.vue）

```vue
<script setup lang="ts">
// 定义 props
interface Props {
  msg: string
}

defineProps<Props>()
</script>

<template>
  <div class="hello">
    <h2>{{ msg }}</h2>
    <p>这是一个使用 &lt;script setup&gt; 的组件示例</p>
  </div>
</template>

<style scoped>
.hello {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  margin-top: 20px;
}

h2 {
  color: #35495e;
}
</style>
```

---

## 代码解析

### `<script setup>` 的基本结构

```vue
<script setup lang="ts">
// 1. 导入 Vue 函数
import { ref, computed, watch } from 'vue'

// 2. 定义响应式数据
const count = ref(0)
const message = ref('Hello')

// 3. 定义计算属性
const doubleCount = computed(() => count.value * 2)

// 4. 定义方法
const increment = () => {
  count.value++
}

// 5. 使用生命周期钩子
import { onMounted } from 'vue'
onMounted(() => {
  console.log('组件已挂载')
})
</script>
```

### 关键概念

#### 1. ref - 响应式数据

```vue
<script setup>
import { ref } from 'vue'

// 创建一个响应式的值
const count = ref(0)

// 在 script 中访问需要使用 .value
console.log(count.value)  // 0

// 在 template 中直接使用，不需要 .value
// <p>{{ count }}</p>
</script>
```

#### 2. 自动暴露给模板

```vue
<script setup>
// 在 <script setup> 中定义的变量、函数会自动暴露给模板
const message = 'Hello Vue!'  // 模板中可以直接使用 {{ message }}

const handleClick = () => {   // 模板中可以直接使用 @click="handleClick"
  console.log('clicked')
}
</script>
```

#### 3. 组件自动导入

```vue
<script setup>
// 直接导入组件，无需在 components 选项中注册
import MyComponent from './MyComponent.vue'
import AnotherComponent from './AnotherComponent.vue'
</script>

<template>
  <!-- 直接使用导入的组件 -->
  <MyComponent />
  <AnotherComponent />
</template>
```

---

## 最佳实践

### ✅ 推荐做法

1. **始终使用 `<script setup>`**：这是 Vue 3 官方推荐的现代写法
2. **使用 TypeScript**：提供更好的类型安全和代码提示
3. **使用 Vite**：现代、快速、配置简单的构建工具
4. **使用 Vue Devtools 浏览器插件**：方便调试 Vue 应用

### ❌ 应避免的做法

1. **不要混用 Options API 和 `<script setup>`**：选择一个风格并保持一致
2. **不要直接修改 DOM**：让 Vue 管理 DOM，不要手动操作
3. **不要忘记 `.value`**：在 script 中访问 ref 需要使用 `.value`

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
- [ ] 理解为什么选择 `<script setup>`
- [ ] 掌握至少一种 Vue 的安装方式
- [ ] 能够创建并运行第一个 Vue 3 + `<script setup>` 应用
- [ ] 理解响应式数据的概念（ref）
- [ ] 理解模板语法（插值、事件绑定）
- [ ] 了解 `<script setup>` 的基本结构

---

## 下一步

完成本章学习后，进入 [第 2 章：模板语法](../02-chapter-2/README.md)，学习 Vue 模板的各种语法特性。

---

## 参考代码

本章示例代码详见 `examples/` 目录：
- `first-app/` - 第一个 Vue 3 + `<script setup>` 应用
- `counter/` - 计数器示例
