# 事件处理与表单绑定

## 本章目的

掌握 Vue 的事件处理和表单绑定机制。

---

## 核心概念

### 事件处理

```vue
<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
const message = ref('')

const increment = () => count.value++
const handleClick = (event: MouseEvent) => {
  console.log('点击位置:', event.clientX, event.clientY)
}
const handleKeyup = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    console.log('按下了回车')
  }
}
</script>

<template>
  <div>
    <!-- 基本事件绑定 -->
    <button @click="increment">+1</button>
    
    <!-- 内联事件 -->
    <button @click="count--">-1</button>
    
    <!-- 事件对象 -->
    <button @click="handleClick">获取点击位置</button>
    
    <!-- 事件修饰符 -->
    <form @submit.prevent="submitForm">
      <input @keyup.enter="handleKeyup" v-model="message">
    </form>
  </div>
</template>
```

### 事件修饰符

| 修饰符 | 作用 |
|--------|------|
| `.stop` | 阻止冒泡 |
| `.prevent` | 阻止默认行为 |
| `.capture` | 使用捕获模式 |
| `.self` | 只当事件从元素本身触发时才触发 |
| `.once` | 只触发一次 |
| `.passive` | 不阻止默认行为（提升滚动性能） |

### 表单绑定（v-model）

```vue
<script setup lang="ts">
import { ref } from 'vue'

const text = ref('')
const checked = ref(false)
const selected = ref('')
const multiSelected = ref([])
</script>

<template>
  <div>
    <!-- 文本输入 -->
    <input v-model="text" placeholder="输入文本">
    
    <!-- 多行文本 -->
    <textarea v-model="text"></textarea>
    
    <!-- 复选框 -->
    <input type="checkbox" v-model="checked">
    
    <!-- 单选 -->
    <select v-model="selected">
      <option value="a">选项A</option>
      <option value="b">选项B</option>
    </select>
    
    <!-- 多选 -->
    <select v-model="multiSelected" multiple>
      <option value="1">1</option>
      <option value="2">2</option>
    </select>
  </div>
</template>
```

### v-model 修饰符

| 修饰符 | 作用 |
|--------|------|
| `.lazy` | 失去焦点后更新 |
| `.number` | 自动转换为数字 |
| `.trim` | 去除首尾空格 |

---

## 练习题

1. 创建表单验证组件
2. 实现搜索框（带防抖）
3. 创建多步骤表单

---

## 下一步

进入 [第 10 章：class 与 style 绑定](../10-chapter-10/README.md)
