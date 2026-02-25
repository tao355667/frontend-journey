# 组件基础与 props

## 本章目的

学习如何在 Vue 3 中创建组件，以及如何使用 props 进行父子组件通信。

---

## 核心概念

### 创建组件

```vue
<!-- ChildComponent.vue -->
<script setup lang="ts">
// 定义 props
interface Props {
  title: string
  count?: number  // 可选
}

const props = withDefaults(defineProps<Props>(), {
  count: 0
})
</script>

<template>
  <div class="child">
    <h3>{{ title }}</h3>
    <p>计数: {{ count }}</p>
  </div>
</template>
```

### 使用组件

```vue
<!-- ParentComponent.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import ChildComponent from './ChildComponent.vue'

const parentCount = ref(5)
</script>

<template>
  <div>
    <h1>父组件</h1>
    <!-- 传递 props -->
    <ChildComponent title="Hello" :count="parentCount" />
    
    <!-- 静态字符串不需要 v-bind -->
    <ChildComponent title="静态标题" />
  </div>
</template>
```

### Props 校验

```vue
<script setup lang="ts">
const props = defineProps({
  // 基础类型检查
  propA: Number,
  
  // 多个类型
  propB: [String, Number],
  
  // 必填
  propC: {
    type: String,
    required: true
  },
  
  // 带默认值
  propD: {
    type: Number,
    default: 100
  },
  
  // 自定义校验
  propE: {
    type: String,
    validator(value) {
      return ['success', 'warning', 'danger'].includes(value)
    }
  }
})
</script>
```

### TypeScript 方式（推荐）

```vue
<script setup lang="ts">
interface Props {
  title: string
  count?: number
  tags?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  count: 0,
  tags: () => ['default']
})
</script>
```

---

## 最佳实践

1. **使用 TypeScript 定义 props**：更好的类型安全
2. **props 是只读的**：不要在子组件中修改 props
3. **使用 withDefaults 设置默认值**
4. **组件名使用 PascalCase**

---

## 练习题

1. 创建卡片组件（接收 title, content, imageUrl）
2. 创建列表组件（接收 items 数组）
3. 创建评分组件（接收 score，显示星级）

---

## 下一步

进入 [第 12 章：组件事件与 v-model](../12-chapter-12/README.md)
