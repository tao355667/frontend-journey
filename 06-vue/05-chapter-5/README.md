# 侦听器（Watch）：数据的"哨兵"

## 本章目的

理解侦听器（watch）的概念和使用场景，掌握如何使用 watch 来响应数据的变化，学会区分计算属性和侦听器的适用场景。

---

## 内容概述

- watch 选项的基本用法
- 侦听器 vs 计算属性：何时使用哪个
- 侦听器的配置选项（immediate, deep）
- 侦听数组和对象的变化
- 停止侦听器
- 异步操作与侦听器
- 实战案例：搜索防抖

---

## 核心概念讲解

### 什么是侦听器？

侦听器是一种观察数据变化的机制。当数据发生变化时，侦听器会执行指定的回调函数，常用于执行副作用操作（如发送请求、操作 DOM、记录日志等）。

#### 类比理解

想象你有一套智能家居系统：
- **传感器（watch）**：监测门窗是否打开
- **响应动作（handler）**：检测到门窗打开 → 自动开灯、发送通知

传感器本身不改变门窗状态，只是在状态变化时做出响应。

---

### 1. 侦听器的基本用法

```javascript
createApp({
  data() {
    return {
      searchText: '',
      userInfo: { name: '张三', age: 25 }
    }
  },
  watch: {
    // 监听 searchText 的变化
    searchText(newValue, oldValue) {
      console.log('搜索文本从', oldValue, '变为', newValue)
      this.performSearch(newValue)
    }
  },
  methods: {
    performSearch(keyword) {
      // 发送搜索请求
      console.log('正在搜索:', keyword)
    }
  }
})
```

```html
<input v-model="searchText" placeholder="输入搜索关键词">
```

---

### 2. watch vs computed：何时使用哪个？

| 场景 | 使用 computed | 使用 watch |
|------|--------------|-----------|
| **派生数据** | ✅ 根据现有数据计算新值 | ❌ |
| **副作用操作** | ❌ | ✅ 发送请求、操作 DOM、日志记录 |
| **异步操作** | ❌ | ✅ 数据变化后发起异步请求 |
| **昂贵操作** | ✅ 利用缓存 | ⚠️ 需要配合防抖 |
| **多个数据影响一个值** | ✅ 声明式 | ⚠️ 需要手动追踪 |
| **一个数据影响多个操作** | ❌ | ✅ 在 handler 中处理多个逻辑 |

#### 简单判断方法

```
问自己：是否需要响应数据变化执行操作？
- 只需要得到一个新值 → computed
- 需要执行某些操作（请求、DOM操作等）→ watch
```

---

### 3. 侦听器的配置选项

#### immediate：立即执行

```javascript
watch: {
  searchText: {
    handler(newValue, oldValue) {
      console.log('搜索:', newValue)
    },
    immediate: true  // 初始化时立即执行一次
  }
}
```

#### deep：深度侦听

```javascript
data() {
  return {
    user: { name: '张三', address: { city: '北京' } }
  }
},
watch: {
  // 浅层侦听 - 只监听 user 对象的引用变化
  user(newVal, oldVal) {
    console.log('user 引用变化')
  },
  
  // 深度侦听 - 监听 user 对象内部任何属性的变化
  user: {
    handler(newVal, oldVal) {
      console.log('user 内部属性变化:', newVal)
    },
    deep: true
  }
}
```

⚠️ **注意**：深度侦听会递归遍历对象的所有属性，性能开销较大，请谨慎使用。

---

### 4. 侦听特定对象的属性

```javascript
data() {
  return {
    user: { name: '张三', age: 25 }
  }
},
watch: {
  // 只侦听 user.name 的变化
  'user.name'(newName, oldName) {
    console.log('用户名从', oldName, '变为', newName)
  }
}
```

---

### 5. 侦听器中的异步操作

```javascript
createApp({
  data() {
    return {
      searchText: '',
      searchResults: [],
      isSearching: false
    }
  },
  watch: {
    searchText: {
      async handler(newValue) {
        if (!newValue.trim()) {
          this.searchResults = []
          return
        }
        
        this.isSearching = true
        
        try {
          // 模拟异步搜索请求
          const results = await this.searchAPI(newValue)
          this.searchResults = results
        } catch (error) {
          console.error('搜索失败:', error)
        } finally {
          this.isSearching = false
        }
      },
      debounce: 300  // 防抖 300ms（需要自行实现或使用库）
    }
  },
  methods: {
    async searchAPI(keyword) {
      // 模拟 API 请求
      return new Promise(resolve => {
        setTimeout(() => {
          resolve([
            { id: 1, title: `关于 "${keyword}" 的结果 1` },
            { id: 2, title: `关于 "${keyword}" 的结果 2` }
          ])
        }, 500)
      })
    }
  }
})
```

