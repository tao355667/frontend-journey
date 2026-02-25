# `<script setup>` 基础

## 本章目的

理解 `<script setup>` 语法糖的基本用法，掌握在 `<script setup>` 中定义响应式数据、方法，以及如何在模板中使用它们。

---

## 内容概述

- `<script setup>` 基本结构
- 使用 ref 创建响应式数据
- 定义组件方法
- 计算属性和侦听器基础
- 生命周期钩子基础
- 自动暴露机制

---

## 核心概念讲解

### `<script setup>` 基本结构

```vue
<script setup lang="ts">
// 1. 导入 Vue 提供的函数
import { ref, computed, watch, onMounted } from 'vue'

// 2. 导入其他组件
import MyComponent from './MyComponent.vue'

// 3. 定义响应式数据
const count = ref(0)

// 4. 定义计算属性
const doubleCount = computed(() => count.value * 2)

// 5. 定义方法
const increment = () => {
  count.value++
}

// 6. 使用生命周期钩子
onMounted(() => {
  console.log('组件已挂载')
})
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>Double: {{ doubleCount }}</p>
    <button @click="increment">+1</button>
    <MyComponent />
  </div>
</template>
```

#### 类比理解

想象 `<script setup>` 是一个智能工作台：
- **导入区**：从工具库（Vue）拿出需要的工具
- **数据区**：放置需要追踪的物品（响应式数据）
- **方法区**：定义处理物品的流程（方法）
- **展示区**：自动将数据和方法展示给外部（模板）

---

### 1. 响应式数据（ref）

在 `<script setup>` 中，使用 `ref` 创建响应式数据：

```vue
<script setup>
import { ref } from 'vue'

// 基本类型
const count = ref(0)
const message = ref('Hello Vue!')
const isActive = ref(true)

// 对象
const user = ref({
  name: '张三',
  age: 25
})

// 数组
const items = ref(['苹果', '香蕉', '橙子'])
</script>
```

#### 访问和修改 ref

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)

// 在 script 中访问需要使用 .value
console.log(count.value)  // 0

// 修改值
const increment = () => {
  count.value++  // 必须使用 .value
}

// 修改对象属性
const user = ref({ name: '张三', age: 25 })
const updateUser = () => {
  user.value.age++
}
</script>

<template>
  <!-- 在 template 中直接使用，不需要 .value -->
  <p>{{ count }}</p>
  <p>{{ user.name }}</p>
  <button @click="increment">增加</button>
</template>
```

⚠️ **重要**：在 `<script setup>` 中访问 ref 的值必须使用 `.value`，但在模板中直接使用变量名即可。

---

### 2. 定义方法

在 `<script setup>` 中直接定义函数即可：

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)

// 定义方法 - 使用箭头函数或普通函数都可以
const increment = () => {
  count.value++
}

const decrement = function() {
  count.value--
}

// 带参数的方法
const add = (n) => {
  count.value += n
}

// 带返回值的方法
const getCount = () => {
  return count.value
}
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="decrement">-1</button>
    <button @click="increment">+1</button>
    <button @click="add(5)">+5</button>
    <p>当前值: {{ getCount() }}</p>
  </div>
</template>
```

#### 方法之间互相调用

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)
const history = ref([])

// 记录历史
const recordHistory = (action) => {
  history.value.push({
    action,
    value: count.value,
    time: new Date().toLocaleTimeString()
  })
}

// 增加并记录
const increment = () => {
  count.value++
  recordHistory('increment')
}

// 减少并记录
const decrement = () => {
  count.value--
  recordHistory('decrement')
}
</script>
```

---

### 3. 自动暴露机制

`<script setup>` 的一大特点是：**顶层的变量和函数会自动暴露给模板使用**。

```vue
<script setup>
// 这些都会自动暴露给模板
const message = 'Hello!'           // 变量
const count = ref(0)               // ref
const handleClick = () => {}       // 函数

// 组件也自动暴露
import MyComponent from './MyComponent.vue'
</script>

<template>
  <!-- 直接使用，无需 return -->
  <p>{{ message }}</p>
  <p>{{ count }}</p>
  <button @click="handleClick">点击</button>
  <MyComponent />
