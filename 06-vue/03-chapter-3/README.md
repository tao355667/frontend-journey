# data 与 methods：Vue 组件的"大脑"

## 本章目的

理解 Vue 选项式 API 中 `data` 和 `methods` 的核心作用，掌握如何定义响应式数据和组件方法，建立完整的数据驱动思维。

---

## 内容概述

- `data` 选项：响应式数据系统
- `methods` 选项：组件方法定义
- 数据响应式原理浅析
- 箭头函数与普通函数的区别
- this 指向问题
- 数据的计算与派生
- 方法间的互相调用

---

## 核心概念讲解

### 为什么需要 data 和 methods？

想象你是一家餐厅的主厨：
- **data（食材库存）**：记录你拥有的食材数量和状态
- **methods（菜谱步骤）**：你处理食材的具体操作流程

没有食材库存，你不知道能做什么菜；没有菜谱步骤，你不知道怎么做菜。两者配合才能做出美味佳肴。

#### 类比理解

**data 就像你的记忆**：
- 记住用户的登录状态
- 记住购物车里的商品
- 记住当前页面的显示模式

**methods 就像你的技能**：
- 登录/登出的能力
- 添加/删除商品的能力
- 切换显示模式的能力

---

### 1. data 选项：响应式数据

`data` 是一个函数，返回一个对象，这个对象中的属性是响应式的。

#### 为什么 data 必须是函数？

```javascript
// ✗ 错误写法（虽然可以运行，但不推荐）
data: {
  count: 0
}

// ✓ 正确写法
data() {
  return {
    count: 0
  }
}
```

**原因**：如果 `data` 是一个对象，所有组件实例会共享同一个数据对象。使用函数返回新对象，每个实例都有自己独立的数据。

**生活类比**：就像每位顾客都应该有自己的订单，而不是所有顾客共用一张订单。

#### 完整示例

```html
<div id="app">
  <p>当前计数: {{ count }}</p>
  <p>用户信息: {{ user.name }} ({{ user.age }}岁)</p>
  <p>商品列表: {{ products.length }} 件商品</p>
</div>

<script>
createApp({
  data() {
    return {
      // 基础数据类型
      count: 0,
      message: 'Hello',
      isActive: true,
      
      // 对象
      user: {
        name: '张三',
        age: 25
      },
      
      // 数组
      products: [
        { id: 1, name: '苹果', price: 5 },
        { id: 2, name: '香蕉', price: 3 }
      ],
      
      // 复杂嵌套
      cart: {
        items: [],
        total: 0,
        isVip: false
      }
    }
  }
}).mount('#app')
</script>
```

#### 响应式数据的特性

```javascript
// 1. 修改基本类型 - 自动更新视图
this.count++

// 2. 修改对象属性 - 自动更新视图
this.user.name = '李四'

// 3. 添加新属性 - 不会触发响应式！
this.user.gender = '男' // 视图不会更新

// 4. 修改数组元素 - 自动更新视图
this.products[0].price = 6

// 5. 修改数组长度 - 不会触发响应式！
this.products.length = 0 // 视图不会更新

// 6. 正确修改数组的方法
this.products.push({ id: 3, name: '橙子', price: 4 })  // ✓
this.products.pop()                                    // ✓
this.products.splice(0, 1)                            // ✓
this.products = this.products.filter(p => p.price > 4) // ✓
```

---

### 2. methods 选项：组件方法

`methods` 是一个对象，定义组件可以调用的函数。

#### 基本用法

```javascript
createApp({
  data() {
    return {
      count: 0
    }
  },
  methods: {
    // 方法 1：增加计数
    increment() {
      this.count++
    },
    
    // 方法 2：减少计数（带参数检查）
    decrement() {
      if (this.count > 0) {
        this.count--
      }
    },
    
    // 方法 3：重置（带参数）
    reset(value = 0) {
      this.count = value
    }
  }
})
```

#### ⚠️ 重要：不要在 methods 中使用箭头函数！

```javascript
methods: {
  // ✗ 错误：箭头函数会导致 this 指向错误
  badMethod: () => {
    console.log(this.count) // undefined！this 不指向组件实例
  },
  
  // ✓ 正确：使用普通函数
  goodMethod() {
    console.log(this.count) // 正确访问组件数据
  }
}
```

**原因**：箭头函数没有自己的 `this`，它会继承外部作用域的 `this`。在 methods 中，我们需要 `this` 指向组件实例。

#### 方法之间的互相调用

```javascript
methods: {
  // 方法 A：计算价格
  calculatePrice(quantity) {
    return quantity * this.unitPrice
  },
  
  // 方法 B：使用方法 A 的结果
  updateTotal(quantity) {
    // 调用同组件的其他方法
    const price = this.calculatePrice(quantity)
    this.total = price + this.shippingFee
  },
  
  // 方法 C：组合多个操作
  processOrder(quantity) {
    this.updateTotal(quantity)
    this.saveToDatabase()
    this.showSuccessMessage()
  },
  
  saveToDatabase() {
    console.log('保存到数据库...')
  },
  
  showSuccessMessage() {
    alert('订单处理成功！')
  }
}
```

---

### 3. 在模板中使用 methods

