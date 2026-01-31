# 第 26 章：综合实践项目 - 创建一个完整的 Todo List 应用

## 本章目的

通过构建一个完整的待办事项（Todo List）应用，综合运用前面章节学到的 Vue 知识，掌握从需求分析到功能实现的完整开发流程。

---

## 内容概述

- 项目需求分析与功能规划
- 应用架构设计与数据建模
- 核心功能实现（增删改查）
- 高级功能实现（筛选、排序、本地存储）
- 性能优化与最佳实践
- 代码重构与模块化

---

## 核心概念讲解

### 什么是 Todo List 应用？

Todo List（待办事项列表）是最经典的前端练手项目。它能帮助我们掌握：
- **状态管理**：如何管理列表数据
- **用户交互**：如何处理用户的添加、删除、修改操作
- **数据持久化**：如何让数据在页面刷新后不丢失
- **条件渲染**：如何根据不同的条件显示不同的内容

#### 类比理解

想象你在管理一个购物清单：
- **添加待办** = 在清单上写下要买的东西
- **标记完成** = 买完东西后打勾
- **删除待办** = 划掉不需要买的东西
- **筛选查看** = 只看还没买的东西
- **本地存储** = 把清单拍照保存，即使丢了纸条也能找回

### 应用架构设计

```
Todo List 应用
├── 数据层 (State)
│   ├── todos[] - 待办事项数组
│   ├── newTodo - 输入框内容
│   └── filter - 当前筛选条件
├── 计算层 (Computed)
│   ├── filteredTodos - 过滤后的列表
│   ├── totalCount - 总数量
│   ├── completedCount - 已完成数量
│   └── pendingCount - 待完成数量
├── 方法层 (Methods)
│   ├── addTodo() - 添加待办
│   ├── removeTodo() - 删除待办
│   └── clearCompleted() - 清除已完成
└── 持久层 (Storage)
    └── localStorage - 本地存储
```

### 数据模型设计

```javascript
// Todo 事项的数据结构
{
  id: 1,           // 唯一标识符
  text: '学习 Vue', // 待办内容
  completed: false  // 完成状态
}
```

### 功能模块划分

| 模块 | 功能 | 涉及知识点 |
|------|------|-----------|
| 输入模块 | 添加待办 | v-model, @keyup.enter |
| 列表模块 | 显示待办 | v-for, :key |
| 操作模块 | 完成/删除 | v-model, @click |
| 筛选模块 | 过滤显示 | computed, 条件判断 |
| 统计模块 | 数量统计 | computed, filter |
| 存储模块 | 数据持久化 | watch, localStorage |

---

## 代码示例说明

### JavaScript 版本

文件：`src/js/todolist-app.html`

这个版本展示了 Todo List 的基础实现，包含以下核心功能：

#### 1. 响应式数据定义

```javascript
const { createApp, ref, computed, watch } = Vue

createApp({
  setup() {
    // 响应式数据
    const newTodo = ref('')                    // 输入框内容
    const todos = ref([                        // 待办事项列表
      { id: 1, text: '学习 Vue 3', completed: true },
      { id: 2, text: '创建 Todo 应用', completed: false }
    ])
    const filter = ref('all')                  // 筛选条件
    const nextId = ref(3)                      // 下一个 ID
    
    return { newTodo, todos, filter, nextId }
  }
}).mount('#app')
```

**关键点**：
- 使用 `ref` 创建响应式数据
- `todos` 数组存储所有待办事项
- 每个待办是一个对象，包含 `id`、`text`、`completed`

#### 2. 计算属性 - 筛选功能

```javascript
const filteredTodos = computed(() => {
  switch (filter.value) {
    case 'active':
      return todos.value.filter(todo => !todo.completed)
    case 'completed':
      return todos.value.filter(todo => todo.completed)
    default:
      return todos.value
  }
})
```

**类比理解**：
想象你有一堆衣服（todos）：
- `filter` 就像是你想要查看什么类型的衣服
- `all` = 看所有衣服
- `active` = 只看脏衣服（未完成）
- `completed` = 只看干净衣服（已完成）
- `computed` 会自动根据筛选条件显示对应的衣服

