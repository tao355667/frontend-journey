# 第17章：过渡动画 (Transitions)

## 概念

Vue 提供了多种方式来实现过渡动画效果，让界面变化更加平滑自然。

### 为什么需要过渡动画？

- 提升用户体验
- 让用户感知界面变化
- 引导用户注意力
- 使应用感觉更流畅、更专业

### Vue 过渡系统包含

1. **单元素/组件过渡** - `<Transition>`
2. **多元素过渡** - 列表过渡
3. **列表排序过渡** - `<TransitionGroup>`
4. **状态动画** - 使用第三方库

---

## 1. 基础过渡 `<Transition>`

### 基本用法

```vue
<template>
  <button @click="show = !show">切换</button>
  
  <Transition>
    <div v-if="show" class="box">内容</div>
  </Transition>
</template>

<script setup>
import { ref } from 'vue'
const show = ref(true)
</script>

<style>
/* 进入和离开动画 */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
```

### 过渡类名详解

当元素插入或移除时，Vue 会自动添加/移除以下类名：

```
进入：v-enter-from → v-enter-active → v-enter-to
离开：v-leave-from → v-leave-active → v-leave-to
```

| 类名 | 说明 |
|------|------|
| `v-enter-from` | 进入动画开始状态 |
| `v-enter-active` | 进入动画进行中的状态（定义持续时间、缓动函数）|
| `v-enter-to` | 进入动画结束状态 |
| `v-leave-from` | 离开动画开始状态 |
| `v-leave-active` | 离开动画进行中的状态 |
| `v-leave-to` | 离开动画结束状态 |

### 命名过渡

使用 `name` 属性自定义类名前缀：

```vue
<Transition name="fade">
  <div v-if="show">内容</div>
</Transition>
```

```css
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
```

### JavaScript 钩子

```vue
<Transition
  @before-enter="onBeforeEnter"
  @enter="onEnter"
  @after-enter="onAfterEnter"
  @enter-cancelled="onEnterCancelled"
  @before-leave="onBeforeLeave"
  @leave="onLeave"
  @after-leave="onAfterLeave"
  @leave-cancelled="onLeaveCancelled"
>
  <div v-if="show">内容</div>
</Transition>
```

---

## 2. 过渡模式

### 问题：新旧元素同时存在

```vue
<Transition>
  <button v-if="isEditing" key="save">保存</button>
  <button v-else key="edit">编辑</button>
</Transition>
```

默认情况下，新旧元素会同时存在一段时间。

### 解决方案：mode 属性

```vue
<!-- 新元素先进入，旧元素再离开 -->
<Transition mode="out-in">
  <component :is="activeComponent" />
</Transition>

<!-- 旧元素先离开，新元素再进入 -->
<Transition mode="in-out">
  <component :is="activeComponent" />
</Transition>
```

---

## 3. 列表过渡 `<TransitionGroup>`

### 基本用法

```vue
<template>
  <TransitionGroup name="list" tag="ul">
    <li v-for="item in items" :key="item.id">
      {{ item.text }}
    </li>
  </TransitionGroup>
</template>
```

```css
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* 确保离开的元素被移除时，其他元素能平滑移动 */
.list-leave-active {
  position: absolute;
}
```

### 列表排序动画

```vue
<TransitionGroup name="flip" tag="ul">
  <li v-for="item in sortedItems" :key="item.id">
    {{ item.name }}
  </li>
</TransitionGroup>
```

```css
.flip-move {
  transition: transform 0.5s;
}
```

---

## 4. 复杂动画示例

### 淡入 + 滑动

```vue
<template>
  <Transition name="slide-fade">
    <div v-if="show" class="modal">
      <h3>模态框</h3>
      <p>带淡入和滑动效果</p>
    </div>
  </Transition>
</template>

<style>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-in;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
```

### 缩放动画

```vue
<template>
  <Transition name="zoom">
    <div v-if="show" class="image">图片</div>
  </Transition>
</template>

<style>
.zoom-enter-active {
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.zoom-leave-active {
  transition: transform 0.3s ease-in;
}

.zoom-enter-from,
.zoom-leave-to {
  transform: scale(0);
}
</style>
```

### 高度动画（手风琴效果）

```vue
<template>
  <Transition name="expand">
    <div v-show="expanded" class="content">
      <p>可展开的内容</p>
      <p>多行内容</p>
    </div>
  </Transition>
</template>

<style>
.expand-enter-active,
.expand-leave-active {
  transition: height 0.3s ease;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  height: 0;
}
</style>
```

---

## 5. 完整代码示例

### 文件 1: FadeTransition.vue

