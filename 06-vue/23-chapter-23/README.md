# 第二十三章：provide 与 inject

## 学习目标
1. 理解 provide/inject 的作用和使用场景
2. 掌握跨层级传递数据的方法
3. 了解与 props 的区别和选择建议

## 概念讲解

### 什么是 provide/inject？

`provide` 和 `inject` 是一对组合 API，用于在祖先组件和后代组件之间传递数据，无需通过逐层 props 传递。

**比喻：家族传承**

想象一个大家族：
- **props 逐层传递**：爷爷传给父亲，父亲传给儿子，儿子传给孙子...每一代都要转手
- **provide/inject**：爷爷直接立下遗嘱（provide），任何后代都可以查看（inject），无需经过中间代

这在组件层级较深时特别有用，避免了"prop drilling"（逐层传递 props）的问题。

### 基本用法

**provide - 提供数据：**

```javascript
import { provide, ref } from 'vue'

export default {
  setup() {
    // 提供静态值
    provide('userName', '张三')
    
    // 提供响应式数据
    const user = ref({
      name: '张三',
      age: 25
    })
    provide('user', user)
    
    // 提供方法
    const updateUser = (newData) => {
      Object.assign(user.value, newData)
    }
    provide('updateUser', updateUser)
  }
}
```

**inject - 注入数据：**

```javascript
import { inject } from 'vue'

export default {
  setup() {
    // 注入数据
    const userName = inject('userName')
    const user = inject('user')
    const updateUser = inject('updateUser')
    
    // 使用默认值
    const theme = inject('theme', 'light')  // 如果没有提供，使用 'light'
    
    return {
      userName,
      user,
      updateUser,
      theme
    }
  }
}
```

### 作用域和限制

**特点：**
1. **单向数据流**：祖先提供数据，后代注入使用
2. **不限制层级**：可以跨越多层组件传递
3. **响应式**：提供的 ref 或 reactive 数据保持响应性
4. **只能祖先到后代**：不能反向传递，也不能兄弟组件间传递

**使用场景：**
- 主题/样式配置
- 用户认证信息
- 全局状态（小规模应用）
- 组件库中的配置

**不适用场景：**
- 父子组件直接通信（用 props 更合适）
- 复杂的全局状态管理（用 Pinia 更合适）

### 配合 readonly 使用

为了防止后代组件直接修改提供的数据，可以配合 `readonly` 使用：

```javascript
import { provide, ref, readonly } from 'vue'

export default {
  setup() {
    const count = ref(0)
    
    // 提供只读版本
    provide('count', readonly(count))
    
    // 提供修改方法
    const increment = () => count.value++
    provide('increment', increment)
  }
}
```

### Symbol 作为 key

为了避免命名冲突，建议使用 Symbol 作为 provide/inject 的 key：

```javascript
// keys.js
export const UserKey = Symbol('user')
export const ThemeKey = Symbol('theme')

// 祖先组件
import { UserKey } from './keys.js'

provide(UserKey, userData)

// 后代组件
import { UserKey } from './keys.js'

const user = inject(UserKey)
```

## 代码示例