</template>
```

对比传统 `setup()` 函数：

```javascript
// 传统写法 - 需要手动 return
export default {
  setup() {
    const count = ref(0)
    const increment = () => count.value++
    
    return {
      count,        // 必须在这里列出
      increment     // 模板才能使用
    }
  }
}
```

---

### 4. 计算属性（computed）基础

```vue
<script setup>
import { ref, computed } from 'vue'

const firstName = ref('张')
const lastName = ref('三')

// 计算属性 - 会根据依赖自动更新
const fullName = computed(() => {
  return firstName.value + lastName.value
})

// 可读写的计算属性
const fullNameWritable = computed({
  get: () => firstName.value + lastName.value,
  set: (newValue) => {
    [firstName.value, lastName.value] = newValue.split(' ')
  }
})
</script>

<template>
  <div>
    <p>姓: {{ firstName }}</p>
    <p>名: {{ lastName }}</p>
    <p>全名: {{ fullName }}</p>
    
    <input v-model="firstName" placeholder="姓">
    <input v-model="lastName" placeholder="名">
  </div>
</template>
```

---

### 5. 侦听器（watch）基础

```vue
<script setup>
import { ref, watch } from 'vue'

const count = ref(0)
const message = ref('')

// 监听单个 ref
watch(count, (newValue, oldValue) => {
  console.log(`count 从 ${oldValue} 变为 ${newValue}`)
  message.value = `count 已更新为 ${newValue}`
})

// 监听多个 ref
const name = ref('张三')
const age = ref(25)

watch([name, age], ([newName, newAge], [oldName, oldAge]) => {
  console.log('姓名或年龄发生变化')
})
</script>
```

---

### 6. 生命周期钩子基础

```vue
<script setup>
import { 
  onMounted, 
  onUpdated, 
  onUnmounted 
} from 'vue'

// 组件挂载完成后执行
onMounted(() => {
  console.log('组件已挂载到 DOM')
  // 可以在这里发起 API 请求、设置事件监听等
})

// 组件更新后执行
onUpdated(() => {
  console.log('组件已更新')
})

// 组件卸载前执行
onUnmounted(() => {
  console.log('组件即将卸载')
  // 可以在这里清理工作：移除事件监听、取消定时器等
})
</script>
```

---

## 完整示例

### 计数器应用

```vue
<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'

// 响应式数据
const count = ref(0)
const history = ref<string[]>([])
const message = ref('准备开始计数')

// 计算属性
const doubleCount = computed(() => count.value * 2)
const isPositive = computed(() => count.value > 0)

// 方法
const increment = () => {
  count.value++
  addToHistory('增加')
}

const decrement = () => {
  count.value--
  addToHistory('减少')
}

const reset = () => {
  count.value = 0
  addToHistory('重置')
}

const addToHistory = (action: string) => {
  history.value.unshift(`${action}: ${count.value} (${new Date().toLocaleTimeString()})`)
  // 只保留最近10条记录
  if (history.value.length > 10) {
    history.value.pop()
  }
}

// 侦听器
watch(count, (newVal, oldVal) => {
  if (newVal > oldVal) {
    message.value = `增加了！现在是 ${newVal}`
  } else if (newVal < oldVal) {
    message.value = `减少了！现在是 ${newVal}`
  } else {
    message.value = '已重置为 0'
  }
})

// 生命周期钩子
onMounted(() => {
  console.log('计数器组件已就绪')
  message.value = '计数器已就绪，开始计数吧！'
})
</script>

<template>
  <div class="counter-container">
    <h1>计数器示例</h1>
    
    <div class="display">
      <p class="count">当前计数: {{ count }}</p>
      <p class="double">双倍值: {{ doubleCount }}</p>
      <p :class="{ positive: isPositive, message: true }">
        {{ message }}
      </p>
    </div>
    
    <div class="buttons">
      <button @click="decrement" :disabled="count <= -10">-1</button>
      <button @click="reset">重置</button>
      <button @click="increment" :disabled="count >= 10">+1</button>
    </div>
    
    <div class="history">
      <h3>操作历史</h3>
      <ul>
        <li v-for="(item, index) in history" :key="index">
          {{ item }}
        </li>
      </ul>
      <p v-if="history.length === 0">暂无操作记录</p>
    </div>
  </div>
</template>

