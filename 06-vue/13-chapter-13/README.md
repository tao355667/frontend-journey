# 插槽 Slots

## 本章目的

掌握 Vue 插槽系统，实现组件内容分发。

---

## 核心概念

### 默认插槽

```vue
<!-- 子组件 Card.vue -->
<template>
  <div class="card">
    <h3>{{ title }}</h3>
    <div class="content">
      <slot>默认内容</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>
```

```vue
<!-- 父组件 -->
<template>
  <Card title="我的卡片">
    <p>这是卡片的内容</p>
  </Card>
  
  <Card title="空卡片">
    <!-- 使用默认内容 -->
  </Card>
</template>
```

### 具名插槽

```vue
<!-- Layout.vue -->
<template>
  <div class="layout">
    <header>
      <slot name="header">默认头部</slot>
    </header>
    <main>
      <slot>默认内容</slot>
    </main>
    <footer>
      <slot name="footer">默认底部</slot>
    </footer>
  </div>
</template>
```

```vue
<!-- 使用具名插槽 -->
<template>
  <Layout>
    <template #header>
      <h1>自定义头部</h1>
    </template>
    
    <p>主要内容</p>
    
    <template #footer>
      <p>自定义底部</p>
    </template>
  </Layout>
</template>
```

### 作用域插槽

```vue
<!-- List.vue -->
<template>
  <ul>
    <li v-for="item in items" :key="item.id">
      <slot :item="item" :index="index">
        {{ item.name }}
      </slot>
    </li>
  </ul>
</template>

<script setup lang="ts">
interface Item {
  id: number
  name: string
}

defineProps<{
  items: Item[]
}>()
</script>
```

```vue
<!-- 使用作用域插槽 -->
<template>
  <List :items="users" v-slot="{ item, index }">
    <span>{{ index + 1 }}. {{ item.name }}</span>
  </List>
</template>
```

---

## 练习题

1. 创建可复用的模态框组件（使用具名插槽）
2. 创建数据表格组件（使用作用域插槽）
3. 创建布局组件（header、sidebar、main、footer）

---

## 下一步

进入 [第 14 章：生命周期钩子](../14-chapter-14/README.md)
