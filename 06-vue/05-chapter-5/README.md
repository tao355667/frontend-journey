# 侦听器 watch

## 本章目的

掌握 `watch` 的使用方法，理解何时使用侦听器而不是计算属性，学会在 `<script setup>` 中监听数据变化并执行副作用操作。

---

## 内容概述

- watch 的基本用法
- 侦听器 vs 计算属性
- 监听多个数据源
- 深度监听（deep）
- 立即执行（immediate）
- 停止侦听器
- 实战案例

---

## 核心概念讲解

### 什么是侦听器？

侦听器用于监听响应式数据的变化，当数据变化时执行回调函数。常用于执行副作用操作（如发送请求、操作 DOM、记录日志等）。

#### 类比理解

想象你有一套智能家居系统：
- **传感器（watch）**：监测门窗是否打开
- **响应动作（handler）**：检测到门窗打开 → 自动开灯、发送通知

传感器本身不改变门窗状态，只是在状态变化时做出响应。

---

### 1. 基本用法

```vue
<script setup lang="ts">
import { ref, watch } from 'vue'

const count = ref(0)

// 监听单个 ref
watch(count, (newValue, oldValue) => {
  console.log(`count 从 ${oldValue} 变为 ${newValue}`)
})

const increment = () => {
  count.value++
}
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="increment">+1</button>
  </div>
</template>
```

---

### 2. 侦听器 vs 计算属性

| 特性 | computed | watch |
|------|----------|-------|
| **目的** | 基于数据计算新值 | 响应数据变化执行副作用 |
| **返回值** | 必须有返回值 | 不需要返回值 |
| **缓存** | ✅ 有缓存 | ❌ 无缓存 |
| **异步** | ❌ 不能执行异步 | ✅ 可以执行异步 |
| **适用场景** | 数据转换 | 副作用操作 |

#### 何时使用 computed？

当需要根据现有数据派生出新数据时使用：

```vue
<script setup>
import { ref, computed } from 'vue'

const firstName = ref('张')
const lastName = ref('三')

// ✅ 使用 computed - 派生新数据
const fullName = computed(() => {
  return firstName.value + lastName.value
})
</script>
```

#### 何时使用 watch？

当需要在数据变化时执行副作用时使用：

```vue
<script setup>
import { ref, watch } from 'vue'

const userId = ref(1)

// ✅ 使用 watch - 执行副作用（发送请求）
watch(userId, async (newId) => {
  const response = await fetch(`/api/users/${newId}`)
  const userData = await response.json()
  console.log(userData)
})
</script>
```

---

### 3. 监听多个数据源

```vue
<script setup lang="ts">
import { ref, watch } from 'vue'

const firstName = ref('张')
const lastName = ref('三')

// 监听多个 ref
watch([firstName, lastName], ([newFirst, newLast], [oldFirst, oldLast]) => {
  console.log('姓名发生变化:', oldFirst, oldLast, '->', newFirst, newLast)
})
</script>
```

---

### 4. 立即执行（immediate）

默认情况下，侦听器只在数据变化时触发。使用 `immediate: true` 可以在创建时立即执行一次：

```vue
<script setup lang="ts">
import { ref, watch } from 'vue'

const count = ref(0)

watch(count, (newValue, oldValue) => {
  console.log('值:', newValue)
}, {
  immediate: true  // 立即执行一次
})
// 输出: 值: 0（创建时立即执行）
</script>
```

---

### 5. 深度监听（deep）

当监听对象时，默认只监听对象的引用变化。使用 `deep: true` 可以监听对象内部属性的变化：

```vue
<script setup lang="ts">
import { ref, watch } from 'vue'

const user = ref({
  name: '张三',
  age: 25
})

// ❌ 默认情况下，这种监听不会触发
watch(user, (newValue, oldValue) => {
  console.log('user 变化:', newValue)
})

// ✅ 使用 deep 监听对象内部变化
watch(user, (newValue, oldValue) => {
  console.log('user 变化:', newValue)
}, {
  deep: true
})

// 更好的方式：直接监听具体属性
watch(() => user.value.age, (newAge, oldAge) => {
  console.log(`年龄从 ${oldAge} 变为 ${newAge}`)
})
</script>
```

---

### 6. 停止侦听器

手动创建的侦听器可以停止：

```vue
<script setup lang="ts">
import { ref, watch } from 'vue'

const count = ref(0)

// 创建侦听器并保存停止函数
const stop = watch(count, (newValue) => {
  console.log('count:', newValue)
  
  // 当 count 达到 5 时停止监听
  if (newValue >= 5) {
    stop()
    console.log('停止监听')
  }
})

const increment = () => {
  count.value++
}
</script>
```

---

## 完整示例

### 搜索防抖示例

