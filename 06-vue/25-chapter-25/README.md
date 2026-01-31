# 第二十五章：script setup 语法糖

## 学习目标
1. 理解 `<script setup>` 语法糖的由来和优势
2. 掌握简化后的组合式 API 写法
3. 了解语法转换和注意事项
4. 学会从传统 setup() 迁移到新语法

## 概念讲解

### 什么是 `<script setup>`？

`<script setup>` 是 Vue 3.2 引入的编译时语法糖，用于简化组合式 API 的使用。它让代码更加简洁，减少样板代码。

**比喻：快捷键**

想象你在使用办公软件：
- **传统方式**：点击菜单 → 选择功能 → 确认（setup() 函数）
- **快捷键**：直接按组合键立即执行（`<script setup>`）

两者完成同样的工作，但后者更快速、更简洁。

### 对比：传统 vs 语法糖

**传统 setup() 写法：**

```vue
<script>
import { ref, computed } from 'vue'

export default {
  setup() {
    const count = ref(0)
    
    const double = computed(() => count.value * 2)
    
    const increment = () => {
      count.value++
    }
    
    return {
      count,
      double,
      increment
    }
  }
}
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>Double: {{ double }}</p>
    <button @click="increment">+1</button>
  </div>
</template>
```

**`<script setup>` 写法：**

```vue
<script setup>
import { ref, computed } from 'vue'

const count = ref(0)

const double = computed(() => count.value * 2)

const increment = () => {
  count.value++
}
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>Double: {{ double }}</p>
    <button @click="increment">+1</button>
  </div>
</template>
```

**代码量减少约 40%，而且更直观！**

### `<script setup>` 的特点

1. **自动暴露**：顶层的变量、函数自动暴露给模板使用，无需 return
2. **自动导入组件**：无需 components 选项，直接导入即可使用
3. **更好的 TypeScript 支持**：类型推断更友好
4. **更少的样板代码**：专注于业务逻辑

### 响应式数据

```vue
<script setup>
import { ref, reactive, computed } from 'vue'

// ref
const count = ref(0)
const message = ref('Hello')

// reactive
const user = reactive({
  name: '张三',
  age: 25
})

// computed
const fullName = computed(() => {
  return `${user.name} (${user.age}岁)`
})

// 方法
const updateUser = () => {
  user.age++
}
</script>
```

### 导入和使用组件

```vue
<script setup>
// 直接导入，无需注册
import MyComponent from './MyComponent.vue'
import AnotherComponent from './AnotherComponent.vue'

// 也可以使用动态导入
const AsyncComponent = defineAsyncComponent(() =>
  import('./AsyncComponent.vue')
)
</script>

<template>
  <my-component />
  <another-component />
  <async-component />
</template>
```

### 生命周期钩子

```vue
<script setup>
import { 
  onMounted, 
  onUnmounted, 
  onUpdated 
} from 'vue'

onMounted(() => {
  console.log('组件已挂载')
})

onUpdated(() => {
  console.log('组件已更新')
})

onUnmounted(() => {
  console.log('组件已卸载')
})
</script>
```

### Props 和 Emits

**定义 Props：**

```vue
<script setup>
// 使用 defineProps 宏定义 props
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    default: 0
  }
})

// 访问 props
console.log(props.title)
</script>
```

**定义 Emits：**

```vue
<script setup>
// 使用 defineEmits 宏定义 emits
const emit = defineEmits(['update', 'delete'])

const handleClick = () => {
  emit('update', '新数据')
}
</script>
```

**TypeScript 版本：**

```vue
<script setup lang="ts">
// Props 类型定义
interface Props {
  title: string
  count?: number
}

const props = withDefaults(defineProps<Props>(), {
  count: 0
})

// Emits 类型定义
const emit = defineEmits<{
  update: [value: string]
  delete: [id: number]
}>()
</script>
```

### 宏函数

`<script setup>` 提供了几个编译器宏（无需导入）：

1. **defineProps** - 定义 props
2. **defineEmits** - 定义 emits
3. **defineExpose** - 暴露给父组件的属性和方法
4. **defineOptions** - 定义组件选项（如 name）
5. **defineModel** - 定义 v-model（Vue 3.4+）
6. **defineSlots** - 定义插槽（TypeScript）

