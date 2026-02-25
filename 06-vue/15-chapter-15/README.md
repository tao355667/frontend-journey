# 高级特性

## 本章目的

学习 Vue 3 的高级特性：Teleport、Suspense 和组合式函数。

---

## 1. Teleport

将组件渲染到 DOM 的其他位置。

```vue
<script setup lang="ts">
import { ref } from 'vue'

const showModal = ref(false)
</script>

<template>
  <div>
    <button @click="showModal = true">打开模态框</button>
    
    <!-- 将模态框渲染到 body 下 -->
    <Teleport to="body">
      <div v-if="showModal" class="modal">
        <div class="modal-content">
          <h2>模态框标题</h2>
          <p>这是模态框内容</p>
          <button @click="showModal = false">关闭</button>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
}
</style>
```

---

## 2. Suspense

处理异步组件的加载状态。

```vue
<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'

// 异步加载组件
const AsyncUserList = defineAsyncComponent(() =>
  import('./UserList.vue')
)

const error = ref(null)
</script>

<template>
  <Suspense>
    <!-- 默认内容 -->
    <template #default>
      <AsyncUserList />
    </template>
    
    <!-- 加载中状态 -->
    <template #fallback>
      <div>加载中...</div>
    </template>
  </Suspense>
  
  <div v-if="error">出错了: {{ error }}</div>
</template>
```

---

## 3. 组合式函数（Composables）

将可复用逻辑提取为函数。

### 示例：useMouse

```typescript
// composables/useMouse.ts
import { ref, onMounted, onUnmounted } from 'vue'

export function useMouse() {
  const x = ref(0)
  const y = ref(0)

  const update = (event: MouseEvent) => {
    x.value = event.pageX
    y.value = event.pageY
  }

  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  return { x, y }
}
```

```vue
<!-- 使用组合式函数 -->
<script setup lang="ts">
import { useMouse } from './composables/useMouse'

const { x, y } = useMouse()
</script>

<template>
  <p>鼠标位置: {{ x }}, {{ y }}</p>
</template>
```

### 示例：useLocalStorage

```typescript
// composables/useLocalStorage.ts
import { ref, watch } from 'vue'

export function useLocalStorage<T>(key: string, defaultValue: T) {
  const stored = localStorage.getItem(key)
  const data = ref<T>(stored ? JSON.parse(stored) : defaultValue)

  watch(data, (newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue))
  }, { deep: true })

  return data
}
```

```vue
<script setup lang="ts">
import { useLocalStorage } from './composables/useLocalStorage'

const todos = useLocalStorage('todos', [])
</script>
```

---

## 练习题

1. 使用 Teleport 创建 Toast 通知组件
2. 使用 Suspense 加载异步数据
3. 创建 useFetch 组合式函数
4. 创建 useDarkMode 组合式函数

---

## 下一步

进入 [第 16 章：综合项目](../16-chapter-16/README.md)
