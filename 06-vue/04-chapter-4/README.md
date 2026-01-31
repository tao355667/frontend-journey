# 计算属性（Computed）：智能的数据处理

## 本章目的

理解计算属性的概念和使用场景，掌握计算属性与 methods 的区别，学会使用计算属性处理派生数据。

---

## 内容概述

- 计算属性的基本概念
- computed 与 methods 的区别
- 计算属性的缓存机制
- 可写计算属性（setter）
- 计算属性的最佳实践
- 复杂计算属性示例

---

## 核心概念讲解

### 什么是计算属性？

计算属性是基于现有的响应式数据计算得出的新数据。它们会自动追踪依赖的数据变化，并在依赖变化时自动重新计算。

#### 类比理解

想象你有一家超市：
- **原始数据（data）**：每种商品的单价和库存
- **计算属性（computed）**：
  - 购物车总价 = 商品A单价 × 数量 + 商品B单价 × 数量
  - 库存状态 = 库存 > 0 ? "有货" : "缺货"
  - 折扣后价格 = 原价 × 折扣率

你不需要手动记录总价，只要记录单价和数量，总价就会自动计算出来。

---

### 1. 计算属性的基本用法

```javascript
createApp({
  data() {
    return {
      firstName: '张',
      lastName: '三',
      quantity: 2,
      price: 99.99
    }
  },
  computed: {
    // 计算属性：全名
    fullName() {
      return this.firstName + ' ' + this.lastName
    },
    
    // 计算属性：总价
    totalPrice() {
      return this.price * this.quantity
    },
    
    // 计算属性：带格式化
    formattedTotal() {
      return '¥' + this.totalPrice.toFixed(2)
    }
  }
})
```

```html
<div id="app">
  <p>全名: {{ fullName }}</p>
  <p>数量: {{ quantity }}</p>
  <p>单价: ¥{{ price }}</p>
  <p>总价: {{ formattedTotal }}</p>
</div>
```

---

### 2. computed vs methods：关键区别

| 特性 | Computed | Methods |
|------|----------|---------|
| **调用方式** | 像属性一样访问 `{{ fullName }}` | 像函数一样调用 `{{ getFullName() }}` |
| **缓存** | ✅ 有缓存，依赖不变不重新计算 | ❌ 无缓存，每次调用都执行 |
| **性能** | 依赖不变时，直接返回缓存值 | 每次都要重新执行 |
| **适用场景** | 基于数据派生的值 | 需要参数或触发副作用 |

#### 性能对比示例

```javascript
createApp({
  data() {
    return {
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
  },
  computed: {
    // 计算属性：只计算一次，缓存结果
    sumComputed() {
      console.log('计算属性执行了')
      return this.items.reduce((a, b) => a + b, 0)
    }
  },
  methods: {
    // 方法：每次调用都重新计算
    sumMethod() {
      console.log('方法执行了')
      return this.items.reduce((a, b) => a + b, 0)
    }
  }
})
```

```html
<!-- 计算属性访问 -->
<p>总和1: {{ sumComputed }}</p>
<p>总和2: {{ sumComputed }}</p>
<p>总和3: {{ sumComputed }}</p>
<!-- 控制台只会输出一次 "计算属性执行了" -->

<!-- 方法调用 -->
<p>总和1: {{ sumMethod() }}</p>
<p>总和2: {{ sumMethod() }}</p>
<p>总和3: {{ sumMethod() }}</p>
<!-- 控制台会输出三次 "方法执行了" -->
```

**生活类比**：
- **计算属性** = 记在本子上的答案（问一次，看本子就行）
- **方法** = 每次都要重新算一遍（问一次，算一次）

---

### 3. 计算属性的依赖追踪

Vue 会自动追踪计算属性中用到的响应式数据：

```javascript
computed: {
  // 自动追踪 firstName 和 lastName
  fullName() {
    return this.firstName + this.lastName
  }
}
```

当 `firstName` 或 `lastName` 改变时，`fullName` 会自动重新计算。

#### 复杂依赖示例

```javascript
createApp({
  data() {
    return {
      cart: [
        { name: '苹果', price: 5, quantity: 3 },
        { name: '香蕉', price: 3, quantity: 5 }
      ],
      discount: 0.9, // 9折
      isVip: true
    }
  },
  computed: {
    // 计算商品总数
    totalItems() {
      return this.cart.reduce((sum, item) => sum + item.quantity, 0)
    },
    
    // 计算小计（未打折）
    subtotal() {
      return this.cart.reduce((sum, item) => {
        return sum + item.price * item.quantity
      }, 0)
    },
    
    // 计算总价（考虑VIP折扣）
    finalPrice() {
      let total = this.subtotal // 依赖另一个计算属性！
      if (this.isVip) {
        total = total * this.discount
      }
      return total
    },
    
    // 格式化显示
    formattedPrice() {
      return '¥' + this.finalPrice.toFixed(2)
    }
  }
})
```

---

### 4. 可写计算属性（Getter + Setter）

默认情况下，计算属性是只读的。但也可以定义 setter：

```javascript
computed: {
  fullName: {
    // getter - 读取时调用
    get() {
      return this.firstName + ' ' + this.lastName
    },
    // setter - 赋值时调用
    set(newValue) {
      // newValue = '李 四'
      [this.firstName, this.lastName] = newValue.split(' ')
    }
  }
}
```

