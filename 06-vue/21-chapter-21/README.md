# 第二十一章：computed 与 watch（组合式）

## 学习目标
1. 掌握组合式 API 中的 `computed` 用法
2. 掌握组合式 API 中的 `watch` 和 `watchEffect` 用法
3. 理解计算属性和侦听器的区别
4. 学会选择合适的响应式工具

## 概念讲解

### computed - 计算属性

计算属性用于基于其他响应式数据计算出一个新的值，它会缓存结果，只在依赖变化时重新计算。

**比喻：自动计算器**

想象一个智能收银机：
- 你输入商品单价和数量（依赖数据）
- 收银机自动计算总价（计算属性）
- 只要单价和数量不变，总价立即显示，不需要重新计算
- 一旦单价或数量变化，收银机自动重新计算

**基本用法：**

```javascript
import { ref, computed } from 'vue'

const firstName = ref('张')
const lastName = ref('三')

// 只读计算属性
const fullName = computed(() => {
  return firstName.value + lastName.value
})
```

**可写计算属性：**

```javascript
const fullName = computed({
  get() {
    return firstName.value + ' ' + lastName.value
  },
  set(newValue) {
    [firstName.value, lastName.value] = newValue.split(' ')
  }
})

// 现在可以设置 fullName
fullName.value = '李 四'  // firstName 变为 '李'，lastName 变为 '四'
```

### watch - 侦听器

`watch` 用于监听特定数据的变化，并在变化时执行副作用操作。

**基本用法：**

```javascript
import { ref, watch } from 'vue'

const count = ref(0)

watch(count, (newValue, oldValue) => {
  console.log(`count 从 ${oldValue} 变为 ${newValue}`)
})
```

**监听对象属性：**

```javascript
const user = reactive({
  name: '张三',
  age: 25
})

// 监听单个属性
watch(() => user.name, (newValue, oldValue) => {
  console.log(`姓名从 ${oldValue} 变为 ${newValue}`)
})

// 监听多个数据源
watch([() => user.name, () => user.age], ([newName, newAge], [oldName, oldAge]) => {
  console.log('用户信息发生变化')
})
```

**立即执行和深度监听：**

```javascript
// 立即执行
watch(count, (newValue, oldValue) => {
  console.log('count 变化了:', newValue)
}, { immediate: true })

// 深度监听对象
const user = ref({
  profile: {
    name: '张三'
  }
})

watch(user, (newValue) => {
  console.log('user 变化了:', newValue)
}, { deep: true })
```

### watchEffect - 自动追踪依赖的侦听器

`watchEffect` 会立即执行函数，并自动追踪其中使用的响应式数据，当这些数据变化时重新执行。

**基本用法：**

```javascript
import { ref, watchEffect } from 'vue'

const count = ref(0)
const message = ref('Hello')

watchEffect(() => {
  // 自动追踪 count 和 message
  console.log(`count: ${count.value}, message: ${message.value}`)
})

// 修改 count，上面的函数会重新执行
count.value++
// 修改 message，上面的函数也会重新执行
message.value = 'World'
```

**清理副作用：**

```javascript
watchEffect((onCleanup) => {
  const timer = setInterval(() => {
    console.log('定时器执行')
  }, 1000)
  
  // 注册清理函数
  onCleanup(() => {
    clearInterval(timer)
    console.log('清理定时器')
  })
})
```

### computed vs watch vs watchEffect

| 特性 | computed | watch | watchEffect |
|------|----------|-------|-------------|
| 用途 | 计算派生值 | 监听变化执行副作用 | 自动追踪依赖执行副作用 |
| 返回值 | 有（计算结果） | 无 | 无 |
| 缓存 | 是 | 否 | 否 |
| 懒执行 | 是（只在被使用时计算） | 否（可以配置 immediate） | 否（立即执行） |
| 旧值 | 无 | 有 | 无 |
| 依赖追踪 | 自动 | 手动指定 | 自动 |

### 何时使用什么？

**使用 computed：**
- 需要根据其他数据计算出新值
- 需要缓存结果避免重复计算
- 在模板中直接使用

**使用 watch：**
- 需要在数据变化时执行异步操作
- 需要访问变化前后的值
- 需要精确控制监听哪些数据

**使用 watchEffect：**
- 需要立即执行的副作用
- 依赖关系复杂，不想手动列出
- 需要在组件中执行初始化逻辑

## 代码示例

