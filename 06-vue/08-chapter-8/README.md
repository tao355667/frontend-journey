# 列表渲染

## 本章目的

掌握 Vue 的列表渲染指令 `v-for` 的使用方法，理解 key 的重要性。

---

## 核心概念

### v-for 基本用法

```vue
<script setup lang="ts">
import { ref } from 'vue'

const items = ref(['苹果', '香蕉', '橙子'])
const users = ref([
  { id: 1, name: '张三', age: 25 },
  { id: 2, name: '李四', age: 30 }
])

const user = { name: '王五', age: 28, city: '北京' }
</script>

<template>
  <div>
    <!-- 遍历数组 -->
    <ul>
      <li v-for="(item, index) in items" :key="index">
        {{ index + 1 }}. {{ item }}
      </li>
    </ul>

    <!-- 遍历对象数组（使用 id 作为 key） -->
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.name }} - {{ user.age }}岁
      </li>
    </ul>

    <!-- 遍历对象 -->
    <ul>
      <li v-for="(value, key) in user" :key="key">
        {{ key }}: {{ value }}
      </li>
    </ul>

    <!-- 范围渲染 -->
    <span v-for="n in 5" :key="n">{{ n }}</span>
  </div>
</template>
```

### key 的重要性

```vue
<template>
  <!-- ✅ 使用唯一 id 作为 key -->
  <li v-for="item in list" :key="item.id">{{ item.name }}</li>
  
  <!-- ⚠️ 避免使用 index 作为 key（除非列表不会变化） -->
  <li v-for="(item, index) in list" :key="index">{{ item.name }}</li>
</template>
```

**为什么需要 key？**
- 帮助 Vue 识别哪些元素改变了
- 优化 DOM 更新性能
- 保持组件状态

---

## 练习题

1. 创建商品列表（支持添加/删除）
2. 创建待办事项列表（使用 v-for 渲染）
3. 实现列表排序功能

---

## 下一步

进入 [第 9 章：事件处理与表单绑定](../09-chapter-9/README.md)