```html
<div id="app">
  <!-- 直接调用方法（点击事件） -->
  <button @click="increment">增加</button>
  
  <!-- 调用带参数的方法 -->
  <button @click="addToCart(product)">加入购物车</button>
  
  <!-- 在插值中调用方法（注意性能影响） -->
  <p>格式化价格: {{ formatPrice(price) }}</p>
  
  <!-- 方法调用 + 原生事件对象 -->
  <input @input="handleInput($event)">
</div>

<script>
createApp({
  data() {
    return {
      count: 0,
      price: 99.99,
      product: { name: 'iPhone', price: 5999 }
    }
  },
  methods: {
    increment() {
      this.count++
    },
    
    addToCart(product) {
      console.log('添加商品:', product.name)
    },
    
    formatPrice(price) {
      return '¥' + price.toFixed(2)
    },
    
    handleInput(event) {
      console.log('输入值:', event.target.value)
    }
  }
}).mount('#app')
</script>
```

---

### 4. 数据响应式原理（浅析）

Vue 3 使用 `Proxy` 实现响应式：

```javascript
// 简化原理示意
const data = { count: 0 }
const proxy = new Proxy(data, {
  get(target, key) {
    // 读取时：收集依赖（记录哪些地方在用这个数据）
    track(target, key)
    return target[key]
  },
  set(target, key, value) {
    // 设置时：触发更新（通知所有用到的地方更新）
    target[key] = value
    trigger(target, key)
  }
})
```

**生活类比**：就像酒店的前台系统：
- **get（读取）**：客人查看房间状态，系统记录客人的需求
- **set（设置）**：房间状态改变，系统自动通知所有相关客人

---

### 5. 常见的 data 和 methods 错误

#### 错误 1：未声明就使用

```javascript
createApp({
  data() {
    return {
      // 忘记声明 name
    }
  },
  methods: {
    init() {
      this.name = '张三' // 虽然能用，但不是响应式的！
    }
  }
})
```

**解决方案**：所有需要在模板中使用的数据，都要在 `data` 中声明。

#### 错误 2：直接修改数组长度

```javascript
// ✗ 错误 - 视图不会更新
this.items.length = 0

// ✓ 正确 - 使用 splice
this.items.splice(0, this.items.length)

// ✓ 或者赋新数组
this.items = []
```

#### 错误 3：在 methods 中修改 data 但未触发更新

```javascript
methods: {
  // ✗ 错误 - 直接给对象添加新属性
  addProperty() {
    this.user.gender = '男' // 不是响应式的！
  },
  
  // ✓ 正确 - 使用 Vue.set 或 Object.assign
  addProperty() {
    this.user = { ...this.user, gender: '男' }
  }
}
```

---

## JavaScript vs TypeScript 对比

| 特性 | JavaScript | TypeScript |
|------|-----------|------------|
| 数据定义 | 直接返回对象 | 可定义接口/类型 |
| 类型安全 | 运行时检查 | 编译时检查 |
| 代码提示 | 有限 | 完整的智能提示 |
| 重构支持 | 弱 | 强 |

#### TypeScript 示例

```typescript
// 定义数据接口
interface User {
  name: string
  age: number
  email?: string
}

interface AppData {
  count: number
  user: User
  items: string[]
}

export default {
  data(): AppData {
    return {
      count: 0,
      user: {
        name: '张三',
        age: 25
      },
      items: []
    }
  },
  
  methods: {
    // TypeScript 自动推断 this 类型
    increment(): void {
      this.count++
    },
    
    // 带参数类型
    setUserName(name: string): void {
      this.user.name = name
    },
    
    // 带返回值类型
    getUserInfo(): string {
      return `${this.user.name} (${this.user.age}岁)`
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

创建一个简易计算器：
1. 使用 `data` 定义两个数字和一个运算符
2. 使用 `methods` 定义加、减、乘、除四个运算方法
3. 实现一个 `calculate` 方法，根据运算符执行对应计算
4. 实现一个 `reset` 方法清空所有数据

### 进阶练习

创建一个 Todo List 管理器：
1. 使用 `data` 存储任务列表（每个任务包含 id、text、completed）
2. 使用 `methods` 实现添加任务、删除任务、标记完成/未完成
3. 实现一个 `getCompletedCount` 方法返回已完成任务数
4. 实现一个 `clearCompleted` 方法删除所有已完成任务

### 挑战练习

创建一个购物车系统：
1. 定义 `products` 数组（商品列表）和 `cart` 数组（购物车）
2. 实现 `addToCart(product)` 方法添加商品到购物车
3. 实现 `removeFromCart(productId)` 方法移除商品
4. 实现 `updateQuantity(productId, quantity)` 修改商品数量
5. 实现 `getCartTotal()` 计算购物车总价
6. 实现 `checkout()` 结算方法（清空购物车并显示总价）

---

## 练习题答案

详见 `practice-solution.html`

---

## 学习目标检查清单

- [ ] 理解为什么 `data` 必须是函数
- [ ] 掌握如何定义响应式数据（基本类型、对象、数组）
 [ ] 了解响应式数据的限制（添加新属性、修改数组长度）
- [ ] 掌握 `methods` 的定义和调用方式
- [ ] 理解为什么 methods 中不能使用箭头函数
- [ ] 掌握方法之间互相调用的方式
- [ ] 理解 Vue 响应式系统的基本原理
- [ ] 能够独立完成 data 和 methods 的设计

---

## 延伸阅读

- [Vue 官方文档 - 选项式 API：data](https://cn.vuejs.org/api/options-state.html#data)
- [Vue 官方文档 - 选项式 API：methods](https://cn.vuejs.org/api/options-state.html#methods)
- [Vue 响应式原理详解](https://cn.vuejs.org/guide/essentials/reactivity-fundamentals.html)