#### 3. 本地存储实现

```javascript
// 监听 todos 变化，自动保存到 localStorage
watch(todos, (newTodos) => {
  localStorage.setItem('todos', JSON.stringify(newTodos))
}, { deep: true })

// 页面加载时读取数据
const savedTodos = localStorage.getItem('todos')
if (savedTodos) {
  todos.value = JSON.parse(savedTodos)
}
```

**工作原理**：
1. `watch` 监听 `todos` 数组的变化（添加、删除、修改）
2. 变化时，将数据转换为 JSON 字符串存入 `localStorage`
3. 页面刷新后，从 `localStorage` 读取数据并解析
4. 实现数据持久化，刷新页面不丢失

**类比理解**：
- `localStorage` 就像是浏览器的"记事本"
- `JSON.stringify` 把数据写成文字
- `JSON.parse` 把文字读回成数据
- `watch` 就像是一个自动记录员，每次数据变化都自动记录

### TypeScript 版本

文件：`src/ts/todolist-app.html`

TypeScript 版本在 JS 版本的基础上增加了类型安全：

#### 1. 类型定义

```typescript
// 待办事项接口
interface Todo {
  id: number
  text: string
  completed: boolean
}

// 筛选类型
type FilterType = 'all' | 'active' | 'completed'
```

#### 2. 带类型的响应式数据

```typescript
const newTodo: Ref<string> = ref('')
const todos: Ref<Todo[]> = ref([...])
const filter: Ref<FilterType> = ref('all')
```

#### JS 与 TS 对比

| 方面 | JavaScript | TypeScript |
|------|-----------|------------|
| **类型定义** | 无 | `interface Todo` |
| **ref 类型** | `ref('')` | `Ref<string>` |
| **数组类型** | `ref([])` | `Ref<Todo[]>` |
| **编译检查** | 运行时出错 | 编译时发现错误 |
| **代码提示** | 有限 | 更好的 IDE 支持 |

---

## 实现步骤详解

### 第一步：搭建基础结构

1. 创建 HTML 骨架，引入 Vue 3 CDN
2. 设计界面布局（输入区、列表区、统计区）
3. 定义响应式数据

### 第二步：实现添加功能

```javascript
const addTodo = () => {
  const text = newTodo.value.trim()
  if (!text) return
  
  todos.value.push({
    id: nextId.value++,
    text: text,
    completed: false
  })
  
  newTodo.value = ''
}
```

**注意事项**：
- 使用 `.trim()` 去除首尾空格
- 空内容不添加
- 添加后清空输入框

### 第三步：实现删除功能

```javascript
const removeTodo = (id) => {
  const index = todos.value.findIndex(todo => todo.id === id)
  if (index > -1) {
    todos.value.splice(index, 1)
  }
}
```

### 第四步：实现完成切换

使用 `v-model` 双向绑定：

```html
<input type="checkbox" v-model="todo.completed">
```

### 第五步：实现筛选功能

```javascript
const filteredTodos = computed(() => {
  switch (filter.value) {
    case 'active':
      return todos.value.filter(todo => !todo.completed)
    case 'completed':
      return todos.value.filter(todo => todo.completed)
    default:
      return todos.value
  }
})
```

### 第六步：添加本地存储

```javascript
// 保存数据
watch(todos, (newTodos) => {
  localStorage.setItem('todos', JSON.stringify(newTodos))
}, { deep: true })

// 读取数据
const savedTodos = localStorage.getItem('todos')
if (savedTodos) {
  todos.value = JSON.parse(savedTodos)
}
```

---

## 扩展功能实现

详见 `practice-solution.html`，包含以下高级功能：

### 1. 优先级设置

为每个待办添加优先级（高/中/低）：

```javascript
{
  id: 1,
  text: '学习 Vue',
  completed: false,
  priority: 'high'  // 新增字段
}
```

### 2. 截止日期

添加截止日期，并标记过期事项：

