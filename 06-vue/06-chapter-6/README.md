# ref 与 reactive

## 本章目的

深入理解 Vue 3 响应式系统的两个核心 API：`ref` 和 `reactive`，掌握它们的使用场景和区别。

---

## 学习目标

1. 深入理解 `ref` 的工作原理
2. 深入理解 `reactive` 的工作原理  
3. 掌握两者之间的区别和选择建议
4. 了解响应式丢失的情况和解决方案

---

## 核心概念讲解

### 什么是响应式数据？

响应式数据是指当数据发生变化时，Vue 会自动更新使用这些数据的视图。

**比喻：自动感应门**

想象商场的自动感应门：
- 当有人靠近（数据变化），门自动打开（视图更新）
- 你不需要手动去开门，系统会自动感知并做出反应

---

### 1. ref - 响应式引用

`ref` 可以接受任何类型的值（基本类型或对象），并返回一个响应式引用。

#### 基本用法

```vue
<script setup lang="ts">
import { ref } from 'vue'

// 基本类型
const count = ref(0)
const message = ref('Hello')
const isActive = ref(false)

// 对象
const user = ref({
  name: '张三',
  age: 25
})

// 在 script 中访问需要使用 .value
console.log(count.value)  // 0
console.log(user.value.name)  // '张三'

// 修改值
const increment = () => {
  count.value++
}

const updateUser = () => {
  user.value.age++
}
</script>

<template>
  <div>
    <!-- 在 template 中直接使用，不需要 .value -->
    <p>Count: {{ count }}</p>
    <p>User: {{ user.name }} ({{ user.age }}岁)</p>
    <button @click="increment">增加</button>
    <button @click="updateUser">用户年龄+1</button>
  </div>
</template>
```

#### 为什么需要 `.value`？

JavaScript 中，基本类型（数字、字符串、布尔值）是按值传递的。Vue 需要创建一个对象来包裹基本类型，才能实现响应式。`.value` 就是这个包裹对象的属性。

```javascript
// ref 返回的对象大概长这样
{
  value: 0,           // 实际的值
  __v_isRef: true     // 标记这是一个 ref
}
```

---

### 2. reactive - 响应式代理

`reactive` 只接受对象类型（对象、数组、Map、Set 等），返回一个响应式代理。

#### 基本用法

```vue
<script setup lang="ts">
import { reactive } from 'vue'

// 对象
const user = reactive({
  name: '张三',
  age: 25,
  address: {
    city: '北京',
    street: '长安街'
  }
})

// 数组
const todos = reactive([
  { id: 1, text: '学习 Vue', done: false },
  { id: 2, text: '练习代码', done: false }
])

// 直接访问，不需要 .value
console.log(user.name)  // '张三'
console.log(user.address.city)  // '北京'

// 直接修改
const updateCity = () => {
  user.address.city = '上海'
}

// 数组操作
const addTodo = () => {
  todos.push({ 
    id: todos.length + 1, 
    text: '新任务', 
    done: false 
  })
}
</script>
```

---

### 3. ref vs reactive 对比

| 特性 | ref | reactive |
|------|-----|----------|
| **适用类型** | 任何类型 | 仅对象类型 |
| **访问方式** | 需要 `.value` | 直接访问 |
| **替换整个对象** | 可以直接替换 | 会失去响应性 |
| **解构/展开** | 保持响应性（配合toRefs） | 失去响应性 |
| **TypeScript支持** | 更好（类型推断） | 良好 |

#### 示例对比

```vue
<script setup lang="ts">
import { ref, reactive } from 'vue'

// ===== ref 示例 =====
const count = ref(0)
const userRef = ref({ name: '张三', age: 25 })

// 访问
console.log(count.value)        // 0
console.log(userRef.value.name) // '张三'

// 修改属性
userRef.value.age = 26          // ✅ 响应式

// 替换整个对象
userRef.value = { name: '李四', age: 30 }  // ✅ 保持响应式

// ===== reactive 示例 =====
const userReactive = reactive({ name: '张三', age: 25 })

// 访问
console.log(userReactive.name)  // '张三'

// 修改属性
userReactive.age = 26           // ✅ 响应式

// 替换整个对象（错误示例）
userReactive = { name: '李四', age: 30 }   // ❌ 错误！会失去响应性

// 正确的替换方式
Object.assign(userReactive, { name: '李四', age: 30 })  // ✅ 正确
</script>
```

---

### 4. 选择建议

#### 推荐使用 ref 的场景：

1. **基本类型数据**（数字、字符串、布尔值）
2. **需要替换整个对象的场景**
3. **从组合式函数返回数据时**
4. **统一代码风格**（推荐）

```vue
<script setup lang="ts">
import { ref } from 'vue'

// ✅ 推荐：统一使用 ref
const count = ref(0)
const message = ref('Hello')
const user = ref({ name: '张三', age: 25 })
const items = ref(['a', 'b', 'c'])
</script>
```

#### 可以使用 reactive 的场景：

1. **复杂的表单数据对象**
2. **包含多个相关属性的状态对象**
3. **不需要替换整个对象的场景**

```vue
<script setup lang="ts">
import { reactive } from 'vue'

// 复杂表单对象
const form = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

// 状态对象
const state = reactive({
  isLoading: false,
  error: null as string | null,
  data: [] as any[]
})
</script>
```

---

### 5. 响应式丢失的情况

#### 情况 1：解构 reactive 对象

