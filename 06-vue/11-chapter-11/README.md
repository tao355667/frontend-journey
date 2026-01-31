# 组件基础

## 本章目的

掌握 Vue 组件的基本概念，学会创建、注册和使用组件，理解组件的 props、emits 和插槽等核心概念。

---

## 内容概述

- 组件的概念与优势
- 定义和注册组件
- 组件的 props
- 组件的 emits（事件）
- 插槽（Slots）基础
- 动态组件
- 组件的生命周期

---

## 核心概念讲解

### 什么是组件？

组件是 Vue 中可复用的 UI 单元，可以封装自己的模板、逻辑和样式。就像乐高积木，可以组合构建复杂的应用。

#### 类比理解

想象你在组装一台电脑：
- **CPU**、**内存**、**硬盘** 都是独立的组件
- 每个组件有自己的功能，但可以组装在一起工作
- 相同的组件可以用在不同的电脑配置中

### 为什么使用组件？

1. **代码复用**：一次编写，到处使用
2. **职责分离**：每个组件只负责一个功能
3. **易于维护**：修改一个组件不影响其他部分
4. **团队协作**：不同开发者可以同时开发不同组件

### 定义组件

#### 单文件组件（SFC）

```vue
<!-- MyButton.vue -->
<template>
  <button class="my-button" @click="handleClick">
    <slot>默认文字</slot>
  </button>
</template>

<script setup>
const emit = defineEmits(['click'])

const handleClick = () => {
  emit('click')
}
</script>

<style scoped>
.my-button {
  padding: 10px 20px;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
}
</style>
```

#### 选项式 API

```vue
<template>
  <button @click="$emit('click')">
    <slot>默认文字</slot>
  </button>
</template>

<script>
export default {
  name: 'MyButton',
  emits: ['click']
}
</script>
```

### 注册组件

#### 全局注册

```javascript
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import MyButton from './components/MyButton.vue'

const app = createApp(App)

// 全局注册
app.component('MyButton', MyButton)
// 或使用链式调用
app.component('ComponentA', ComponentA)
   .component('ComponentB', ComponentB)

app.mount('#app')
```

#### 局部注册

```vue
<template>
  <MyButton @click="handleClick">点击我</MyButton>
</template>

<script setup>
import MyButton from './components/MyButton.vue'

const handleClick = () => {
  console.log('按钮被点击')
}
</script>
```

### Props（组件属性）

Props 是父组件向子组件传递数据的机制。

#### 基础用法

```vue
<!-- Child.vue -->
<template>
  <div class="user-card">
    <h3>{{ name }}</h3>
    <p>年龄: {{ age }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  name: String,
  age: {
    type: Number,
    default: 18
  }
})
</script>
```

```vue
<!-- Parent.vue -->
<template>
  <UserCard name="张三" :age="25" />
</template>
```

#### Props 验证

```javascript
defineProps({
  // 基础类型检查
  propA: Number,
  
  // 多个可能的类型
  propB: [String, Number],
  
  // 必填字符串
  propC: {
    type: String,
    required: true
  },
  
  // 带默认值的对象
  propD: {
    type: Object,
    default() {
      return { message: 'hello' }
    }
  },
  
  // 自定义验证函数
  propE: {
    validator(value) {
      return ['success', 'warning', 'danger'].includes(value)
    }
  }
})
```

### Emits（组件事件）

Emits 是子组件向父组件传递消息的机制。

#### 声明 emits

```vue
<template>
  <button @click="handleClick">提交</button>
</template>

<script setup>
const emit = defineEmits(['submit', 'cancel'])

const handleClick = () => {
  emit('submit', { id: 1, name: '张三' })
}
</script>
```

#### 监听事件

```vue
<template>
  <ChildComponent 
    @submit="handleSubmit" 
    @cancel="handleCancel" 
  />
</template>

<script setup>
const handleSubmit = (data) => {
  console.log('收到提交:', data)
}

const handleCancel = () => {
  console.log('操作取消')
}
</script>
```

### 插槽（Slots）

插槽用于在组件中预留内容位置，让父组件可以填充自定义内容。

#### 默认插槽

```vue
<!-- Card.vue -->
<template>
  <div class="card">
    <div class="card-header">
      <slot name="header">默认标题</slot>
    </div>
    <div class="card-body">
      <slot>默认内容</slot>
    </div>
    <div class="card-footer">
      <slot name="footer">默认底部</slot>
    </div>
  </div>
</template>
```