<style scoped>
.counter-container {
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.display {
  background: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  text-align: center;
}

.count {
  font-size: 32px;
  font-weight: bold;
  color: #35495e;
  margin: 0;
}

.double {
  font-size: 18px;
  color: #666;
}

.message {
  font-size: 14px;
  color: #666;
  margin-top: 10px;
}

.message.positive {
  color: #42b883;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  transition: background 0.3s;
}

button:hover:not(:disabled) {
  background: #35495e;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.history {
  background: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
}

.history h3 {
  margin-top: 0;
  color: #35495e;
}

.history ul {
  list-style: none;
  padding: 0;
  max-height: 200px;
  overflow-y: auto;
}

.history li {
  padding: 5px;
  border-bottom: 1px solid #eee;
  font-family: monospace;
  font-size: 12px;
}
</style>
```

---

## 常见错误

### 错误 1：忘记使用 .value

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)

// ❌ 错误
const increment = () => {
  count++  // 这会把 count 从 ref 对象变成数字 1
}

// ✅ 正确
const increment = () => {
  count.value++  // 这样才会更新 ref 内部的值
}
</script>
```

### 错误 2：解构 reactive 对象

```vue
<script setup>
import { reactive } from 'vue'

const user = reactive({ name: '张三', age: 25 })

// ❌ 错误 - 失去响应性
const { name, age } = user

// ✅ 正确 - 保持响应性
const userName = user.name
// 或者使用 toRefs
import { toRefs } from 'vue'
const { name, age } = toRefs(user)
// 现在需要使用 name.value
</script>
```

### 错误 3：在模板中使用未定义的变量

```vue
<script setup>
const message = 'Hello'
// count 没有定义
</script>

<template>
  <!-- ❌ 错误 - count 未定义 -->
  <p>{{ count }}</p>
  
  <!-- ✅ 正确 -->
  <p>{{ message }}</p>
</template>
```

---

## 练习题

### 基础练习

创建一个简易计算器：
1. 使用 `ref` 定义两个数字和一个运算符
2. 定义加、减、乘、除四个运算方法
3. 实现一个 `calculate` 方法，根据运算符执行对应计算
4. 实现一个 `reset` 方法清空所有数据

### 进阶练习

创建一个 Todo List 管理器：
1. 使用 `ref` 存储任务列表（每个任务包含 id、text、completed）
2. 使用 `computed` 计算已完成任务数和未完成任务数
3. 使用 `watch` 监听任务列表变化，自动保存到 localStorage
4. 实现添加任务、删除任务、标记完成/未完成的方法
5. 实现 `clearCompleted` 方法删除所有已完成任务

### 挑战练习

创建一个购物车系统：
1. 定义 `products` 数组（商品列表）和 `cart` 数组（购物车）
2. 使用 `computed` 计算购物车总价和商品数量
3. 实现 `addToCart(product)` 方法添加商品到购物车
4. 实现 `removeFromCart(productId)` 方法移除商品
5. 实现 `updateQuantity(productId, quantity)` 修改商品数量
6. 实现 `checkout()` 结算方法（清空购物车并显示总价）
7. 使用 `watch` 监听购物车变化，自动计算折扣（满100减20，满200减50）

---

## 学习目标检查清单

- [ ] 理解 `<script setup>` 的基本结构
- [ ] 掌握使用 `ref` 创建响应式数据
- [ ] 理解在 script 中使用 `.value` 访问 ref
- [ ] 掌握组件方法的定义和调用
- [ ] 理解自动暴露机制（无需 return）
- [ ] 了解计算属性 `computed` 的基本用法
- [ ] 了解侦听器 `watch` 的基本用法
- [ ] 了解生命周期钩子 `onMounted` 的基本用法
- [ ] 能够独立编写简单的 `<script setup>` 组件

---

## 延伸阅读

- [Vue 官方文档 - <script setup>](https://cn.vuejs.org/api/sfc-script-setup.html)
- [Vue 官方文档 - 响应式基础](https://cn.vuejs.org/guide/essentials/reactivity-fundamentals.html)
- [Vue 官方文档 - 计算属性](https://cn.vuejs.org/guide/essentials/computed.html)

---

## 下一步

完成本章学习后，进入 [第 4 章：计算属性](../04-chapter-4/README.md)，深入学习 computed 的使用。
