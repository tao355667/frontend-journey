# 组件通信 (props, emit, v-model)

## 本章目的

深入理解 Vue 组件间的通信方式，掌握 props、emits、v-model 的高级用法，以及 provide/inject、事件总线等高级通信模式。

---

## 内容概述

- Props 深入（单向数据流、类型检查）
- Emits 深入（事件参数、类型定义）
- v-model 在组件上的使用
- 多个 v-model
- Provide / Inject（依赖注入）
- 组件引用（ref 访问组件实例）
- 跨层级通信策略

---

## 核心概念讲解

### 组件通信概览

组件通信就像公司内部的沟通方式：

| 通信方式 | 类比 | 适用场景 |
|----------|------|----------|
| **Props/Emits** | 直属上下级汇报 | 父子组件 |
| **v-model** | 双向沟通协议 | 父子组件双向绑定 |
| **Provide/Inject** | 公司公告栏 | 跨多级组件 |
| **Ref** | 直接找某人 | 需要访问组件方法 |

### Props 深入

#### 单向数据流

Props 是单向数据流：父组件的数据变化会流向子组件，但子组件不能直接修改 props。

```vue
<!-- 错误：直接修改 props -->
<script setup>
const props = defineProps(['count'])

const increment = () => {
  props.count++ // ❌ 警告！props 是只读的
}
</script>
```

#### 正确的做法：使用计算属性或本地数据

```vue
<!-- 方式 1：使用计算属性（展示用） -->
<script setup>
const props = defineProps(['firstName', 'lastName'])

const fullName = computed(() => {
  return `${props.firstName} ${props.lastName}`
})
</script>

<!-- 方式 2：使用本地数据（需要修改时） -->
<script setup>
const props = defineProps(['initialCount'])

const localCount = ref(props.initialCount)

const increment = () => {
  localCount.value++ // ✅ 正确：修改本地数据
}
</script>
```

### Emits 深入

#### 声明带类型的 Emits

```vue
<script setup lang="ts">
const emit = defineEmits<{
  // 无参数事件
  close: []
  
  // 单参数事件
  submit: [value: string]
  
  // 多参数事件
  update: [id: number, value: string]
  
  // 可选参数
  search: [query: string, page?: number]
}>()

const handleSubmit = () => {
  emit('submit', '表单数据')
}
</script>
```

#### 验证触发的事件

```javascript
defineEmits({
  submit: (payload) => {
    // 返回 false 表示验证失败
    if (payload.email && payload.password) {
      return true
    }
    console.warn('submit 事件需要 email 和 password')
    return false
  }
})
```

### 组件上的 v-model

v-model 是组件双向绑定的语法糖。

#### 基础用法

```vue
<!-- 子组件：CustomInput.vue -->
<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  >
</template>

<script setup>
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>
```

```vue
<!-- 父组件 -->
<template>
  <CustomInput v-model="message" />
  <p>输入的内容: {{ message }}</p>
</template>

<script setup>
const message = ref('')
</script>
```

#### v-model 的工作原理

```html
<!-- 等价关系 -->
<CustomInput v-model="message">

<!-- 等价于 -->
<CustomInput
  :modelValue="message"
  @update:modelValue="message = $event"
/>
```

#### 自定义 v-model 名称

```vue
<!-- 子组件 -->
<template>
  <input
    :value="title"
    @input="$emit('update:title', $event.target.value)"
  >
</template>

<script setup>
defineProps(['title'])
defineEmits(['update:title'])
</script>
```

```vue
<!-- 父组件 -->
<CustomInput v-model:title="pageTitle" />
```

#### 多个 v-model

```vue
<!-- 子组件 -->
<template>
  <input :value="firstName" @input="updateFirstName">
  <input :value="lastName" @input="updateLastName">
</template>

<script setup>
const props = defineProps(['firstName', 'lastName'])
const emit = defineEmits(['update:firstName', 'update:lastName'])

const updateFirstName = (e) => {
  emit('update:firstName', e.target.value)
}

const updateLastName = (e) => {
  emit('update:lastName', e.target.value)
}
</script>
```

```vue
<!-- 父组件 -->
<UserName
  v-model:first-name="first"
  v-model:last-name="last"
/>
```

### v-model 修饰符

子组件可以访问 v-model 的修饰符：

```vue
<!-- 子组件 -->
<template>
  <input 
    type="text"
    :value="modelValue"
    @input="emitValue"
  >
</template>

<script setup>
const props = defineProps({
  modelValue: String,
  modelModifiers: { default: () => ({}) }
})

const emit = defineEmits(['update:modelValue'])

const emitValue = (e) => {
  let value = e.target.value
  
  // 应用 .uppercase 修饰符
  if (props.modelModifiers.uppercase) {
    value = value.toUpperCase()
  }
  
  // 应用 .trim 修饰符
  if (props.modelModifiers.trim) {
    value = value.trim()
  }
  
  emit('update:modelValue', value)
}
</script>
```

```vue
<!-- 父组件 -->
<MyInput v-model.uppercase.trim="message" />
```

### Provide / Inject（依赖注入）

用于跨多级组件传递数据，不需要通过每一层的 props。

#### 基本用法

```vue
<!-- 祖先组件 -->
<script setup>
import { provide, ref } from 'vue'

const user = ref({
  name: '张三',
  role: 'admin'
})

// 提供数据
provide('user', user)

// 提供响应式数据
provide('theme', {
  color: ref('blue'),
  fontSize: ref('16px')
})
</script>
```