---

### 6. 停止侦听器

在组件卸载时，Vue 会自动清理侦听器。但有时需要手动控制：

```javascript
import { watch } from 'vue'

export default {
  data() {
    return {
      count: 0
    }
  },
  mounted() {
    // 创建侦听器并保存引用
    this.unwatch = this.$watch('count', (newVal, oldVal) => {
      console.log('count 变化:', oldVal, '→', newVal)
    })
  },
  beforeUnmount() {
    // 手动停止侦听
    this.unwatch()
  }
}
```

---

### 7. 实战案例：搜索防抖

防抖（debounce）是指在事件触发后等待一段时间，如果这段时间内没有再次触发，才执行操作。

```javascript
createApp({
  data() {
    return {
      searchText: '',
      results: [],
      debounceTimer: null
    }
  },
  watch: {
    searchText(newValue) {
      // 清除之前的定时器
      clearTimeout(this.debounceTimer)
      
      // 设置新的定时器
      this.debounceTimer = setTimeout(() => {
        this.doSearch(newValue)
      }, 300)  // 300ms 防抖
    }
  },
  methods: {
    doSearch(keyword) {
      console.log('执行搜索:', keyword)
      // 实际搜索逻辑...
    }
  }
})
```

**生活类比**：就像电梯门 - 你按了按钮，门开始关闭，但如果又有人按了按钮，门会重新等待。

---

## JavaScript vs TypeScript 对比

| 特性 | JavaScript | TypeScript |
|------|-----------|------------|
| 参数类型 | 无类型 | 可定义 newValue, oldValue 类型 |
| 代码提示 | 有限 | 完整的类型推断和提示 |

#### TypeScript 示例

```typescript
interface User {
  name: string
  age: number
}

export default {
  data() {
    return {
      user: {
        name: '张三',
        age: 25
      } as User
    }
  },
  watch: {
    // 定义参数类型
    'user.name'(newName: string, oldName: string) {
      console.log(`用户名从 ${oldName} 变为 ${newName}`)
    },
    
    // 完整配置对象写法
    user: {
      handler(newUser: User, oldUser: User) {
        console.log('用户信息变化:', newUser)
      },
      deep: true
    }
  }
}
```

---

## 完整示例代码

### JavaScript 版本

详见 `src/js/example.html`

### TypeScript 版本

详见 `src/ts/example.html`

---

## 练习题

### 基础练习

创建一个表单验证器：
1. 使用 `data` 定义 username、email、password 字段
2. 使用侦听器验证每个字段：
   - username: 长度3-20，只能包含字母数字
   - email: 必须符合邮箱格式
   - password: 长度至少6位
3. 实时显示验证结果（有效/无效）
4. 所有字段有效时，启用提交按钮

### 进阶练习

创建一个实时汇率转换器：
1. 使用 `data` 定义金额和源货币/目标货币
2. 使用侦听器监听金额或货币变化
3. 模拟异步获取汇率（使用 setTimeout）
4. 使用防抖避免频繁请求
5. 显示加载状态和转换结果

### 挑战练习

创建一个完整的用户资料编辑器：
1. 定义包含多个字段的用户对象（姓名、年龄、地址、联系方式等）
2. 使用深度侦听监听整个用户对象的变化
3. 实现自动保存功能（数据变化后3秒自动保存到 localStorage）
4. 如果有未保存的更改，离开页面时提示用户
5. 添加撤销/重做功能（保存历史记录）

---

## 练习题答案

详见 `practice-solution.html`

---

## 学习目标检查清单

- [ ] 理解侦听器（watch）的基本概念
- [ ] 掌握 watch 的基本语法
- [ ] 理解 watch 和 computed 的区别和使用场景
- [ ] 掌握 immediate 和 deep 配置选项
- [ ] 知道如何侦听对象的特定属性
- [ ] 能够在侦听器中执行异步操作
- [ ] 理解并能够实现防抖（debounce）
- [ ] 知道如何手动停止侦听器

---

## 延伸阅读

- [Vue 官方文档 - 侦听器](https://cn.vuejs.org/guide/essentials/watchers.html)
- [Vue 计算属性 vs 侦听器](https://cn.vuejs.org/guide/essentials/computed.html#computed-vs-watch)
- [JavaScript 防抖和节流](https://lodash.com/docs/4.17.15#debounce)