### 基础示例：主题配置

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>Provide/Inject 示例</title>
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <style>
    .dark { background: #333; color: white; padding: 20px; }
    .light { background: #fff; color: #333; padding: 20px; border: 1px solid #ccc; }
  </style>
</head>
<body>
  <div id="app">
    <app-root />
  </div>

  <script>
    const { createApp, provide, inject, ref } = Vue

    // 子组件
    const DeepChild = {
      setup() {
        const theme = inject('theme')
        const toggleTheme = inject('toggleTheme')
        
        return { theme, toggleTheme }
      },
      template: `
        <div :class="theme">
          <p>深层子组件</p>
          <p>当前主题：{{ theme }}</p>
          <button @click="toggleTheme">切换主题</button>
        </div>
      `
    }

    // 中间组件（不需要知道 theme，直接传递 DeepChild）
    const MiddleComponent = {
      components: { DeepChild },
      template: `
        <div style="border: 2px dashed #999; padding: 10px; margin: 10px;">
          <p>中间组件（不参与数据传递）</p>
          <deep-child />
        </div>
      `
    }

    // 根组件
    const AppRoot = {
      components: { MiddleComponent },
      setup() {
        const theme = ref('light')
        
        const toggleTheme = () => {
          theme.value = theme.value === 'light' ? 'dark' : 'light'
        }
        
        // 提供数据和方法
        provide('theme', theme)
        provide('toggleTheme', toggleTheme)
        
        return {}
      },
      template: `
        <div>
          <h2>根组件</h2>
          <middle-component />
        </div>
      `
    }

    createApp({
      components: { AppRoot }
    }).mount('#app')
  </script>
</body>
</html>
```

### 用户认证示例

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>用户认证示例</title>
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
</head>
<body>
  <div id="app">
    <app />
  </div>

  <script>
    const { createApp, provide, inject, ref, readonly } = Vue

    // 用户卡片组件（深层组件）
    const UserCard = {
      setup() {
        const user = inject('user')
        const logout = inject('logout')
        
        return { user, logout }
      },
      template: `
        <div v-if="user" style="border: 1px solid #ccc; padding: 10px;">
          <h4>用户信息</h4>
          <p>姓名：{{ user.name }}</p>
          <p>角色：{{ user.role }}</p>
          <button @click="logout">退出登录</button>
        </div>
        <div v-else>
          <p>未登录</p>
        </div>
      `
    }

    // 导航组件
    const Navbar = {
      components: { UserCard },
      setup() {
        const user = inject('user')
        
        return { user }
      },
      template: `
        <nav style="background: #eee; padding: 10px;">
          <span>导航栏</span>
          <span v-if="user" style="margin-left: 20px;">
            欢迎，{{ user.name }}
          </span>
          <user-card style="margin-top: 10px;" />
        </nav>
      `
    }

    // 登录表单
    const LoginForm = {
      setup() {
        const user = inject('user')
        const login = inject('login')
        const name = ref('')
        
        const handleLogin = () => {
          if (name.value) {
            login({ name: name.value, role: '用户' })
          }
        }
        
        return { user, name, handleLogin }
      },
      template: `
        <div v-if="!user">
          <input v-model="name" placeholder="输入用户名">
          <button @click="handleLogin">登录</button>
        </div>
      `
    }

    // 应用根组件
    const App = {
      components: { Navbar, LoginForm },
      setup() {
        const user = ref(null)
        
        const login = (userData) => {
          user.value = userData
        }
        
        const logout = () => {
          user.value = null
        }
        
        // 提供只读的用户数据和操作方法
        provide('user', readonly(user))
        provide('login', login)
        provide('logout', logout)
        
        return {}
      },
      template: `
        <div>
          <navbar />
          <hr>
          <login-form />
          <p style="color: #666;">
            提示：Navbar 和 LoginForm 是兄弟组件，
            但 UserCard 是 Navbar 的深层子组件
          </p>
        </div>
      `
    }

    createApp({
      components: { App }
    }).mount('#app')
  </script>
</body>
</html>
```

### Symbol Key 示例

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>Symbol Key 示例</title>
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
</head>
<body>
  <div id="app">
    <app />
  </div>

  <script>
    const { createApp, provide, inject, ref } = Vue

    // 定义 Symbol key
    const ConfigKey = Symbol('config')
    const MessageKey = Symbol('message')

    // 配置展示组件
    const ConfigDisplay = {
      setup() {
        const config = inject(ConfigKey)
        const message = inject(MessageKey, '默认消息')  // 使用默认值
        
        return { config, message }
      },
      template: `
        <div style="border: 1px solid #42b983; padding: 10px;">
          <h4>配置信息</h4>
          <p>主题：{{ config.theme }}</p>
          <p>语言：{{ config.language }}</p>
          <p>消息：{{ message }}</p>
        </div>
      `
    }

    // 应用组件
    const App = {
      components: { ConfigDisplay },
      setup() {
        const config = ref({
          theme: 'dark',
          language: 'zh-CN'
        })
        
        // 使用 Symbol 作为 key
        provide(ConfigKey, config)
        // 不提供 MessageKey，使用默认值
        
        return {}
      },
      template: `
        <div>
          <h2>应用配置</h2>
          <config-display />
        </div>
      `
    }

    createApp({
      components: { App }
    }).mount('#app')
  </script>
</body>
</html>
```

## 最佳实践

1. **尽量使用 Symbol**：避免命名冲突，特别是在大型项目或组件库中
2. **配合 readonly**：防止后代组件直接修改提供的数据
3. **提供修改方法**：如果后代需要修改数据，通过提供的方法间接修改
4. **文档化**：记录 provide 的数据结构和使用方法
5. **限制使用范围**：不要滥用，对于复杂状态使用 Pinia

## 与 Props 的区别

| 特性 | Props | Provide/Inject |
|------|-------|----------------|
| 传递方向 | 父到子（逐层） | 祖先到后代（跨层级） |
| 响应性 | 支持 | 支持（提供响应式数据） |
| 类型检查 | 支持 | 不支持（需要运行时检查） |
| 可追踪性 | 容易 | 较难（调试困难） |
| 适用场景 | 父子组件通信 | 深层嵌套组件通信 |

## 练习题

### 练习 1：基础练习
创建一个多层级主题系统：
- 在根组件使用 `provide` 提供主题配置（颜色、字体大小）
- 创建三个层级的组件（A → B → C）
- 在 C 组件中使用 `inject` 获取主题并应用样式
- 在 A 组件提供切换主题的方法，C 组件调用该方法

### 练习 2：进阶练习
创建一个应用配置系统：
- 使用 `provide` 提供应用配置对象（语言、时区、日期格式）
- 使用 Symbol 作为 key
- 使用 `readonly` 保护配置数据
- 在根组件提供更新配置的方法
- 创建多个深层子组件，各自显示不同的配置项
- 在其中一个组件提供配置编辑器

### 练习 3：综合练习
创建一个通知系统：
- 在根组件使用 `provide` 提供通知列表和操作方法
- 提供的方法包括：添加通知、移除通知、清空所有通知
- 创建一个通知组件，可以显示在页面的角落
- 支持多种通知类型（成功、错误、警告、信息）
- 通知可以自动消失（设置定时器）
- 创建触发通知的按钮组件（可以在任何层级）
- 确保组件卸载时清理定时器

---

完成练习后，可以查看 `practice-solution.html` 中的参考答案。
