# 第18章：混入 (Mixins)

## 概念

混入 (Mixins) 是 Vue 中一种分发可复用功能的灵活方式。一个混入对象可以包含任意组件选项（如 data、methods、computed、生命周期钩子等）。

### 为什么使用混入？

当多个组件需要共享相同的逻辑时：
- 相同的响应式数据
- 相同的方法
- 相同的计算属性
- 相同的生命周期处理

### 注意

在 Vue 3 的组合式 API (Composition API) 中，**推荐使用组合式函数 (Composables)** 替代混入。混入主要用于选项式 API 或兼容旧代码。

---

## 1. 基础混入

### 定义混入对象

```javascript
// mixins/myMixin.js
export const myMixin = {
  // 响应式数据
  data() {
    return {
      mixinMessage: '来自混入的消息',
      mixinCount: 0
    }
  },
  
  // 计算属性
  computed: {
    mixinComputed() {
      return this.mixinMessage.toUpperCase()
    }
  },
  
  // 方法
  methods: {
    mixinMethod() {
      console.log('混入的方法被调用')
      this.mixinCount++
    }
  },
  
  // 生命周期钩子
  created() {
    console.log('混入的 created 钩子')
  },
  
  mounted() {
    console.log('混入的 mounted 钩子')
  }
}
```

### 使用混入

```vue
<template>
  <div>
    <p>{{ mixinMessage }}</p>
    <p>计数: {{ mixinCount }}</p>
    <p>计算属性: {{ mixinComputed }}</p>
    <button @click="mixinMethod">调用混入方法</button>
  </div>
</template>

<script>
import { myMixin } from './mixins/myMixin.js'

export default {
  mixins: [myMixin],
  
  created() {
    // 混入的 created 先执行，然后是这里的 created
    console.log('组件的 created 钩子')
  }
}
</script>
```

---

## 2. 混入的合并策略

### 选项合并规则

| 选项 | 合并策略 |
|------|----------|
| `data` | 递归合并，组件数据优先 |
| `methods` | 组件方法覆盖混入方法 |
| `computed` | 组件计算属性覆盖混入 |
| `生命周期钩子` | 合并成数组，全部执行 |

### 示例：合并行为

```javascript
// mixin.js
export const exampleMixin = {
  data() {
    return {
      message: '混入消息',
      count: 10
    }
  },
  
  methods: {
    greet() {
      console.log('混入: Hello')
    }
  },
  
  created() {
    console.log('混入 created')
  }
}
```

```vue
<script>
import { exampleMixin } from './mixin.js'

export default {
  mixins: [exampleMixin],
  
  data() {
    return {
      message: '组件消息',  // 覆盖混入的 message
      // count 保留混入的值 10
    }
  },
  
  methods: {
    greet() {
      console.log('组件: Hi')  // 覆盖混入的 greet
    }
  },
  
  created() {
    // 混入的 created 先执行，然后是这里
    console.log('组件 created')
  }
}
</script>
```

---

## 3. 全局混入

### 注册全局混入

```javascript
// main.js
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

// 注册全局混入（谨慎使用！）
app.mixin({
  created() {
    console.log('全局混入 - 每个组件创建时都会执行')
  },
  
  methods: {
    // 全局方法
    $log(...args) {
      console.log('[Log]', ...args)
    }
  }
})

app.mount('#app')
```

### 全局混入的影响

**警告**：全局混入会影响**每一个**组件，应当极其谨慎地使用！

```vue
<!-- 任何组件都可以使用 $log -->
<template>
  <button @click="$log('点击了按钮')">点击</button>
</template>
```

---

## 4. 实用混入示例

### 1. 日志混入

```javascript
// mixins/logger.js
export const loggerMixin = {
  methods: {
    log(message, level = 'info') {
      const timestamp = new Date().toISOString()
      console[level](`[${timestamp}] ${this.$options.name}: ${message}`)
    },
    
    logError(error) {
      this.log(error.message, 'error')
    }
  }
}
```

### 2. 加载状态混入

```javascript
// mixins/loading.js
export const loadingMixin = {
  data() {
    return {
      isLoading: false,
      loadingText: '加载中...'
    }
  },
  
  methods: {
    startLoading(text) {
      this.isLoading = true
      if (text) this.loadingText = text
    },
    
    stopLoading() {
      this.isLoading = false
    },
    
    async withLoading(promise, text) {
      this.startLoading(text)
      try {
        const result = await promise
        return result
      } finally {
        this.stopLoading()
      }
    }
  }
}
```

### 3. 表单验证混入

```javascript
// mixins/formValidation.js
export const formValidationMixin = {
  data() {
    return {
      errors: {}
    }
  },
  
  methods: {
    validateField(field, rules) {
      this.errors[field] = []
      
      for (const rule of rules) {
        if (!rule.validator(this[field])) {
          this.errors[field].push(rule.message)
        }
      }
      
      return this.errors[field].length === 0
    },
    
    clearErrors() {
      this.errors = {}
    },
    
    hasErrors() {
      return Object.values(this.errors).some(arr => arr.length > 0)
    }
  }
}

// 使用
const rules = {
  email: [
    { validator: v => !!v, message: '邮箱必填' },
    { validator: v => /\S+@\S+\.\S+/.test(v), message: '邮箱格式错误' }
  ]
}
```

### 4. 定时器混入

