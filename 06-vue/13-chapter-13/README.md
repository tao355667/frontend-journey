# 第13章：插槽 (Slots)

## 概念

插槽 (Slots) 是 Vue 组件的一个重要特性，它允许你在封装组件时，将组件使用者提供的内容（如 HTML 结构）插入到组件的指定位置。这让组件变得更加灵活和可复用。

### 为什么需要插槽？

想象你有一个卡片组件，每张卡片的内容都不同：

```vue
<!-- 没有插槽 -->
<Card title="新闻">
  <!-- 无法自定义内容！ -->
</Card>

<!-- 使用插槽 -->
<Card title="新闻">
  <p>今天是个好天气...</p>  <!-- 可以自定义内容！ -->
</Card>
```

### 三种插槽类型

1. **默认插槽** - 最常用的基础插槽
2. **具名插槽** - 有名字的多个插槽
3. **作用域插槽** - 子组件向父组件传递数据的插槽

---

## 1. 默认插槽

### 基本用法

```vue
<!-- Card.vue - 子组件 -->
<template>
  <div class="card">
    <h3>{{ title }}</h3>
    <!-- 这里是插槽出口 -->
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  title: String
})
</script>
```

```vue
<!-- App.vue - 父组件 -->
<template>
  <!-- 传入内容到插槽 -->
  <Card title="欢迎使用">
    <p>这是插入到插槽中的内容！</p>
    <button>点击我</button>
  </Card>
</template>
```

### 后备内容（默认值）

当父组件没有提供内容时，显示默认内容：

```vue
<template>
  <div class="card">
    <slot>
      <!-- 这是后备内容 -->
      <p>暂无内容</p>
    </slot>
  </div>
</template>
```

### 具名插槽语法糖

```vue
<template>
  <Card>
    <template #default>
      <p>使用 # 语法糖</p>
    </template>
  </Card>
</template>
```

---

## 2. 具名插槽

当需要多个插槽时使用具名插槽：

```vue
<!-- Layout.vue - 布局组件 -->
<template>
  <div class="layout">
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <slot></slot>  <!-- 默认插槽 -->
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>
```

```vue
<!-- App.vue - 使用具名插槽 -->
<template>
  <Layout>
    <!-- 具名插槽: header -->
    <template v-slot:header>
      <h1>网站标题</h1>
    </template>
    
    <!-- 默认插槽 -->
    <p>主要内容区域</p>
    
    <!-- 具名插槽: footer (使用 # 语法糖) -->
    <template #footer>
      <p>版权所有 © 2024</p>
    </template>
  </Layout>
</template>
```

### 动态插槽名

```vue
<template>
  <BaseLayout>
    <template v-slot:[dynamicSlotName]>
      ...
    </template>
  </BaseLayout>
</template>
```

---

## 3. 作用域插槽

子组件可以将数据传递给父组件的插槽内容：

```vue
<!-- TodoList.vue - 子组件传递数据 -->
<template>
  <ul>
    <li v-for="item in items" :key="item.id">
      <!-- 将 item 传递给父组件 -->
      <slot :item="item" :index="index">
        {{ item.text }}
      </slot>
    </li>
  </ul>
</template>

<script setup>
const items = [
  { id: 1, text: '学习 Vue' },
  { id: 2, text: '练习插槽' },
  { id: 3, text: '完成项目' }
]
</script>
```

```vue
<!-- App.vue - 父组件接收数据 -->
<template>
  <TodoList v-slot="slotProps">
    <!-- 可以访问子组件传递的数据 -->
    <span>{{ slotProps.index + 1 }}. {{ slotProps.item.text }}</span>
  </TodoList>
  
  <!-- 解构写法 -->
  <TodoList v-slot="{ item, index }">
    <span>{{ index + 1 }}. {{ item.text }}</span>
  </TodoList>
  
  <!-- 更简洁的 # 语法 -->
  <TodoList>
    <template #default="{ item, index }">
      <span>{{ index + 1 }}. {{ item.text }}</span>
    </template>
  </TodoList>
</template>
```

### 具名作用域插槽

```vue
<!-- 子组件 -->
<template>
  <div>
    <slot name="header" :message="headerMsg"></slot>
    <slot :data="mainData"></slot>
  </div>
</template>

<script setup>
const headerMsg = '欢迎消息'
const mainData = { count: 10 }
</script>
```

```vue
<!-- 父组件 -->
<template>
  <ChildComponent>
    <template #header="{ message }">
      <h1>{{ message }}</h1>
    </template>
    <template #default="{ data }">
      <p>数量: {{ data.count }}</p>
    </template>
  </ChildComponent>
</template>
```

