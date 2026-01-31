# 第二十章：ref 与 reactive

## 学习目标
1. 理解 `ref` 和 `reactive` 的作用和使用场景
2. 掌握创建响应式数据的方法
3. 了解两者之间的区别和选择建议

## 概念讲解

### 什么是响应式数据？

响应式数据是指当数据发生变化时，Vue 会自动更新使用这些数据的视图。

**比喻：自动感应门**

想象商场的自动感应门：
- 当有人靠近（数据变化），门自动打开（视图更新）
- 你不需要手动去开门，系统会自动感知并做出反应

响应式数据就是这样，你只需要改变数据，Vue 会自动帮你更新界面。

### ref - 用于基本类型和对象

`ref` 可以接受任何类型的值（基本类型或对象），并返回一个响应式引用。

**基本用法：**

```javascript
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
```

**访问和修改：**

```javascript
// 读取值需要使用 .value
console.log(count.value)  // 0
console.log(user.value.name)  // '张三'

// 修改值也需要使用 .value
count.value = 10
message.value = 'World'
user.value.age = 26
```

**为什么需要 `.value`？**

JavaScript 中，基本类型（数字、字符串、布尔值）是按值传递的，不是按引用。Vue 需要创建一个对象来包裹基本类型，才能实现响应式。`.value` 就是这个包裹对象的属性。

### reactive - 专用于对象

`reactive` 只接受对象类型（对象、数组、Map、Set 等），返回一个响应式代理。

**基本用法：**

```javascript
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
```

**访问和修改：**

```javascript
// 直接访问，不需要 .value
console.log(user.name)  // '张三'
console.log(user.address.city)  // '北京'

// 直接修改
user.age = 26
user.address.city = '上海'

// 数组操作
todos.push({ id: 3, text: '写总结', done: false })
todos[0].done = true
```

### ref vs reactive 对比

| 特性 | ref | reactive |
|------|-----|----------|
| 适用类型 | 任何类型 | 仅对象类型 |
| 访问方式 | 需要 `.value` | 直接访问 |
| 替换整个对象 | 可以直接替换 | 会失去响应性 |
| 解构/展开 | 保持响应性 | 失去响应性 |

### 何时使用 ref，何时使用 reactive？

**使用 ref 的场景：**

1. 基本类型数据（数字、字符串、布尔值）
2. 需要替换整个对象的场景
3. 从组合式函数返回数据时

```javascript
// 基本类型必须用 ref
const count = ref(0)
const name = ref('张三')

// 需要替换整个对象
const user = ref({ name: '张三' })
user.value = { name: '李四' }  // 可以替换
```

**使用 reactive 的场景：**

1. 复杂对象，包含多个属性
2. 表单数据对象
3. 状态对象，不需要整体替换

```javascript
// 复杂对象
const form = reactive({
  username: '',
  password: '',
  email: ''
})

// 状态对象
const state = reactive({
  isLoading: false,
  error: null,
  data: []
})
```

**最佳实践建议：**

在现代 Vue 开发中，建议统一使用 `ref`，因为它：
1. 更加灵活（支持所有类型）
2. 解构时可以使用 `toRefs` 保持响应性
3. 更符合 JavaScript 的赋值直觉

### 响应式丢失的情况

**1. 解构 reactive 对象：**

```javascript
const user = reactive({ name: '张三', age: 25 })

// 解构会失去响应性
const { name, age } = user
name = '李四'  // 不会触发更新！

// 解决方案：使用 toRefs
import { toRefs } from 'vue'
const { name, age } = toRefs(user)
name.value = '李四'  // 会触发更新
```

**2. 替换 reactive 对象：**

```javascript
let user = reactive({ name: '张三' })

// 直接赋值会失去响应性
user = { name: '李四' }  // 不会触发更新！

// 解决方案：使用 Object.assign
Object.assign(user, { name: '李四' })  // 正确
```

## 代码示例

### ref 完整示例

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>ref 示例</title>
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
</head>
<body>
  <div id="app">
    <h2>基本类型</h2>
    <p>计数：{{ count }}</p>
    <button @click="increment">增加</button>
    
    <h2>对象</h2>
    <p>姓名：{{ user.name }}</p>
    <p>年龄：{{ user.age }}</p>
    <button @click="updateUser">更新用户</button>
  </div>

  <script>
    const { createApp, ref } = Vue

    createApp({
      setup() {
        // 基本类型
        const count = ref(0)
        
        // 对象
        const user = ref({
          name: '张三',
          age: 25
        })
        
        const increment = () => {
          count.value++
        }
        
        const updateUser = () => {
          user.value.name = '李四'
          user.value.age++
        }
        
        return {
          count,
          user,
          increment,
          updateUser
        }
      }
    }).mount('#app')
  </script>
