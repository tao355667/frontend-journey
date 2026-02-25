# 生命周期钩子

## 本章目的

理解 Vue 组件的生命周期，掌握在合适的时机执行代码。

---

## 核心概念

### 常用生命周期钩子

```vue
<script setup lang="ts">
import { 
  onBeforeMount, 
  onMounted, 
  onBeforeUpdate, 
  onUpdated,
  onBeforeUnmount,
  onUnmounted 
} from 'vue'

// 挂载前
onBeforeMount(() => {
  console.log('组件即将挂载')
})

// 挂载完成
onMounted(() => {
  console.log('组件已挂载')
  // 可以访问 DOM，发起 API 请求
})

// 更新前
onBeforeUpdate(() => {
  console.log('组件即将更新')
})

// 更新完成
onUpdated(() => {
  console.log('组件已更新')
})

// 卸载前
onBeforeUnmount(() => {
  console.log('组件即将卸载')
  // 清理工作：移除事件监听、取消定时器等
})

// 卸载完成
onUnmounted(() => {
  console.log('组件已卸载')
})
</script>
```

### 实际应用场景

```vue
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const data = ref(null)
const loading = ref(false)
const timer = ref<number | null>(null)

// 获取数据
const fetchData = async () => {
  loading.value = true
  try {
    const response = await fetch('/api/data')
    data.value = await response.json()
  } finally {
    loading.value = false
  }
}

// 组件挂载时获取数据
onMounted(() => {
  fetchData()
  
  // 设置定时器
  timer.value = window.setInterval(() => {
    console.log('定时任务')
  }, 1000)
  
  // 添加事件监听
  window.addEventListener('resize', handleResize)
})

// 组件卸载时清理
onUnmounted(() => {
  // 清除定时器
  if (timer.value) {
    clearInterval(timer.value)
  }
  
  // 移除事件监听
  window.removeEventListener('resize', handleResize)
})

const handleResize = () => {
  console.log('窗口大小改变')
}
</script>
```

### 生命周期流程图

```
创建 → onBeforeMount → onMounted → 
更新 → onBeforeUpdate → onUpdated → 
卸载 → onBeforeUnmount → onUnmounted
```

---

## 最佳实践

1. **onMounted**：发起 API 请求、操作 DOM、添加事件监听
2. **onUnmounted**：清理副作用（定时器、事件监听等）
3. **避免在 onUpdated 中修改状态**：可能导致无限循环

---

## 练习题

1. 创建自动刷新组件（定时获取数据）
2. 创建监听窗口大小的响应式组件
3. 实现组件进入/离开动画

---

## 下一步

进入 [第 15 章：高级特性](../15-chapter-15/README.md)