### computed 示例

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>computed 示例</title>
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
</head>
<body>
  <div id="app">
    <h2>购物车</h2>
    <div v-for="(item, index) in items" :key="index">
      {{ item.name }} - ¥{{ item.price }} x 
      <input type="number" v-model="item.quantity" min="0" style="width: 50px;">
    </div>
    
    <h3>总计：¥{{ total }}</h3>
    <p>折扣后：¥{{ discountedTotal }}</p>
    <p>节省：¥{{ savings }}</p>
  </div>

  <script>
    const { createApp, ref, computed } = Vue

    createApp({
      setup() {
        const items = ref([
          { name: '苹果', price: 5, quantity: 3 },
          { name: '香蕉', price: 3, quantity: 5 },
          { name: '橙子', price: 4, quantity: 2 }
        ])
        
        // 计算总价
        const total = computed(() => {
          return items.value.reduce((sum, item) => {
            return sum + item.price * item.quantity
          }, 0)
        })
        
        // 计算折扣价（满50打9折）
        const discountedTotal = computed(() => {
          const discount = total.value >= 50 ? 0.9 : 1
          return (total.value * discount).toFixed(2)
        })
        
        // 计算节省金额
        const savings = computed(() => {
          return (total.value - discountedTotal.value).toFixed(2)
        })
        
        return {
          items,
          total,
          discountedTotal,
          savings
        }
      }
    }).mount('#app')
  </script>
</body>
</html>
```

### watch 示例

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>watch 示例</title>
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
</head>
<body>
  <div id="app">
    <h2>搜索功能</h2>
    <input v-model="searchQuery" placeholder="输入搜索关键词">
    <p>搜索结果：{{ results.length }} 条</p>
    <ul>
      <li v-for="result in results" :key="result">{{ result }}</li>
    </ul>
  </div>

  <script>
    const { createApp, ref, watch } = Vue

    createApp({
      setup() {
        const searchQuery = ref('')
        const results = ref([])
        
        // 模拟搜索 API
        const searchAPI = (query) => {
          const allItems = ['苹果', '香蕉', '橙子', '葡萄', '西瓜', '苹果汁', '香蕉牛奶']
          return allItems.filter(item => item.includes(query))
        }
        
        // 监听搜索词变化
        watch(searchQuery, (newValue) => {
          if (newValue.trim()) {
            results.value = searchAPI(newValue)
          } else {
            results.value = []
          }
        })
        
        return {
          searchQuery,
          results
        }
      }
    }).mount('#app')
  </script>
</body>
</html>
```

### watchEffect 示例

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>watchEffect 示例</title>
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
</head>
<body>
  <div id="app">
    <h2>自动保存</h2>
    <input v-model="form.title" placeholder="标题">
    <textarea v-model="form.content" placeholder="内容"></textarea>
    <p>状态：{{ saveStatus }}</p>
  </div>

  <script>
    const { createApp, ref, reactive, watchEffect } = Vue

    createApp({
      setup() {
        const form = reactive({
          title: '',
          content: ''
        })
        const saveStatus = ref('等待输入...')
        
        watchEffect((onCleanup) => {
          const { title, content } = form
          
          if (title || content) {
            saveStatus.value = '输入中...'
            
            // 模拟自动保存
            const timer = setTimeout(() => {
              saveStatus.value = `已保存：${new Date().toLocaleTimeString()}`
              console.log('保存数据:', { title, content })
            }, 1000)
            
            // 清理函数
            onCleanup(() => {
              clearTimeout(timer)
            })
          }
        })
        
        return {
          form,
          saveStatus
        }
      }
    }).mount('#app')
  </script>
</body>
</html>
```

## 最佳实践

1. **优先使用 computed**：如果可以从现有数据计算出值，优先使用 computed
2. **慎用 watch**：watch 容易导致代码难以追踪，尽量使用 computed
3. **watchEffect 用于副作用**：数据获取、手动 DOM 操作等非纯逻辑
4. **及时清理副作用**：在 watchEffect 中使用 onCleanup 清理定时器、事件监听等

## 练习题

### 练习 1：基础练习
创建一个成绩计算器：
- 使用 `ref` 存储三门课程的成绩（0-100）
- 使用 `computed` 计算：
  - 总分
  - 平均分（保留一位小数）
  - 等级（平均分≥90为A，≥80为B，≥70为C，≥60为D，否则为F）
- 使用 `watch` 监听成绩变化，如果任何成绩<0或>100，自动纠正为0或100

### 练习 2：进阶练习
创建一个实时汇率转换器：
- 使用 `ref` 存储人民币金额
- 使用 `computed` 计算美元、欧元、日元的金额
- 汇率：1人民币 = 0.14美元 = 0.13欧元 = 20.5日元
- 使用 `watchEffect` 实现：
  - 每次金额变化时，在控制台输出转换日志
  - 如果金额超过10000，显示警告信息

### 练习 3：综合练习
创建一个完整的用户资料管理器：
- 使用 `reactive` 创建用户对象（姓名、邮箱、手机号、年龄）
- 使用 `computed` 创建：
  - 完整信息卡片格式显示
  - 资料完成度百分比（每项占25%）
  - 是否为有效资料（所有字段都不为空）
- 使用 `watch` 监听邮箱变化，验证邮箱格式（必须包含@和.）
- 使用 `watchEffect` 实现：
  - 每次数据变化自动保存到 localStorage
  - 页面加载时从 localStorage 恢复数据

---

完成练习后，可以查看 `practice-solution.html` 中的参考答案。