---

## 完整代码示例

### 文件 1: Card.vue（基础插槽）

```vue
<template>
  <div class="card">
    <div class="card-header">
      <slot name="header">
        <h3>默认标题</h3>
      </slot>
    </div>
    <div class="card-body">
      <slot>
        <p>暂无内容</p>
      </slot>
    </div>
    <div class="card-footer">
      <slot name="footer">
        <small>默认页脚</small>
      </slot>
    </div>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin: 10px 0;
}
.card-header {
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}
.card-footer {
  border-top: 1px solid #eee;
  padding-top: 10px;
  margin-top: 10px;
  color: #666;
}
</style>
```

### 文件 2: List.vue（作用域插槽）

```vue
<template>
  <ul class="list">
    <li v-for="(item, index) in items" :key="item.id" class="list-item">
      <slot :item="item" :index="index">
        {{ item.name }}
      </slot>
    </li>
  </ul>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
.list {
  list-style: none;
  padding: 0;
}
.list-item {
  padding: 10px;
  border-bottom: 1px solid #eee;
}
</style>
```

### 文件 3: App.vue（使用示例）

```vue
<template>
  <div id="app">
    <h2>1. 基础插槽</h2>
    
    <!-- 使用默认内容 -->
    <Card />
    
    <!-- 自定义所有内容 -->
    <Card>
      <template #header>
        <h3 style="color: #42b883;">Vue 插槽教程</h3>
      </template>
      <p>插槽让组件更加灵活和可复用！</p>
      <template #footer>
        <button @click="showAlert">点击我</button>
      </template>
    </Card>
    
    <h2>2. 作用域插槽</h2>
    
    <List :items="users">
      <template #default="{ item, index }">
        <div class="user-item">
          <span class="index">{{ index + 1 }}.</span>
          <span class="name">{{ item.name }}</span>
          <span class="role" :class="item.role">{{ item.role }}</span>
        </div>
      </template>
    </List>
  </div>
</template>

<script setup>
import Card from './Card.vue'
import List from './List.vue'

const users = [
  { id: 1, name: '张三', role: 'admin' },
  { id: 2, name: '李四', role: 'user' },
  { id: 3, name: '王五', role: 'user' }
]

const showAlert = () => {
  alert('插槽太棒了！')
}
</script>

<style>
.user-item {
  display: flex;
  align-items: center;
  gap: 10px;
}
.index {
  color: #999;
}
.role {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
}
.role.admin {
  background: #42b883;
  color: white;
}
.role.user {
  background: #eee;
  color: #666;
}
</style>
```

---

## 关键点总结

| 特性 | 语法 | 用途 |
|------|------|------|
| 默认插槽 | `<slot></slot>` | 组件的主要内容区域 |
| 具名插槽 | `<slot name="xxx">` / `v-slot:xxx` | 组件有多个内容区域 |
| 作用域插槽 | `<slot :data="xxx">` / `v-slot="props"` | 子组件向父组件传递数据 |
| 语法糖 | `#xxx` | 简写 `v-slot:xxx` |
| 后备内容 | `<slot>默认内容</slot>` | 父组件未提供内容时的默认值 |

---

## 练习题

### 练习 1：基础插槽

创建一个 `Modal.vue` 组件，包含：
1. 标题插槽（具名）
2. 内容插槽（默认）
3. 底部操作区插槽（具名，默认显示"关闭"按钮）

### 练习 2：作用域插槽

创建一个 `Table.vue` 组件，接收 `columns` 和 `data` 属性：
- 使用作用域插槽让用户自定义每列的渲染方式
- 暴露 `row`、`column`、`value` 给父组件

### 练习 3：综合应用

创建一个 `CommentList.vue` 组件：
- 使用作用域插槽暴露 `comment` 数据
- 包含默认的评论显示样式
- 允许父组件完全自定义评论的显示方式

---

## 常见错误

```vue
<!-- 错误：在 slot 标签上使用 v-for -->
<slot v-for="item in items" :key="item.id" :item="item"></slot>

<!-- 正确：在包裹元素上使用 v-for -->
<template v-for="item in items" :key="item.id">
  <slot :item="item"></slot>
</template>
```

```vue
<!-- 错误：v-slot 只能用在 template 或组件上 -->
<div v-slot:header>...</div>

<!-- 正确 -->
<template v-slot:header>...</template>
<ChildComponent v-slot>...</ChildComponent>
```