```vue
<script setup lang="ts">
import { ref, watch } from 'vue'

const searchQuery = ref('')
const searchResults = ref([])
const isLoading = ref(false)

let timeoutId: ReturnType<typeof setTimeout> | null = null

// 使用 watch 实现搜索防抖
watch(searchQuery, (newQuery) => {
  // 清除之前的定时器
  if (timeoutId) {
    clearTimeout(timeoutId)
  }
  
  // 如果搜索词为空，清空结果
  if (!newQuery.trim()) {
    searchResults.value = []
    return
  }
  
  // 设置新的定时器（防抖）
  timeoutId = setTimeout(async () => {
    isLoading.value = true
    
    // 模拟 API 请求
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // 模拟搜索结果
    searchResults.value = [
      { id: 1, title: `${newQuery} 的结果 1` },
      { id: 2, title: `${newQuery} 的结果 2` },
      { id: 3, title: `${newQuery} 的结果 3` }
    ]
    
    isLoading.value = false
  }, 300)  // 300ms 防抖
})
</script>

<template>
  <div class="search">
    <h2>搜索示例（带防抖）</h2>
    
    <input 
      v-model="searchQuery" 
      placeholder="输入搜索关键词..."
      class="search-input"
    >
    
    <p v-if="isLoading" class="loading">搜索中...</p>
    
    <ul v-else-if="searchResults.length > 0" class="results">
      <li v-for="item in searchResults" :key="item.id">
        {{ item.title }}
      </li>
    </ul>
    
    <p v-else-if="searchQuery" class="no-results">暂无结果</p>
  </div>
</template>

<style scoped>
.search {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

.search-input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 4px;
}

.loading {
  color: #42b883;
  margin-top: 10px;
}

.results {
  list-style: none;
  padding: 0;
  margin-top: 20px;
}

.results li {
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.no-results {
  color: #999;
  margin-top: 10px;
}
</style>
```

### 表单验证示例

```vue
<script setup lang="ts">
import { ref, watch, reactive } from 'vue'

const form = reactive({
  username: '',
  email: '',
  password: ''
})

const errors = reactive({
  username: '',
  email: '',
  password: ''
})

// 监听表单变化并验证
watch(() => form.username, (newVal) => {
  if (newVal.length < 3) {
    errors.username = '用户名至少3个字符'
  } else {
    errors.username = ''
  }
})

watch(() => form.email, (newVal) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(newVal)) {
    errors.email = '请输入有效的邮箱地址'
  } else {
    errors.email = ''
  }
})

watch(() => form.password, (newVal) => {
  if (newVal.length < 6) {
    errors.password = '密码至少6个字符'
  } else {
    errors.password = ''
  }
})

const isValid = ref(false)

// 监听所有错误，判断表单是否有效
watch(errors, () => {
  isValid.value = !errors.username && !errors.email && !errors.password
}, { deep: true })
</script>

<template>
  <form class="form">
    <h2>表单验证</h2>
    
    <div class="field">
      <label>用户名</label>
      <input v-model="form.username" type="text">
      <span class="error" v-if="errors.username">{{ errors.username }}</span>
    </div>
    
    <div class="field">
      <label>邮箱</label>
      <input v-model="form.email" type="email">
      <span class="error" v-if="errors.email">{{ errors.email }}</span>
    </div>
    
    <div class="field">
      <label>密码</label>
      <input v-model="form.password" type="password">
      <span class="error" v-if="errors.password">{{ errors.password }}</span>
    </div>
    
    <button type="submit" :disabled="!isValid">提交</button>
  </form>
</template>

<style scoped>
.form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.field {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.error {
  color: #ff4444;
  font-size: 12px;
  margin-top: 5px;
}

button {
  width: 100%;
  padding: 10px;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>
```

---

## 最佳实践

### ✅ 推荐做法

1. **优先使用 computed**：只有需要副作用时才使用 watch
2. **避免滥用 deep**：尽量监听具体属性而不是整个对象
3. **记得清理副作用**：如果 watch 中创建了定时器、事件监听等，记得在组件卸载前清理
4. **使用 immediate 进行初始化**：当需要基于初始数据执行操作时

### ❌ 应避免的做法

1. **在 watch 中修改被监听的数据**（可能导致无限循环）

```vue
<script setup>
import { ref, watch } from 'vue'

const count = ref(0)

// ❌ 错误 - 会导致无限循环
watch(count, () => {
  count.value++  // 不要这样做！
})
</script>
```

2. **监听过于频繁变化的数据**

```vue
<script setup>
import { ref, watch } from 'vue'

const mouseX = ref(0)

// ❌ 不建议 - 鼠标移动太频繁
watch(mouseX, () => {
  // 执行耗时操作
})

// ✅ 更好的做法：使用防抖或节流
</script>
```

---

## 练习题

### 基础练习

创建一个计数器应用，要求：
1. 使用 `ref` 定义计数器
2. 使用 `watch` 监听计数器变化
3. 当计数器达到 10 时显示提示信息
4. 当计数器达到 20 时自动重置为 0

### 进阶练习

创建一个本地存储同步器：
1. 使用 `ref` 定义一个待办事项列表
2. 使用 `watch` 监听列表变化，自动保存到 localStorage
3. 页面加载时从 localStorage 读取数据
4. 添加深度监听确保对象属性变化也能触发保存

### 挑战练习

创建一个实时数据监控面板：
1. 模拟实时数据流（使用 setInterval 每2秒生成新数据）
2. 使用 `watch` 监听数据变化
3. 计算以下指标：
   - 最新值、最大值、最小值、平均值
   - 数据变化趋势（上升/下降/稳定）
   - 异常值检测（超过阈值报警）
4. 当检测到异常时显示警告
5. 使用 `watch` 的停止功能，提供暂停监控的按钮

---

## 学习目标检查清单

- [ ] 理解 watch 的作用和使用场景
- [ ] 掌握 watch 的基本用法
- [ ] 理解 watch 与 computed 的区别
- [ ] 掌握监听多个数据源的方法
- [ ] 理解 immediate 和 deep 选项
- [ ] 掌握如何停止侦听器
- [ ] 能够在实际项目中正确使用 watch

---

## 延伸阅读

- [Vue 官方文档 - 侦听器](https://cn.vuejs.org/guide/essentials/watchers.html)
- [Vue 官方文档 - watch](https://cn.vuejs.org/api/reactivity-core.html#watch)

---

## 下一步

完成本章学习后，进入 [第 6 章：ref 与 reactive](../06-chapter-6/README.md)，深入学习响应式系统的核心概念。
