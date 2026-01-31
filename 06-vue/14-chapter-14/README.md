# 第14章：生命周期钩子 (Lifecycle Hooks)

## 概念

生命周期钩子是 Vue 组件从创建到销毁过程中的一系列回调函数。它们让你在特定时刻执行自定义逻辑。

### 为什么需要生命周期钩子？

组件就像一个有生命的物体：
- **创建时**：需要初始化数据、发送请求
- **挂载后**：需要操作 DOM、启动定时器
- **更新时**：需要响应数据变化
- **卸载前**：需要清理资源、取消订阅

```
组件生命周期流程：
创建 → 挂载 → 更新 → 卸载
 ↓       ↓      ↓      ↓
setup  mounted updated beforeUnmount
```

### Vue 3 生命周期钩子

Vue 3 组合式 API 中的生命周期钩子：

| 钩子 | 说明 | 用途 |
|------|------|------|
| `onBeforeMount` | 挂载前 | 最后的配置 |
| `onMounted` | 挂载完成 | DOM操作、请求数据 |
| `onBeforeUpdate` | 更新前 | 获取更新前状态 |
| `onUpdated` | 更新后 | DOM已更新 |
| `onBeforeUnmount` | 卸载前 | 清理工作 |
| `onUnmounted` | 卸载完成 | 最终清理 |
| `onErrorCaptured` | 错误捕获 | 处理子组件错误 |
| `onActivated` | 激活时 | 配合 keep-alive |
| `onDeactivated` | 停用时 | 配合 keep-alive |

---

## 1. 挂载阶段

### onMounted - 最常用的钩子

组件挂载到 DOM 后调用，可以安全地操作 DOM：

```vue
<script setup>
import { ref, onMounted } from 'vue'

const inputRef = ref(null)
const data = ref([])

// 组件挂载后执行
onMounted(() => {
  // 操作 DOM
  inputRef.value?.focus()
  
  // 发送请求
  fetchData()
  
  // 启动定时器
  const timer = setInterval(() => {
    console.log('定时执行')
  }, 1000)
  
  // 记得在 onUnmounted 中清理
})

async function fetchData() {
  const res = await fetch('/api/data')
  data.value = await res.json()
}
</script>

<template>
  <input ref="inputRef" />
  <ul>
    <li v-for="item in data" :key="item.id">{{ item.name }}</li>
  </ul>
</template>
```

### onBeforeMount

组件挂载前调用，此时模板已编译但还未渲染：

```vue
<script setup>
import { onBeforeMount } from 'vue'

onBeforeMount(() => {
  console.log('即将挂载到 DOM')
  // 此时还不能访问 DOM 元素
})
</script>
```

---

## 2. 更新阶段

### onUpdated

组件更新后调用（响应式数据变化导致重新渲染）：

```vue
<script setup>
import { ref, onUpdated, nextTick } from 'vue'

const count = ref(0)
const listRef = ref(null)

onUpdated(() => {
  // DOM 已更新
  console.log('DOM 已更新，列表长度：', listRef.value?.children.length)
  
  // 如果需要等待 DOM 完全更新
  nextTick(() => {
    console.log('DOM 完全更新')
  })
})
</script>

<template>
  <button @click="count++">增加 {{ count }}</button>
  <ul ref="listRef">
    <li v-for="i in count" :key="i">项目 {{ i }}</li>
  </ul>
</template>
```

### onBeforeUpdate

组件更新前调用，可以获取更新前的状态：

```vue
<script setup>
import { ref, onBeforeUpdate } from 'vue'

const previousCount = ref(0)
const count = ref(0)

onBeforeUpdate(() => {
  // 保存更新前的值
  previousCount.value = count.value
})
</script>
```

---

## 3. 卸载阶段

### onUnmounted - 清理工作

组件卸载后调用，必须在此清理副作用：

```vue
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const timer = ref(null)
const eventHandler = ref(null)

onMounted(() => {
  // 创建副作用
  timer.value = setInterval(() => {
    console.log('定时器执行')
  }, 1000)
  
  // 添加事件监听
  eventHandler.value = () => console.log('窗口大小改变')
  window.addEventListener('resize', eventHandler.value)
})

onUnmounted(() => {
  // 清理定时器
  clearInterval(timer.value)
  
  // 移除事件监听
  window.removeEventListener('resize', eventHandler.value)
  
  console.log('组件已卸载，清理完成')
})
</script>
```

### onBeforeUnmount

组件卸载前调用，用于最后的准备工作：

```vue
<script setup>
import { onBeforeUnmount } from 'vue'

onBeforeUnmount(() => {
  console.log('组件即将卸载')
  // 可以在这里保存一些状态
})
</script>
```

---

## 4. 错误处理

### onErrorCaptured

捕获子孙组件的错误：

```vue
<script setup>
import { ref, onErrorCaptured } from 'vue'

const error = ref(null)

onErrorCaptured((err, instance, info) => {
  // err: 错误对象
  // instance: 出错的组件实例
  // info: 错误信息
  
  error.value = {
    message: err.message,
    component: instance,
    info: info
  }
  
  console.error('捕获到错误：', err)
  
  // 返回 false 阻止错误继续传播
  return false
})
</script>

<template>
  <div v-if="error" class="error">
    <h3>出错了！</h3>
    <p>{{ error.message }}</p>
  </div>
  <div v-else>
    <!-- 子组件 -->
    <ChildComponent />
  </div>
</template>
```

---

## 5. 完整示例

### 组件生命周期演示