```vue
<script setup>
// 定义组件名称
defineOptions({
  name: 'MyComponent'
})

// 暴露给父组件
const count = ref(0)
const increment = () => count.value++

defineExpose({
  count,
  increment
})
</script>
```

### v-model 的双向绑定（Vue 3.4+）

```vue
<!-- 父组件 -->
<script setup>
import { ref } from 'vue'
import Child from './Child.vue'

const message = ref('Hello')
</script>

<template>
  <child v-model="message" />
</template>

<!-- 子组件 -->
<script setup>
const model = defineModel()

// 等同于：
// const props = defineProps(['modelValue'])
// const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <input v-model="model" />
</template>
```

## 代码示例

### 基础计数器

```vue
<script setup>
import { ref, computed } from 'vue'

const count = ref(0)
const double = computed(() => count.value * 2)

const increment = () => count.value++
const decrement = () => count.value--
const reset = () => count.value = 0
</script>

<template>
  <div style="padding: 20px;">
    <h2>计数器</h2>
    <p>当前值：{{ count }}</p>
    <p>双倍值：{{ double }}</p>
    <button @click="decrement">-1</button>
    <button @click="increment">+1</button>
    <button @click="reset">重置</button>
  </div>
</template>
```

### 待办事项列表

```vue
<script setup>
import { ref, computed } from 'vue'

const newTodo = ref('')
const todos = ref([
  { id: 1, text: '学习 Vue 3', done: false },
  { id: 2, text: '练习组合式 API', done: false }
])

let nextId = 3

const addTodo = () => {
  if (newTodo.value.trim()) {
    todos.value.push({
      id: nextId++,
      text: newTodo.value,
      done: false
    })
    newTodo.value = ''
  }
}

const removeTodo = (id) => {
  todos.value = todos.value.filter(todo => todo.id !== id)
}

const remaining = computed(() => {
  return todos.value.filter(todo => !todo.done).length
})
</script>

<template>
  <div style="padding: 20px;">
    <h2>待办事项</h2>
    <p>剩余：{{ remaining }} 项</p>
    
    <div>
      <input 
        v-model="newTodo" 
        @keyup.enter="addTodo"
        placeholder="添加新待办..."
      >
      <button @click="addTodo">添加</button>
    </div>
    
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <input type="checkbox" v-model="todo.done">
        <span :style="{ textDecoration: todo.done ? 'line-through' : 'none' }">
          {{ todo.text }}
        </span>
        <button @click="removeTodo(todo.id)">删除</button>
      </li>
    </ul>
  </div>
</template>
```

### 用户信息卡片（带 Props 和 Emits）

```vue
<script setup>
// 定义 props
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    default: 0
  },
  email: String
})

// 定义 emits
const emit = defineEmits(['edit', 'delete'])

const handleEdit = () => {
  emit('edit', { name: props.name, age: props.age })
}

const handleDelete = () => {
  emit('delete')
}
</script>

<template>
  <div style="border: 1px solid #ccc; padding: 15px; margin: 10px;">
    <h3>{{ name }}</h3>
    <p>年龄：{{ age }}</p>
    <p v-if="email">邮箱：{{ email }}</p>
    <button @click="handleEdit">编辑</button>
    <button @click="handleDelete">删除</button>
  </div>
</template>
```

### 完整的用户管理示例

```vue
<script setup>
import { ref, onMounted } from 'vue'
import UserCard from './UserCard.vue'

// 用户列表
const users = ref([])
const loading = ref(false)

// 获取用户数据
const fetchUsers = async () => {
  loading.value = true
  
  // 模拟 API 调用
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  users.value = [
    { id: 1, name: '张三', age: 25, email: 'zhang@example.com' },
    { id: 2, name: '李四', age: 30, email: 'li@example.com' },
    { id: 3, name: '王五', age: 28, email: 'wang@example.com' }
  ]
  
  loading.value = false
}

// 编辑用户
const handleEdit = (userData) => {
  console.log('编辑用户：', userData)
  alert(`编辑用户：${userData.name}`)
}

// 删除用户
const handleDelete = (userId) => {
  users.value = users.value.filter(user => user.id !== userId)
}

onMounted(() => {
  fetchUsers()
})
</script>

<template>
  <div style="padding: 20px;">
    <h2>用户管理系统</h2>
    
    <p v-if="loading">加载中...</p>
    
    <div v-else>
      <user-card
        v-for="user in users"
        :key="user.id"
        :name="user.name"
        :age="user.age"
        :email="user.email"
        @edit="handleEdit"
        @delete="handleDelete(user.id)"
      />
    </div>
    
    <button @click="fetchUsers" :disabled="loading">
      刷新数据
    </button>
  </div>
</template>
```