```javascript
// mixins/timers.js
export const timersMixin = {
  data() {
    return {
      _timers: []
    }
  },
  
  methods: {
    setTimer(callback, delay) {
      const timer = setTimeout(callback, delay)
      this._timers.push(timer)
      return timer
    },
    
    setIntervalTimer(callback, delay) {
      const timer = setInterval(callback, delay)
      this._timers.push(timer)
      return timer
    }
  },
  
  beforeUnmount() {
    // 自动清理所有定时器
    this._timers.forEach(timer => clearTimeout(timer))
    this._timers = []
  }
}
```

---

## 5. 完整代码示例

### 文件 1: loadingMixin.js

```javascript
// mixins/loadingMixin.js
export const loadingMixin = {
  data() {
    return {
      loading: false,
      loadingMessage: '加载中...'
    }
  },
  
  computed: {
    loadingClass() {
      return this.loading ? 'is-loading' : ''
    }
  },
  
  methods: {
    showLoading(message) {
      this.loading = true
      if (message) this.loadingMessage = message
    },
    
    hideLoading() {
      this.loading = false
    },
    
    async withLoading(asyncFn, message) {
      this.showLoading(message)
      try {
        const result = await asyncFn()
        return result
      } catch (error) {
        throw error
      } finally {
        this.hideLoading()
      }
    }
  }
}
```

### 文件 2: UserList.vue

```vue
<template>
  <div :class="loadingClass">
    <h3>用户列表</h3>
    
    <div v-if="loading" class="loading-overlay">
      <p>{{ loadingMessage }}</p>
    </div>
    
    <ul v-else>
      <li v-for="user in users" :key="user.id">
        {{ user.name }}
      </li>
    </ul>
    
    <button @click="fetchUsers" :disabled="loading">
      刷新
    </button>
  </div>
</template>

<script>
import { loadingMixin } from './mixins/loadingMixin.js'

export default {
  name: 'UserList',
  mixins: [loadingMixin],
  
  data() {
    return {
      users: []
    }
  },
  
  methods: {
    async fetchUsers() {
      // 使用混入的 withLoading 方法
      this.users = await this.withLoading(
        async () => {
          const res = await fetch('/api/users')
          return await res.json()
        },
        '正在获取用户数据...'
      )
    }
  },
  
  created() {
    this.fetchUsers()
  }
}
</script>
```

---

## 6. 现代替代方案：组合式函数

在 Vue 3 组合式 API 中，推荐使用 composables 替代 mixins：

```javascript
// composables/useLoading.js
import { ref } from 'vue'

export function useLoading() {
  const loading = ref(false)
  const loadingMessage = ref('加载中...')
  
  const showLoading = (message) => {
    loading.value = true
    if (message) loadingMessage.value = message
  }
  
  const hideLoading = () => {
    loading.value = false
  }
  
  const withLoading = async (asyncFn, message) => {
    showLoading(message)
    try {
      return await asyncFn()
    } finally {
      hideLoading()
    }
  }
  
  return {
    loading,
    loadingMessage,
    showLoading,
    hideLoading,
    withLoading
  }
}
```

```vue
<script setup>
import { useLoading } from './composables/useLoading.js'

const { loading, loadingMessage, withLoading } = useLoading()

const fetchData = async () => {
  const data = await withLoading(
    () => fetch('/api/data').then(r => r.json()),
    '获取数据中...'
  )
  console.log(data)
}
</script>
```

### Composables 的优势

1. **来源清晰** - 不再担心命名冲突
2. **灵活组合** - 可以按需引入
3. **TypeScript 友好** - 更好的类型推断
4. **逻辑复用** - 真正的函数式复用

---

## 关键点总结

| 特性 | Mixins (选项式) | Composables (组合式) |
|------|----------------|---------------------|
| 命名冲突 | 可能 | 无 |
| 来源追踪 | 困难 | 清晰 |
| TypeScript | 支持较差 | 完美支持 |
| Vue 3 推荐 | 兼容 | ✅ 推荐 |
| 全局注册 | 支持 | 不推荐 |

---

## 练习题

### 练习 1：创建日志混入

创建一个 logger mixin：
- 提供 log、warn、error 方法
- 自动包含组件名和时间戳
- 支持不同日志级别

### 练习 2：创建防抖混入

创建一个 debounce mixin：
- 提供防抖函数包装器
- 自动清理定时器
- 支持自定义延迟时间

### 练习 3：迁移到 Composable

将练习 1 的日志混入改写为 composable 函数：
- 使用 useLogger() 函数
- 支持在 `<script setup>` 中使用
- 添加 TypeScript 类型支持

---

## 常见错误

```javascript
// ❌ 错误：混入中使用了箭头函数，this 指向错误
const badMixin = {
  data: () => ({  // 错误！
    count: 0
  })
}

// ✅ 正确
const goodMixin = {
  data() {  // 普通函数
    return {
      count: 0
    }
  }
}
```

```javascript
// ❌ 错误：混入与组件 data 命名冲突，导致意外覆盖
// mixin.js
data() {
  return { message: 'mixin' }
}

// component.vue
data() {
  return { message: 'component' }  // 覆盖了混入的 message
}

// ✅ 正确：使用命名空间或前缀
// mixin.js
data() {
  return { mixinMessage: 'mixin' }
}
```

```javascript
// ❌ 错误：全局混入滥用
app.mixin({
  created() {
    // 这会在每个组件创建时执行！
    console.log('Component created')
  }
})

// ✅ 正确：谨慎使用全局混入，或使用 provide/inject
```
