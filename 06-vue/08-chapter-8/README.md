# 列表渲染 (v-for, key)

## 本章目的

掌握 Vue 的列表渲染指令，学会使用 v-for 渲染数组和对象，并理解 key 属性的重要性。

---

## 内容概述

- v-for 渲染数组
- v-for 渲染对象
- v-for 使用范围
- key 属性的作用与使用
- 数组变更检测
- 显示过滤/排序后的结果

---

## 核心概念讲解

### 什么是列表渲染？

列表渲染是指根据一个数据源（数组或对象）动态生成一组相似元素的过程。就像工厂的生产线，根据产品清单批量生产相同类型的产品。

#### 类比理解

想象你在组织一场宴会：
- **数据源**：嘉宾名单（数组）
- **v-for**：根据名单为每位嘉宾准备座位卡
- **key**：座位卡的唯一编号，确保不会混淆

### v-for 渲染数组

基础语法：`v-for="item in items"`

```html
<ul>
  <li v-for="todo in todos" :key="todo.id">
    {{ todo.text }}
  </li>
</ul>
```

#### 获取索引

```html
<!-- 使用 (item, index) 获取索引 -->
<li v-for="(todo, index) in todos" :key="todo.id">
  {{ index + 1 }}. {{ todo.text }}
</li>
```

### v-for 渲染对象

语法：`v-for="(value, key, index) in object"`

```html
<ul>
  <li v-for="(value, key, index) in user" :key="key">
    {{ index }}. {{ key }}: {{ value }}
  </li>
</ul>
```

```javascript
const user = {
  name: '张三',
  age: 25,
  email: 'zhangsan@example.com'
}
```

### v-for 使用范围

可以直接使用整数作为范围：

```html
<!-- 渲染 1 到 10 -->
<span v-for="n in 10" :key="n">{{ n }}</span>
```

### key 属性的重要性

`key` 是 Vue 识别节点的唯一标识，帮助 Vue 跟踪每个节点的身份。

#### 为什么需要 key？

```html
<!-- 没有 key：Vue 使用 "就地复用" 策略 -->
<li v-for="item in items">{{ item.name }}</li>

<!-- 有 key：Vue 能准确识别每个节点 -->
<li v-for="item in items" :key="item.id">{{ item.name }}</li>
```

**不使用 key 可能导致的问题：**
- 状态错乱（输入框内容不对应正确的列表项）
- 动画/过渡效果异常
- 性能下降

#### key 的最佳实践

1. **使用唯一标识**：数据库 ID、UUID 等
2. **避免使用索引**：除非列表顺序永不改变
3. **保持稳定性**：key 应该在列表项的整个生命周期保持不变

### 数组变更检测

Vue 能够监听以下数组方法：

**变更方法**（会改变原数组）：
- `push()` - 添加元素到末尾
- `pop()` - 移除末尾元素
- `shift()` - 移除开头元素
- `unshift()` - 添加元素到开头
- `splice()` - 删除/替换/添加元素
- `sort()` - 排序
- `reverse()` - 反转

**非变更方法**（返回新数组）：
- `filter()` - 过滤
- `concat()` - 合并
- `slice()` - 截取
- `map()` - 映射

对于非变更方法，需要将结果赋值回原数组：

```javascript
// 错误：直接调用不生效
this.items.filter(item => item.completed)

// 正确：赋值回数组
this.items = this.items.filter(item => item.completed)
```

### 显示过滤/排序后的结果

**方法 1：使用计算属性（推荐）**

```javascript
const filteredItems = computed(() => {
  return items.value.filter(item => item.price < 100)
})
```

**方法 2：使用方法**

```html
<li v-for="item in filterItems(items)" :key="item.id">
  {{ item.name }}
</li>
```

---

## 代码示例说明

### JavaScript 版本

文件：`src/js/list-rendering.html`

一个完整的待办事项列表示例，包含数组操作、对象遍历、过滤排序等功能。

### TypeScript 版本

文件：`src/ts/list-rendering.html`

功能与 JS 版本相同，添加了类型定义。

---

## JS 与 TS 对比

| 方面 | JavaScript | TypeScript |
|------|-----------|------------|
| **类型定义** | 无类型 | 定义 Item 接口 |
| **数组操作** | 灵活但易出错 | 有类型约束，更安全 |
| **代码提示** | 基础 | 完整的属性提示 |

### 示例对比

**JavaScript：**
```javascript
const items = ref([
  { id: 1, name: '苹果', price: 5 },
  { id: 2, name: '香蕉', price: 3 }
])

const addItem = (item) => {
  items.value.push(item) // 不知道 item 需要哪些属性
}
```

**TypeScript：**
```typescript
interface Item {
  id: number
  name: string
  price: number
  category?: string // 可选属性
}

const items = ref<Item[]>([
  { id: 1, name: '苹果', price: 5 },
  { id: 2, name: '香蕉', price: 3 }
])

const addItem = (item: Item) => {
  items.value.push(item) // 有完整类型检查
}
```

---

## 最佳实践

### ✅ 推荐做法

1. **始终使用 key**：除非列表是静态的且永不改变
2. **使用计算属性处理过滤/排序**：避免在 v-for 中使用复杂表达式
3. **避免在 v-for 和 v-if 同时使用**：优先使用计算属性过滤
4. **使用数组的变更方法**：Vue 能自动检测到这些变化
5. **定义清晰的 Item 类型**：在 TS 中为列表项定义接口

```html
<!-- 推荐：使用计算属性 -->
<li v-for="todo in completedTodos" :key="todo.id">
  {{ todo.text }}
</li>

<!-- 不推荐：在 v-for 中使用复杂表达式 -->
<li v-for="todo in todos.filter(t => t.completed)" :key="todo.id">
  {{ todo.text }}
</li>
```

### ❌ 应避免的做法

1. **不要使用 index 作为 key**：除非列表顺序永不改变且没有状态
2. **不要在 v-for 中修改数组长度**：可能导致索引错乱
3. **不要直接修改数组索引**：Vue 无法检测到 `items[0] = newValue`

---

## 练习题

### 基础练习

创建一个商品列表：
1. 使用 v-for 渲染商品数组（id, name, price, stock）
2. 显示商品序号（1, 2, 3...）
3. 当库存为 0 时显示 "缺货"
4. 使用正确的 key 属性

### 进阶练习

创建一个任务管理器：
1. 可以添加新任务（输入框 + 添加按钮）
2. 可以删除任务（每个任务有删除按钮）
3. 可以标记任务完成（复选框）
4. 使用计算属性显示：全部/进行中/已完成任务
5. 实现任务排序（按创建时间、按优先级）

### 挑战练习

创建一个嵌套商品分类浏览器：
1. 数据：分类数组，每个分类包含子分类和商品列表
2. 可以展开/折叠分类
3. 显示面包屑导航
4. 实现搜索过滤功能
5. 添加拖拽排序功能（改变商品顺序）

---

## 学习目标检查清单

- [ ] 掌握 v-for 渲染数组的基本用法
- [ ] 掌握 v-for 渲染对象的方法
- [ ] 理解 key 属性的作用和重要性
- [ ] 掌握数组变更检测原理
- [ ] 能够使用计算属性处理过滤和排序
- [ ] 理解 v-for 与 v-if 的优先级
- [ ] 掌握范围渲染（v-for="n in 10"）

---

## 练习题答案

详见 `practice-solution.html` 文件。

---

## 下一步

完成本章学习后，进入 [第 9 章：事件处理](../09-chapter-9/README.md)，学习如何处理用户交互事件。