</body>
</html>
```

### reactive 完整示例

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>reactive 示例</title>
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
</head>
<body>
  <div id="app">
    <h2>用户信息</h2>
    <p>姓名：{{ user.name }}</p>
    <p>年龄：{{ user.age }}</p>
    <p>城市：{{ user.address.city }}</p>
    <button @click="updateInfo">更新信息</button>
    
    <h2>待办列表</h2>
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        {{ todo.text }} - {{ todo.done ? '完成' : '未完成' }}
      </li>
    </ul>
    <button @click="addTodo">添加待办</button>
  </div>

  <script>
    const { createApp, reactive } = Vue

    createApp({
      setup() {
        // 复杂对象
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
        
        const updateInfo = () => {
          user.age++
          user.address.city = '上海'
        }
        
        const addTodo = () => {
          todos.push({
            id: todos.length + 1,
            text: '新待办 ' + todos.length,
            done: false
          })
        }
        
        return {
          user,
          todos,
          updateInfo,
          addTodo
        }
      }
    }).mount('#app')
  </script>
</body>
</html>
```

### ref 与 reactive 配合使用

```javascript
import { ref, reactive } from 'vue'

export default {
  setup() {
    // 用 ref 管理基本类型和需要替换的对象
    const currentTab = ref('home')
    const selectedUser = ref(null)
    
    // 用 reactive 管理复杂状态对象
    const state = reactive({
      isLoading: false,
      error: null,
      users: []
    })
    
    // 方法
    const loadUsers = async () => {
      state.isLoading = true
      try {
        const response = await fetch('/api/users')
        state.users = await response.json()
      } catch (err) {
        state.error = err.message
      } finally {
        state.isLoading = false
      }
    }
    
    const selectUser = (user) => {
      selectedUser.value = user  // 可以替换整个对象
    }
    
    return {
      currentTab,
      selectedUser,
      state,
      loadUsers,
      selectUser
    }
  }
}
```

## 常见错误

### 错误 1：忘记使用 .value

```javascript
const count = ref(0)

// 错误
console.log(count)  // 输出的是 ref 对象，不是 0
count = 10  // 没有修改内部的值

// 正确
console.log(count.value)  // 0
count.value = 10  // 正确修改
```

### 错误 2：解构 reactive 对象

```javascript
const user = reactive({ name: '张三', age: 25 })

// 错误 - 失去响应性
const { name, age } = user

// 正确 - 使用 toRefs
const { name, age } = toRefs(user)
// 或者保持原对象
const userName = user.name
```

### 错误 3：在 reactive 中替换整个对象

```javascript
let user = reactive({ name: '张三' })

// 错误
user = { name: '李四' }  // 失去响应性

// 正确
Object.assign(user, { name: '李四' })
// 或者用 ref
const user = ref({ name: '张三' })
user.value = { name: '李四' }  // 可以替换
```

## 练习题

### 练习 1：基础练习
创建一个购物车计数器：
- 使用 `ref` 创建一个商品数量计数器
- 提供增加和减少数量的方法
- 使用 `reactive` 创建一个商品对象（包含名称、价格、数量）
- 显示总价（价格 × 数量）

### 练习 2：进阶练习
创建一个用户信息编辑器：
- 使用 `reactive` 创建一个包含多个字段的用户对象
  - 姓名、年龄、邮箱、地址（城市、街道）
- 提供更新各个字段的方法
- 添加验证：年龄不能小于 0，邮箱必须包含 @
- 添加一个"重置"按钮，恢复初始值

### 练习 3：综合练习
创建一个简单的表单验证系统：
- 使用 `reactive` 创建表单数据对象（用户名、密码、确认密码、邮箱）
- 使用 `ref` 创建错误信息数组
- 实现以下验证规则：
  - 用户名不能为空且长度至少 3 个字符
  - 密码不能为空且长度至少 6 个字符
  - 确认密码必须与密码一致
  - 邮箱格式必须正确
- 显示所有验证错误
- 提供一个提交按钮，只有在所有验证通过时才可用

---

完成练习后，可以查看 `practice-solution.html` 中的参考答案。