```javascript
const isOverdue = (todo) => {
  if (!todo.dueDate || todo.completed) return false
  return todo.dueDate < new Date().toISOString().split('T')[0]
}
```

### 3. 搜索功能

实时搜索待办内容：

```javascript
const filteredTodos = computed(() => {
  let result = todos.value
  
  // 搜索过滤
  if (searchQuery.value) {
    result = result.filter(todo => 
      todo.text.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
  
  // 状态筛选...
  return result
})
```

### 4. 数据导入导出

导出 JSON 数据：

```javascript
const exportData = computed(() => JSON.stringify(todos.value, null, 2))
```

导入 JSON 数据：

```javascript
const importTodos = () => {
  try {
    const data = JSON.parse(importData.value)
    todos.value = data
  } catch (e) {
    alert('导入失败：' + e.message)
  }
}
```

---

## 最佳实践

### ✅ 推荐做法

1. **始终使用 `:key`**：在使用 `v-for` 时务必提供唯一的 key
   ```html
   <li v-for="todo in todos" :key="todo.id">
   ```

2. **数据驱动视图**：不要直接操作 DOM，通过修改数据让 Vue 更新视图

3. **使用 computed 优化性能**：对于衍生数据使用计算属性，避免重复计算

4. **添加输入验证**：添加待办前检查内容是否为空

5. **使用 watch 的 deep 选项**：监听对象数组变化时设置 `{ deep: true }`

### ❌ 应避免的做法

1. **不要使用索引作为 key**：删除项目时会导致索引变化，可能引发 bug
   ```html
   <!-- 错误 -->
   <li v-for="(todo, index) in todos" :key="index">
   
   <!-- 正确 -->
   <li v-for="todo in todos" :key="todo.id">
   ```

2. **不要直接修改 props**：遵循单向数据流原则

3. **避免在 v-for 和 v-if 同时使用**：`v-if` 优先级更高，可以先计算属性过滤

---

## 练习题

### 基础练习

基于 JS 版本的 Todo List，完成以下功能：

1. 添加 "编辑" 功能：点击待办事项可以修改内容
2. 添加 "一键全选/取消全选" 功能
3. 限制最多添加 10 个待办事项

### 进阶练习

1. 实现拖拽排序功能，可以拖动调整待办事项顺序
2. 添加动画效果：添加/删除待办时显示过渡动画
3. 实现撤销功能，可以撤销最后一次删除操作

### 挑战练习

1. 将应用拆分为多个组件（TodoInput、TodoList、TodoItem、TodoStats）
2. 使用 Vue Router 实现多视图（今日待办、历史记录、设置）
3. 实现云端同步功能（模拟后端 API）

---

## 学习目标检查清单

- [ ] 能够设计 Todo List 的数据结构
- [ ] 掌握列表渲染和条件渲染的综合使用
- [ ] 理解计算属性在数据处理中的应用
- [ ] 掌握 localStorage 的读写操作
- [ ] 能够实现数据的筛选和搜索功能
- [ ] 理解 watch 监听器的使用场景
- [ ] 能够进行简单的代码重构和优化

---

## 练习题答案

详见 `practice-solution.html` 文件，包含完整的高级功能实现：
- 优先级设置和颜色标识
- 截止日期和过期提醒
- 实时搜索功能
- 多种排序方式
- 完成进度条
- 数据导入导出
- 更多统计信息

---

## 下一步

完成本章学习后，建议：
1. 回顾之前章节，巩固基础知识
2. 尝试将 Todo List 改造成真实项目（如项目管理工具、购物清单等）
3. 学习 Vue Router 实现多页面应用
4. 学习 Pinia 进行更复杂的状态管理
5. 开始你的第一个真实项目开发！

---

## 文件结构

```
26-chapter-26/
├── README.md                    # 本教程文档
├── src/
│   ├── js/
│   │   └── todolist-app.html    # JS 版本实现
│   └── ts/
│       └── todolist-app.html    # TS 版本实现
└── practice-solution.html       # 高级功能完整实现
```