```vue
<!-- 使用 Card 组件 -->
<Card>
  <template #header>
    <h2>自定义标题</h2>
  </template>
  
  <p>这是自定义内容</p>
  
  <template #footer>
    <button>了解更多</button>
  </template>
</Card>
```

#### 具名插槽简写

`v-slot:header` 可以简写为 `#header`

### 动态组件

使用 `<component>` 元素配合 `is` 属性动态切换组件：

```vue
<template>
  <div>
    <button @click="currentTab = 'TabA'">Tab A</button>
    <button @click="currentTab = 'TabB'">Tab B</button>
    
    <component :is="currentComponent" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import TabA from './TabA.vue'
import TabB from './TabB.vue'

const currentTab = ref('TabA')

const currentComponent = computed(() => {
  return currentTab.value === 'TabA' ? TabA : TabB
})
</script>
```

---

## 代码示例说明

### JavaScript 版本

文件：`src/js/component-basics.html`

一个完整的组件示例，展示按钮组件、卡片组件、列表组件的定义和使用。

### TypeScript 版本

文件：`src/ts/component-basics.html`

功能与 JS 版本相同，添加了组件 props 和 emits 的类型定义。

---

## JS 与 TS 对比

| 方面 | JavaScript | TypeScript |
|------|-----------|------------|
| **Props 类型** | 运行时验证 | 编译时类型检查 |
| **Emits 定义** | 字符串数组 | 类型安全的 emits |
| **IDE 支持** | 基础 | 完整的组件属性提示 |

### 示例对比

**JavaScript：**
```javascript
defineProps({
  title: String,
  count: Number
})

defineEmits(['update', 'delete'])
```

**TypeScript：**
```typescript
interface Props {
  title: string
  count?: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  update: [id: number, value: string]
  delete: [id: number]
}>()
```

---

## 最佳实践

### ✅ 推荐做法

1. **组件名使用大驼峰命名**：`MyComponent.vue`
2. **Props 使用 camelCase**：`myProp`，模板中使用 `kebab-case`：`my-prop`
3. **始终声明 emits**：明确组件的接口
4. **使用单文件组件**：模板、脚本、样式分离
5. **组件粒度适中**：不要太小（过度拆分）也不要太大（职责不清）

```vue
<!-- 推荐：清晰的组件结构 -->
<template>
  <div class="product-card">
    <img :src="imageUrl" :alt="productName">
    <h3>{{ productName }}</h3>
    <p class="price">¥{{ price }}</p>
    <button @click="addToCart">加入购物车</button>
  </div>
</template>

<script setup>
defineProps({
  productName: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String,
    default: '/default-image.jpg'
  }
})

const emit = defineEmits(['add-to-cart'])

const addToCart = () => {
  emit('add-to-cart')
}
</script>
```

### ❌ 应避免的做法

1. **不要在子组件中修改 props**：props 是只读的
2. **不要过度使用全局注册**：优先使用局部注册
3. **不要忽视组件命名冲突**：使用前缀或命名空间
4. **不要创建过大的组件**：超过 200 行考虑拆分

---

## 练习题

### 基础练习

创建一个按钮组件系统：
1. 基础按钮组件（支持 type: primary/danger/warning）
2. 支持 size: small/medium/large
3. 支持 disabled 状态
4. 支持点击事件
5. 支持默认插槽自定义文字

### 进阶练习

创建一个卡片组件库：
1. Card 组件（支持 header、footer 插槽）
2. CardList 组件（接收 items 数组，循环渲染 Card）
3. Card 支持点击事件，传递 item 数据
4. 实现 loading 状态
5. 实现空状态显示

### 挑战练习

创建一个表单组件库：
1. Form 组件（管理表单状态）
2. FormItem 组件（标签、验证、错误显示）
3. 各种输入组件：Input、Select、Checkbox、Radio
4. 实现表单验证系统
5. 实现表单提交和重置
6. 支持动态表单字段

---

## 学习目标检查清单

- [ ] 理解组件的概念和优势
- [ ] 掌握组件的注册方式（全局/局部）
- [ ] 掌握 props 的定义和使用
- [ ] 掌握 props 验证
- [ ] 掌握 emits 的声明和触发
- [ ] 理解插槽的概念和使用
- [ ] 掌握具名插槽
- [ ] 了解动态组件的使用
- [ ] 理解组件生命周期

---

## 练习题答案

详见 `practice-solution.html` 文件。

---

## 下一步

完成本章学习后，进入 [第 12 章：组件通信](../12-chapter-12/README.md)，深入学习组件间的数据传递和通信方式。
