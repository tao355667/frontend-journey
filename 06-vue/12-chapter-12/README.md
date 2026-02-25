# 组件事件与 v-model

## 本章目的

学习如何使用 emits 进行子父组件通信，以及 v-model 双向绑定。

---

## 核心概念

### 定义 emits

```vue
<script setup lang="ts">
// 定义 emits
const emit = defineEmits<{
  update: [value: string]  // 事件名和参数类型
  delete: [id: number]
}>()

const handleUpdate = () => {
  emit('update', '新值')
}

const handleDelete = () => {
  emit('delete', 123)
}
</script>

<template>
  <button @click="handleUpdate">更新</button>
  <button @click="handleDelete">删除</button>
</template>
```

### 在父组件中监听

```vue
<script setup lang="ts">
import { ref } from 'vue'
import ChildComponent from './ChildComponent.vue'

const message = ref('')

const handleUpdate = (value: string) => {
  message.value = value
}

const handleDelete = (id: number) => {
  console.log('删除:', id)
}
</script>

<template>
  <ChildComponent 
    @update="handleUpdate"
    @delete="handleDelete"
  />
  <p>{{ message }}</p>
</template>
```

### v-model 双向绑定

#### Vue 3.4+ 方式（推荐）

```vue
<!-- 子组件 -->
<script setup lang="ts">
const model = defineModel<string>()

const updateValue = () => {
  model.value = '新值'
}
</script>

<template>
  <input v-model="model">
</template>
```

```vue
<!-- 父组件 -->
<script setup lang="ts">
import { ref } from 'vue'
import ChildInput from './ChildInput.vue'

const message = ref('Hello')
</script>

<template>
  <ChildInput v-model="message" />
  <p>父组件: {{ message }}</p>
</template>
```

#### 传统方式（兼容旧版本）

```vue
<!-- 子组件 -->
<script setup lang="ts">
const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const updateValue = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <input :value="modelValue" @input="updateValue">
</template>
```

---

## 练习题

1. 创建计数器组件（使用 v-model 双向绑定）
2. 创建搜索组件（输入时触发搜索事件）
3. 创建表单组件（多个字段的 v-model）

---

## 下一步

进入 [第 13 章：插槽 Slots](../13-chapter-13/README.md)