```vue
<script setup lang="ts">
import { reactive } from 'vue'

const user = reactive({ name: '张三', age: 25 })

// ❌ 错误 - 解构会失去响应性
const { name, age } = user
name = '李四'  // 不会触发更新！

// ✅ 解决方案 1：使用 toRefs
import { toRefs } from 'vue'
const { name, age } = toRefs(user)
name.value = '李四'  // 需要使用 .value

// ✅ 解决方案 2：保持原对象引用
const userName = user.name  // 使用时直接访问
</script>
```

#### 情况 2：替换 reactive 对象

```vue
<script setup lang="ts">
import { reactive } from 'vue'

const user = reactive({ name: '张三' })

// ❌ 错误 - 直接赋值会失去响应性
user = { name: '李四' }

// ✅ 解决方案 1：使用 Object.assign
Object.assign(user, { name: '李四' })

// ✅ 解决方案 2：使用 ref
const userRef = ref({ name: '张三' })
userRef.value = { name: '李四' }  // 可以替换
</script>
```

---

## 完整示例

### 使用 ref 的购物车

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

interface Product {
  id: number
  name: string
  price: number
  quantity: number
}

const cart = ref<Product[]>([
  { id: 1, name: '苹果', price: 5, quantity: 3 },
  { id: 2, name: '香蕉', price: 3, quantity: 5 }
])

const total = computed(() => {
  return cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
})

const updateQuantity = (id: number, delta: number) => {
  const item = cart.value.find(item => item.id === id)
  if (item) {
    item.quantity += delta
    if (item.quantity <= 0) {
      // 从购物车移除
      cart.value = cart.value.filter(item => item.id !== id)
    }
  }
}

const addProduct = () => {
  cart.value.push({
    id: Date.now(),
    name: '橙子',
    price: 4,
    quantity: 1
  })
}
</script>

<template>
  <div class="cart">
    <h2>购物车（使用 ref）</h2>
    <ul>
      <li v-for="item in cart" :key="item.id">
        {{ item.name }} - ¥{{ item.price }} 
        <button @click="updateQuantity(item.id, -1)">-</button>
        {{ item.quantity }}
        <button @click="updateQuantity(item.id, 1)">+</button>
      </li>
    </ul>
    <p>总价: ¥{{ total }}</p>
    <button @click="addProduct">添加商品</button>
  </div>
</template>
```

### 使用 reactive 的表单

```vue
<script setup lang="ts">
import { reactive } from 'vue'

interface FormData {
  username: string
  email: string
  password: string
  agreeTerms: boolean
}

const form = reactive<FormData>({
  username: '',
  email: '',
  password: '',
  agreeTerms: false
})

const errors = reactive({
  username: '',
  email: '',
  password: ''
})

const validate = () => {
  errors.username = form.username.length < 3 ? '用户名至少3个字符' : ''
  errors.email = !form.email.includes('@') ? '邮箱格式不正确' : ''
  errors.password = form.password.length < 6 ? '密码至少6个字符' : ''
}

const submitForm = () => {
  validate()
  if (!errors.username && !errors.email && !errors.password) {
    console.log('提交表单:', form)
  }
}
</script>

<template>
  <form @submit.prevent="submitForm">
    <div>
      <input v-model="form.username" placeholder="用户名">
      <span v-if="errors.username">{{ errors.username }}</span>
    </div>
    <div>
      <input v-model="form.email" placeholder="邮箱">
      <span v-if="errors.email">{{ errors.email }}</span>
    </div>
    <div>
      <input v-model="form.password" type="password" placeholder="密码">
      <span v-if="errors.password">{{ errors.password }}</span>
    </div>
    <label>
      <input v-model="form.agreeTerms" type="checkbox">
      同意条款
    </label>
    <button type="submit" :disabled="!form.agreeTerms">提交</button>
  </form>
</template>
```

---

## 练习题

### 基础练习

创建一个用户信息管理器：
1. 使用 `ref` 创建用户基本信息（id, name）
2. 使用 `reactive` 创建用户详细信息对象（address, phone, email）
3. 实现更新功能，观察两种方式的差异

### 进阶练习

创建一个 Todo List：
1. 使用 `ref` 管理任务列表
2. 实现添加、删除、标记完成功能
3. 尝试将列表改为 `reactive`，观察差异
4. 实现过滤功能（全部/未完成/已完成）

### 挑战练习

创建一个表单验证系统：
1. 使用 `reactive` 创建表单数据对象
2. 使用 `ref` 创建错误信息
3. 实现各种验证规则
4. 处理响应式丢失的问题

---

## 学习目标检查清单

- [ ] 理解 `ref` 的工作原理和使用方法
- [ ] 理解 `reactive` 的工作原理和使用方法
- [ ] 掌握 `.value` 的使用时机
- [ ] 了解 ref 和 reactive 的区别
- [ ] 知道何时选择 ref 或 reactive
- [ ] 了解响应式丢失的情况和解决方案

---

## 延伸阅读

- [Vue 官方文档 - 响应式基础](https://cn.vuejs.org/guide/essentials/reactivity-fundamentals.html)
- [Vue 官方文档 - ref](https://cn.vuejs.org/api/reactivity-core.html#ref)
- [Vue 官方文档 - reactive](https://cn.vuejs.org/api/reactivity-core.html#reactive)

---

## 下一步

完成本章学习后，进入 [第 7 章：条件渲染](../07-chapter-7/README.md)，学习 v-if 和 v-show 的使用。
