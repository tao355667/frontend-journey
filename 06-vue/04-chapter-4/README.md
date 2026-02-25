# 计算属性 computed

## 本章目的

深入理解计算属性 `computed` 的工作原理，掌握如何在 `<script setup>` 中使用计算属性优化模板逻辑。

---

## 内容概述

- 什么是计算属性
- computed vs 普通函数
- 可读写的计算属性
- 计算属性的缓存特性
- 最佳实践

---

## 核心概念讲解

### 什么是计算属性？

计算属性是基于其他数据计算得出的值，它会根据依赖自动更新，并且具有缓存特性。

#### 类比理解

想象你在经营一家服装店：
- **普通数据**（ref）：库存中的商品数量
- **计算属性**：根据库存自动计算的库存总值（单价 × 数量）

当商品数量变化时，库存总值会自动更新。而且，如果库存没有变化，你不需要重新计算总值。

---

### 1. 基本用法

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

// 基础数据
const firstName = ref('张')
const lastName = ref('三')

// 计算属性
const fullName = computed(() => {
  return firstName.value + lastName.value
})

// 另一个例子
const price = ref(100)
const quantity = ref(2)
const discount = ref(0.9)

const total = computed(() => {
  return price.value * quantity.value * discount.value
})
</script>

<template>
  <div>
    <p>姓名: {{ fullName }}</p>
    <p>总价: ¥{{ total }}</p>
    
    <input v-model="firstName" placeholder="姓">
    <input v-model="lastName" placeholder="名">
    <input v-model.number="quantity" type="number" placeholder="数量">
  </div>
</template>
```

---

### 2. computed vs 普通方法

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

const firstName = ref('张')
const lastName = ref('三')

// 计算属性 - 有缓存
const fullNameComputed = computed(() => {
  console.log('计算属性执行')
  return firstName.value + lastName.value
})

// 普通方法 - 无缓存
const fullNameMethod = () => {
  console.log('普通方法执行')
  return firstName.value + lastName.value
}
</script>

<template>
  <div>
    <!-- 计算属性：依赖不变时，不会重新执行 -->
    <p>{{ fullNameComputed }}</p>
    <p>{{ fullNameComputed }}</p>
    <p>{{ fullNameComputed }}</p>
    
    <!-- 普通方法：每次调用都会执行 -->
    <p>{{ fullNameMethod() }}</p>
    <p>{{ fullNameMethod() }}</p>
    <p>{{ fullNameMethod() }}</p>
  </div>
</template>
```

#### 关键区别

| 特性 | computed | 普通方法 |
|------|----------|----------|
| **缓存** | ✅ 依赖不变时返回缓存值 | ❌ 每次调用都重新执行 |
| **使用方式** | `{{ fullName }}` | `{{ fullName() }}` |
| **适用场景** | 需要缓存的计算 | 不需要缓存的操作 |
| **副作用** | 不应该有 | 可以有 |

---

### 3. 可读写的计算属性

默认情况下计算属性是只读的，但也可以定义 setter：

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

const firstName = ref('张')
const lastName = ref('三')

// 可读写的计算属性
const fullName = computed({
  // getter
  get() {
    return firstName.value + ' ' + lastName.value
  },
  // setter
  set(newValue) {
    [firstName.value, lastName.value] = newValue.split(' ')
  }
})

const updateName = () => {
  fullName.value = '李 四'  // 触发 setter
}
</script>

<template>
  <div>
    <p>全名: {{ fullName }}</p>
    <p>姓: {{ firstName }}</p>
    <p>名: {{ lastName }}</p>
    
    <input v-model="fullName" placeholder="输入全名">
    <button @click="updateName">设置为 "李 四"</button>
  </div>