```vue
<template>
  <div>
    <button @click="show = !show">{{ show ? '隐藏' : '显示' }}</button>
    
    <Transition name="fade">
      <div v-if="show" class="content">
        <h3>淡入淡出效果</h3>
        <p>这是一个简单的透明度过渡动画</p>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const show = ref(true)
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.content {
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
  margin-top: 15px;
}
</style>
```

### 文件 2: TodoList.vue（列表过渡）

```vue
<template>
  <div>
    <div class="input-group">
      <input v-model="newTodo" @keyup.enter="addTodo" placeholder="输入待办事项" />
      <button @click="addTodo">添加</button>
    </div>
    
    <TransitionGroup name="todo" tag="ul" class="todo-list">
      <li v-for="(todo, index) in todos" :key="todo.id" class="todo-item">
        <span :class="{ done: todo.done }" @click="toggleTodo(todo)">
          {{ todo.text }}
        </span>
        <button @click="removeTodo(index)" class="delete-btn">删除</button>
      </li>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const newTodo = ref('')
const todos = ref([
  { id: 1, text: '学习 Vue 过渡', done: false },
  { id: 2, text: '完成练习', done: false }
])
let nextId = 3

const addTodo = () => {
  if (newTodo.value.trim()) {
    todos.value.push({
      id: nextId++,
      text: newTodo.value,
      done: false
    })
    newTodo.value = ''
  }
}

const removeTodo = (index) => {
  todos.value.splice(index, 1)
}

const toggleTodo = (todo) => {
  todo.done = !todo.done
}
</script>

<style scoped>
.input-group {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.todo-list {
  list-style: none;
  padding: 0;
  position: relative;
}

.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: white;
  border: 1px solid #eee;
  border-radius: 4px;
  margin-bottom: 8px;
}

.todo-item span {
  cursor: pointer;
  flex: 1;
}

.todo-item span.done {
  text-decoration: line-through;
  color: #999;
}

.delete-btn {
  background: #ff5252;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

/* 列表过渡动画 */
.todo-enter-active,
.todo-leave-active {
  transition: all 0.3s ease;
}

.todo-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.todo-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* 确保离开的元素不占据空间 */
.todo-leave-active {
  position: absolute;
  width: 100%;
}

/* 列表排序动画 */
.todo-move {
  transition: transform 0.3s;
}
</style>
```

---

## 关键点总结

### 何时使用 `<Transition>` vs `<TransitionGroup>`

| 场景 | 使用组件 |
|------|----------|
| 单个元素显示/隐藏 | `<Transition>` |
| 两个元素切换（如 tab） | `<Transition mode="out-in">` |
| 列表添加/删除元素 | `<TransitionGroup>` |
| 列表排序变化 | `<TransitionGroup>` |

### 最佳实践

1. **始终提供 `key`**：多元素切换时必须有 key
2. **使用 `mode="out-in"`**：避免两个元素同时显示
3. **添加 `position: absolute`**：列表元素离开时，防止布局抖动
4. **使用 `transform` 而非 `top/left`**：性能更好

---

## 练习题

### 练习 1：模态框过渡

创建一个带过渡效果的模态框组件：
- 淡入 + 从上方滑入
- 点击遮罩层关闭
- 关闭时反向动画

### 练习 2：图片画廊过渡

创建图片切换组件：
- 使用 `mode="out-in"`
- 新图片从右滑入，旧图片向左滑出
- 添加缩放效果

### 练习 3：可折叠面板

创建手风琴式面板：
- 点击标题展开/收起内容
- 平滑的高度过渡动画
- 支持多个面板同时展开

---

## 常见错误

```vue
<!-- ❌ 错误：没有 key，Vue 无法识别不同元素 -->
<Transition>
  <div v-if="show">A</div>
  <div v-else>B</div>
</Transition>

<!-- ✅ 正确 -->
<Transition>
  <div v-if="show" key="a">A</div>
  <div v-else key="b">B</div>
</Transition>
```

```vue
<!-- ❌ 错误：在 TransitionGroup 中使用 v-show -->
<TransitionGroup>
  <div v-show="show" v-for="item in items" :key="item.id">
</TransitionGroup>

<!-- ✅ 正确：使用 v-if 或从数据中移除 -->
<TransitionGroup>
  <div v-for="item in visibleItems" :key="item.id">
</TransitionGroup>
```

```css
/* ❌ 错误：在 .v-enter-active 中定义 opacity: 0 */
.v-enter-active {
  opacity: 0;  /* 这会导致元素始终不可见 */
  transition: opacity 0.5s;
}

/* ✅ 正确 */
.v-enter-from {
  opacity: 0;  /* 初始状态 */
}
.v-enter-active {
  transition: opacity 0.5s;
}
```