```vue
<!-- 后代组件（任意层级） -->
<script setup>
import { inject } from 'vue'

// 注入数据
const user = inject('user')

// 提供默认值
const theme = inject('theme', {
  color: ref('black'),
  fontSize: ref('14px')
})

console.log(user.value.name) // '张三'
console.log(theme.color.value) // 'blue'
</script>
```

#### 使用 Symbol 作为注入键

```javascript
// keys.js
export const UserKey = Symbol('user')
export const ThemeKey = Symbol('theme')
```

```vue
<!-- 提供 -->
<script setup>
import { provide } from 'vue'
import { UserKey } from './keys.js'

provide(UserKey, user)
</script>
```

```vue
<!-- 注入 -->
<script setup>
import { inject } from 'vue'
import { UserKey } from './keys.js'

const user = inject(UserKey)
</script>
```

### 组件引用（$ref / template ref）

#### 访问组件实例

```vue
<!-- 子组件：Child.vue -->
<script setup>
const publicMethod = () => {
  console.log('从父组件调用')
}

const publicData = ref('公开数据')

// 暴露给父组件
defineExpose({
  publicMethod,
  publicData
})
</script>
```

```vue
<!-- 父组件 -->
<template>
  <Child ref="childRef" />
  <button @click="callChildMethod">调用子组件方法</button>
</template>

<script setup>
import { ref } from 'vue'
import Child from './Child.vue'

const childRef = ref(null)

const callChildMethod = () => {
  // 访问子组件暴露的内容
  childRef.value.publicMethod()
  console.log(childRef.value.publicData)
}
</script>
```

---

## 代码示例说明

### JavaScript 版本

文件：`src/js/component-communication.html`

展示多种组件通信方式的完整示例，包括父子通信、跨层级通信等。

### TypeScript 版本

文件：`src/ts/component-communication.html`

功能与 JS 版本相同，添加了完整的类型定义。

---

## JS 与 TS 对比

| 方面 | JavaScript | TypeScript |
|------|-----------|------------|
| **Props 类型** | 运行时检查 | 完整的类型定义和检查 |
| **Emits 类型** | 字符串数组 | 类型安全的事件定义 |
| **Inject 类型** | 无类型 | 可以定义注入类型 |
| **Ref 访问** | 无类型提示 | 完整的组件方法和属性提示 |

### 示例对比

**JavaScript：**
```javascript
// 父组件不知道子组件暴露了哪些方法
const childRef = ref(null)
childRef.value?.someMethod?.() // 不确定是否存在
```

**TypeScript：**
```typescript
// 完整的类型定义
interface ChildMethods {
  publicMethod: () => void
  publicData: Ref<string>
}

const childRef = ref<ChildMethods | null>(null)
childRef.value?.publicMethod() // 有完整类型提示
```

---

## 最佳实践

### ✅ 推荐做法

1. **优先使用 props/emits**：父子通信的标准方式
2. **使用 v-model 简化双向绑定**：比手动传递 props + 事件更简洁
3. **使用 provide/inject 处理深层嵌套**：避免 props drilling
4. **使用 Symbol 作为注入键**：防止命名冲突
5. **明确暴露组件 API**：使用 defineExpose 声明公开接口

```vue
<!-- 推荐：清晰的组件通信 -->
<!-- 父组件 -->
<template>
  <SearchInput 
    v-model="searchQuery"
    v-model:loading="isLoading"
    @search="performSearch"
  />
</template>

<!-- 子组件 -->
<script setup>
const props = defineProps({
  modelValue: String,
  loading: Boolean
})

const emit = defineEmits([
  'update:modelValue',
  'update:loading',
  'search'
])
</script>
```

### ❌ 应避免的做法

1. **不要直接修改 props**：违反单向数据流
2. **不要滥用 provide/inject**：会让数据流向不清晰
3. **不要过度使用 ref 访问子组件**：破坏组件封装性
4. **不要使用全局状态处理局部通信**：增加不必要的耦合

---

## 练习题

### 基础练习

创建一个对话框组件：
1. 使用 v-model 控制显示/隐藏
2. 使用 props 传递标题和尺寸
3. 使用 emits 通知父组件关闭和确认
4. 使用插槽自定义内容
5. 点击遮罩层和按 ESC 关闭

### 进阶练习

创建一个表单组件系统：
1. Form 组件管理表单状态（provide）
2. FormItem 组件自动注册到 Form（inject）
3. 实现表单验证（异步验证支持）
4. 实现字段联动（一个字段变化影响其他字段）
5. 支持数组字段（动态增删表单项）

### 挑战练习

创建一个可拖拽的仪表板系统：
1. 多个小组件（Widget）可以拖拽排列
2. 使用 provide/inject 共享仪表板状态
3. 每个 Widget 通过 v-model 与数据绑定
4. 实现 Widget 间的数据联动
5. 支持保存/加载布局配置
6. 实现撤销/重做功能

---

## 学习目标检查清单

- [ ] 理解单向数据流的重要性
- [ ] 掌握 props 的深入用法（验证、默认值）
- [ ] 掌握 emits 的完整用法（类型定义、验证）
- [ ] 理解 v-model 在组件上的工作原理
- [ ] 掌握多个 v-model 的使用
- [ ] 理解 provide/inject 的使用场景
- [ ] 掌握组件引用的使用方法
- [ ] 能够选择合适的通信方式

---

## 练习题答案

详见 `practice-solution.html` 文件。

---

## 下一步

完成本章学习后，你已经掌握了 Vue 的基础知识。建议继续学习：
- Vue Router（路由管理）
- Pinia/Vuex（状态管理）
- Vue 组合式函数（Composables）
- Vue 测试

祝你学习愉快！