</template>
```

---

### 4. 复杂计算示例

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

// 购物车数据
const cart = ref([
  { id: 1, name: '苹果', price: 5, quantity: 3 },
  { id: 2, name: '香蕉', price: 3, quantity: 5 },
  { id: 3, name: '橙子', price: 4, quantity: 2 }
])

// 计算购物车总价
const cartTotal = computed(() => {
  return cart.value.reduce((total, item) => {
    return total + item.price * item.quantity
  }, 0)
})

// 计算商品总数
const itemCount = computed(() => {
  return cart.value.reduce((count, item) => count + item.quantity, 0)
})

// 计算平均单价
const averagePrice = computed(() => {
  if (itemCount.value === 0) return 0
  return (cartTotal.value / itemCount.value).toFixed(2)
})

// 根据总价计算折扣
const discount = computed(() => {
  if (cartTotal.value >= 100) return 0.8
  if (cartTotal.value >= 50) return 0.9
  return 1
})

// 折后价格
const finalPrice = computed(() => {
  return (cartTotal.value * discount.value).toFixed(2)
})

// 增加数量
const increaseQuantity = (id: number) => {
  const item = cart.value.find(item => item.id === id)
  if (item) item.quantity++
}

// 减少数量
const decreaseQuantity = (id: number) => {
  const item = cart.value.find(item => item.id === id)
  if (item && item.quantity > 0) item.quantity--
}
</script>

<template>
  <div class="cart">
    <h2>购物车</h2>
    
    <table>
      <thead>
        <tr>
          <th>商品</th>
          <th>单价</th>
          <th>数量</th>
          <th>小计</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in cart" :key="item.id">
          <td>{{ item.name }}</td>
          <td>¥{{ item.price }}</td>
          <td>{{ item.quantity }}</td>
          <td>¥{{ item.price * item.quantity }}</td>
          <td>
            <button @click="decreaseQuantity(item.id)">-</button>
            <button @click="increaseQuantity(item.id)">+</button>
          </td>
        </tr>
      </tbody>
    </table>
    
    <div class="summary">
      <p>商品总数: {{ itemCount }} 件</p>
      <p>平均单价: ¥{{ averagePrice }}</p>
      <p>原价: ¥{{ cartTotal }}</p>
      <p>折扣: {{ discount === 1 ? '无' : (1 - discount) * 10 + '折' }}</p>
      <p class="final">应付: ¥{{ finalPrice }}</p>
    </div>
  </div>
</template>

<style scoped>
.cart {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th, td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background: #f5f5f5;
}

button {
  padding: 5px 10px;
  margin: 0 2px;
  cursor: pointer;
}

.summary {
  background: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
}

.summary p {
  margin: 5px 0;
}

.final {
  font-size: 24px;
  font-weight: bold;
  color: #42b883;
}
</style>
```

---

## 最佳实践

### ✅ 推荐做法

1. **使用 computed 进行数据转换**：当需要根据现有数据派生出新数据时使用
2. **避免在 computed 中执行副作用**：如修改外部状态、发起 API 请求等
3. **合理使用 getter/setter**：当需要双向绑定时使用可写计算属性
4. **保持计算属性简单**：复杂逻辑应拆分成多个计算属性

### ❌ 应避免的做法

1. **不要在 computed 中修改其他响应式数据**

```vue
<script setup>
import { ref, computed } from 'vue'

const count = ref(0)
const other = ref(0)

// ❌ 错误 - computed 不应该有副作用
const badComputed = computed(() => {
  other.value = count.value * 2  // 不要这样做！
  return count.value * 2
})
</script>
```

2. **不要滥用 computed**

```vue
<script setup>
import { ref, computed } from 'vue'

const count = ref(0)

// ❌ 过度使用 - 简单的显示不需要 computed
const displayText = computed(() => `Count: ${count.value}`)

// ✅ 直接在模板中使用
// <p>Count: {{ count }}</p>
</script>
```

---

## 练习题

### 基础练习

创建一个用户信息展示组件：
1. 使用 `ref` 定义用户的姓、名、年龄
2. 使用 `computed` 计算全名
3. 使用 `computed` 判断是否成年（age >= 18）
4. 使用 `computed` 生成用户简介（"XXX，XX岁，已/未成年"）

### 进阶练习

创建一个搜索和过滤组件：
1. 定义产品列表（id, name, category, price）
2. 使用 `ref` 定义搜索关键词和分类过滤器
3. 使用 `computed` 实现：
   - 按名称搜索过滤
   - 按分类筛选
   - 按价格排序（升序/降序）
   - 计算过滤后的结果数量
   - 计算平均价格

### 挑战练习

创建一个完整的购物车系统：
1. 定义商品列表和购物车
2. 实现以下计算属性：
   - 购物车商品列表（包含商品详情）
   - 每种商品的小计
   - 商品总数
   - 商品原价总和
   - 折扣金额（满100减20，满200减50，满500减150）
   - 最终应付金额
   - 是否可以结算（购物车不为空且库存充足）
3. 实现可写的 "全选" 计算属性
4. 实现可写的 "批量修改数量" 计算属性

---

## 学习目标检查清单

- [ ] 理解什么是计算属性及其作用
- [ ] 掌握 `computed` 的基本用法
- [ ] 理解计算属性的缓存特性
- [ ] 理解 computed vs 普通方法的区别
- [ ] 掌握可读写的计算属性
- [ ] 能够正确使用计算属性优化模板逻辑
- [ ] 了解计算属性的最佳实践

---

## 延伸阅读

- [Vue 官方文档 - 计算属性](https://cn.vuejs.org/guide/essentials/computed.html)
- [Vue 官方文档 - computed](https://cn.vuejs.org/api/reactivity-core.html#computed)

---

## 下一步

完成本章学习后，进入 [第 5 章：侦听器 watch](../05-chapter-5/README.md)，学习如何监听数据变化。