## 从 setup() 迁移到 <script setup>

### 迁移检查清单

1. **将 `<script>` 改为 `<script setup>`**
2. **删除 export default 和 setup() 函数**
3. **删除 return 语句**（顶层变量自动暴露）
4. **将组件导入后直接用在模板中**（无需 components 选项）
5. **使用 defineProps 替代 props 选项**
6. **使用 defineEmits 替代 emits 选项**
7. **使用顶层 await 替代 async setup()**

### 迁移示例

**迁移前：**

```vue
<script>
import { ref, computed, onMounted } from 'vue'
import Child from './Child.vue'

export default {
  components: { Child },
  props: {
    title: String
  },
  emits: ['update'],
  setup(props, { emit }) {
    const count = ref(0)
    const double = computed(() => count.value * 2)
    
    onMounted(() => {
      console.log(props.title)
    })
    
    const handleClick = () => {
      emit('update', count.value)
    }
    
    return {
      count,
      double,
      handleClick
    }
  }
}
</script>
```

**迁移后：**

```vue
<script setup>
import { ref, computed, onMounted } from 'vue'
import Child from './Child.vue'

const props = defineProps({
  title: String
})

const emit = defineEmits(['update'])

const count = ref(0)
const double = computed(() => count.value * 2)

onMounted(() => {
  console.log(props.title)
})

const handleClick = () => {
  emit('update', count.value)
}
</script>
```

## 注意事项

### 1. 顶层 await

```vue
<script setup>
// 可以使用顶层 await
const data = await fetchData()

// 这会让组件变成异步组件，父组件需要用 Suspense 包裹
</script>
```

### 2. 变量命名冲突

```vue
<script setup>
import { ref } from 'vue'

// 避免与内置名称冲突
const count = ref(0)  // 好的
// const defineProps = ref(0)  // 错误！defineProps 是保留字
</script>
```

### 3. 访问父组件

```vue
<script setup>
// 可以使用 useAttrs 和 useSlots
import { useAttrs, useSlots } from 'vue'

const attrs = useAttrs()
const slots = useSlots()
</script>
```

## 最佳实践

1. **新项目首选**：所有新项目都使用 `<script setup>`
2. **组合式函数**：将逻辑抽取为 `useXxx` 函数，提高复用性
3. **类型安全**：使用 TypeScript 增强类型检查
4. **命名规范**：组件使用 PascalCase，变量使用 camelCase

## 练习题

### 练习 1：基础练习
将以下传统 setup() 代码改写为 `<script setup>` 语法：

```vue
<script>
import { ref, computed } from 'vue'

export default {
  setup() {
    const firstName = ref('张')
    const lastName = ref('三')
    
    const fullName = computed(() => {
      return firstName.value + lastName.value
    })
    
    const updateName = (newFirst, newLast) => {
      firstName.value = newFirst
      lastName.value = newLast
    }
    
    return {
      firstName,
      lastName,
      fullName,
      updateName
    }
  }
}
</script>
```

要求：
- 使用 `<script setup>` 语法
- 添加模板展示姓名和修改按钮

### 练习 2：进阶练习
创建一个商品列表组件，使用 `<script setup>`：
- 使用 `defineProps` 定义商品列表 prop
- 使用 `defineEmits` 定义选择商品事件
- 显示商品列表（名称、价格、库存）
- 提供筛选功能（按价格区间、按库存状态）
- 点击商品触发选择事件
- 添加加载状态

### 练习 3：综合练习
创建一个完整的表单组件，使用 `<script setup>`：
- 使用 `defineModel`（或传统的 v-model）实现双向绑定
- 表单字段：用户名、邮箱、年龄、简介
- 实现验证功能：
  - 用户名必填，至少 2 个字符
  - 邮箱必填，格式正确
  - 年龄必填，必须是数字，18-100 之间
  - 简介可选，最多 200 字
- 显示验证错误信息
- 提供提交按钮，仅在验证通过时可用
- 提交时触发事件，传递表单数据
- 添加重置按钮

---

完成练习后，可以查看 `practice-solution.html` 中的参考答案。