```vue
<!-- LifecycleDemo.vue -->
<script setup>
import { 
  ref, 
  onBeforeMount, 
  onMounted, 
  onBeforeUpdate, 
  onUpdated, 
  onBeforeUnmount, 
  onUnmounted 
} from 'vue'

const logs = ref([])
const count = ref(0)

function addLog(message) {
  const time = new Date().toLocaleTimeString()
  logs.value.unshift(`${time} - ${message}`)
}

// 创建阶段
addLog('setup 执行（组件创建）')

// 挂载阶段
onBeforeMount(() => {
  addLog('onBeforeMount: 即将挂载到 DOM')
})

onMounted(() => {
  addLog('onMounted: 已挂载到 DOM')
})

// 更新阶段
onBeforeUpdate(() => {
  addLog('onBeforeUpdate: 即将更新 DOM')
})

onUpdated(() => {
  addLog('onUpdated: DOM 已更新')
})

// 卸载阶段
onBeforeUnmount(() => {
  addLog('onBeforeUnmount: 即将卸载')
})

onUnmounted(() => {
  console.log('onUnmounted: 组件已卸载')
})
</script>

<template>
  <div class="lifecycle-demo">
    <h3>生命周期演示</h3>
    <button @click="count++">点击更新 ({{ count }})</button>
    <div class="logs">
      <h4>执行日志：</h4>
      <ul>
        <li v-for="(log, index) in logs" :key="index">{{ log }}</li>
      </ul>
    </div>
  </div>
</template>
```

### 实用的计数器组件

```vue
<!-- AutoCounter.vue -->
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const count = ref(0)
let timer = null

onMounted(() => {
  // 组件挂载后启动计数器
  timer = setInterval(() => {
    count.value++
  }, 1000)
})

onUnmounted(() => {
  // 组件卸载前清理定时器
  clearInterval(timer)
})
</script>

<template>
  <div class="counter">
    <span>自动计数: {{ count }}</span>
  </div>
</template>
```

### 数据获取组件

```vue
<!-- UserProfile.vue -->
<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  userId: {
    type: Number,
    required: true
  }
})

const user = ref(null)
const loading = ref(false)
const error = ref(null)

async function fetchUser() {
  loading.value = true
  error.value = null
  
  try {
    const response = await fetch(`/api/users/${props.userId}`)
    if (!response.ok) throw new Error('获取用户失败')
    user.value = await response.json()
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

// 组件挂载时获取数据
onMounted(() => {
  fetchUser()
})
</script>

<template>
  <div>
    <div v-if="loading">加载中...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="user">
      <h3>{{ user.name }}</h3>
      <p>{{ user.email }}</p>
    </div>
  </div>
</template>
```

---

## 关键点总结

### 生命周期流程图

```
setup()              ← 初始化响应式数据、方法
    ↓
onBeforeMount()      ← 挂载前，访问不到 DOM
    ↓
DOM 挂载
    ↓
onMounted()          ← ★ 最常用：操作 DOM、发送请求
    ↓
数据变化
    ↓
onBeforeUpdate()     ← 更新前
    ↓
DOM 更新
    ↓
onUpdated()          ← 更新后
    ↓
组件卸载
    ↓
onBeforeUnmount()    ← 卸载前
    ↓
DOM 移除
    ↓
onUnmounted()        ← ★ 必须清理副作用
```

### 最佳实践

1. **onMounted 中**：
   - 发送 API 请求
   - 操作 DOM（如聚焦输入框）
   - 添加事件监听器

2. **onUnmounted 中**：
   - 清除所有定时器（setInterval/setTimeout）
   - 移除事件监听器
   - 取消未完成的请求（AbortController）
   - 关闭 WebSocket 连接

3. **避免在 onUpdated 中修改状态**：
   - 可能导致无限循环
   - 如需修改，使用条件判断

---

## 练习题

### 练习 1：倒计时组件

创建一个倒计时组件：
- 接收 `seconds` 属性作为初始秒数
- 组件挂载后开始倒计时
- 每秒更新显示
- 组件卸载时自动清理定时器
- 倒计时结束时触发 `finish` 事件

### 练习 2：窗口大小监听

创建一个监听窗口大小的组件：
- 实时显示窗口宽度和高度
- 窗口大小改变时更新显示
- 组件卸载时移除监听
- 添加防抖优化（100ms）

### 练习 3：API 数据获取

创建一个用户列表组件：
- 组件挂载时获取用户列表
- 显示加载状态
- 处理错误情况
- 支持手动刷新
- 组件卸载时取消未完成的请求

---

## 常见错误

```javascript
// ❌ 错误：在 setup 中直接操作 DOM
const input = document.getElementById('myInput')
input.focus() // 可能 DOM 还不存在

// ✅ 正确：在 onMounted 中操作
onMounted(() => {
  inputRef.value?.focus()
})
```

```javascript
// ❌ 错误：忘记清理副作用
onMounted(() => {
  setInterval(() => {...}, 1000)
})

// ✅ 正确：记得清理
let timer
onMounted(() => {
  timer = setInterval(() => {...}, 1000)
})
onUnmounted(() => {
  clearInterval(timer)
})
```

```javascript
// ❌ 错误：在 onUpdated 中无条件修改状态
onUpdated(() => {
  count.value++ // 无限循环！
})

// ✅ 正确：添加条件判断
const oldCount = ref(0)
onUpdated(() => {
  if (someConditionChanged) {
    // 安全地更新
  }
})
```