```html
<div id="app">
  <p>姓: <input v-model="firstName"></p>
  <p>名: <input v-model="lastName"></p>
  <p>全名: <input v-model="fullName"></p>
  <!-- 修改全名输入框，firstName 和 lastName 会自动更新 -->
</div>
```

**应用场景**：表单中的全名/姓名字段、价格与折扣计算等。

---

### 5. 计算属性的最佳实践

#### ✅ 应该使用计算属性的场景

1. **派生数据**：从现有数据计算得出
2. **模板复杂逻辑**：避免在模板中写复杂表达式
3. **多次使用**：需要在多处使用的计算结果
4. **数据转换**：格式化、过滤、排序等

```javascript
// ✅ 好的实践：复杂的过滤逻辑放在计算属性
computed: {
  filteredProducts() {
    return this.products
      .filter(p => p.price >= this.minPrice)
      .filter(p => p.price <= this.maxPrice)
      .sort((a, b) => a.price - b.price)
  }
}
```

#### ❌ 不应该使用计算属性的场景

1. **不需要缓存**：每次都需要最新值
2. **有副作用**：不应该在计算属性中修改其他数据
3. **需要参数**：计算属性不能接收参数

```javascript
// ❌ 不好的实践：有副作用的计算属性
computed: {
  badComputed() {
    this.someOtherData = '新值' // 不要这样做！
    return this.someData
  }
}
```

---

### 6. 常见错误和注意事项

#### 错误 1：在计算属性中修改数据

```javascript
// ✗ 错误：计算属性应该是纯函数
computed: {
  badExample() {
    this.count++ // 不要修改数据！
    return this.count
  }
}

// ✓ 正确：只读取，不修改
computed: {
  goodExample() {
    return this.count * 2
  }
}
```

#### 错误 2：计算属性中使用异步操作

```javascript
// ✗ 错误：计算属性不能异步
computed: {
  async badAsync() {
    const result = await fetchData() // 不行！
    return result
  }
}

// ✓ 正确：异步操作应该在 methods 或生命周期钩子中
```

---

## JavaScript vs TypeScript 对比

| 特性 | JavaScript | TypeScript |
|------|-----------|------------|
| 计算属性定义 | 直接返回 | 可定义返回类型 |
| 类型推断 | 自动 | 更精确 |
| 代码提示 | 基本 | 完整 |

#### TypeScript 示例

```typescript
interface Product {
  name: string
  price: number
  quantity: number
}

interface CartData {
  cart: Product[]
  discount: number
  isVip: boolean
}

export default {
  data(): CartData {
    return {
      cart: [],
      discount: 0.9,
      isVip: false
    }
  },
  
  computed: {
    // 显式定义返回类型
    totalItems(): number {
      return this.cart.reduce((sum, item) => sum + item.quantity, 0)
    },
    
    finalPrice(): number {
      let total = this.cart.reduce((sum, item) => {
        return sum + item.price * item.quantity
      }, 0)
      return this.isVip ? total * this.discount : total
    },
    
    // 可写计算属性
    fullName: {
      get(): string {
        return `${this.firstName} ${this.lastName}`
      },
      set(value: string): void {
        const parts = value.split(' ')
        this.firstName = parts[0] || ''
        this.lastName = parts[1] || ''
      }
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

创建一个成绩统计系统：
1. 使用 `data` 存储3门课程的成绩
2. 使用计算属性计算总分、平均分、最高分、最低分
3. 使用计算属性判断成绩等级（A/B/C/D/F）
4. 添加一个计算属性判断是否全部及格（>=60分）

### 进阶练习

创建一个商品筛选系统：
1. 使用 `data` 存储商品列表（名称、价格、类别、库存）
2. 使用计算属性根据价格范围筛选商品
3. 使用计算属性根据类别筛选商品
4. 使用计算属性对结果进行排序（价格升序/降序）
5. 使用计算属性统计筛选后的商品数量和总库存

### 挑战练习

创建一个完整的购物车价格计算系统：
1. 定义购物车数据结构（商品ID、名称、单价、数量、是否选中）
2. 使用计算属性计算：
   - 选中商品的总数
   - 选中商品的原价总和
   - 满减优惠（满200减30，满500减100）
   - VIP折扣（在满减后打9折）
   - 最终应付金额
3. 实现可写计算属性：全选/取消全选功能
4. 显示详细的优惠明细

---

## 练习题答案

详见 `practice-solution.html`

---

## 学习目标检查清单

- [ ] 理解计算属性的概念和用途
- [ ] 掌握计算属性的基本语法
- [ ] 理解计算属性与 methods 的区别（缓存机制）
- [ ] 了解计算属性的依赖追踪原理
- [ ] 掌握可写计算属性的使用（getter/setter）
- [ ] 知道何时应该/不应该使用计算属性
- [ ] 能够在实际项目中正确使用计算属性
- [ ] 理解计算属性不能用于异步操作和副作用

---

## 延伸阅读

- [Vue 官方文档 - 计算属性](https://cn.vuejs.org/guide/essentials/computed.html)
- [Vue 计算属性 vs 方法](https://cn.vuejs.org/guide/essentials/computed.html#computed-caching-vs-methods)
- [Vue 可写计算属性](https://cn.vuejs.org/guide/essentials/computed.html#writable-computed)
