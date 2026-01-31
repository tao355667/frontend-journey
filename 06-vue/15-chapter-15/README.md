# 第15章：动态组件与异步组件

## 概念

### 动态组件 (Dynamic Components)
动态组件允许你根据条件动态切换不同的组件，而不需要使用 `v-if`/`v-else-if`/`v-else`。

### 异步组件 (Async Components)
异步组件允许你按需加载组件，只在需要时才从服务器下载组件代码，优化首屏加载性能。

---

## 1. 动态组件

### 基本用法

使用 `<component>` 元素配合 `is` 属性实现动态切换：

```vue
<template>
  <div>
    <!-- 切换按钮 -->
    <button @click="currentTab = 'Home'">首页</button>
    <button @click="currentTab = 'Posts'">文章</button>
    <button @click="currentTab = 'Archive'">归档</button>
    
    <!-- 动态组件 -->
    <component :is="currentTabComponent" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Home from './Home.vue'
import Posts from './Posts.vue'
import Archive from './Archive.vue'

const currentTab = ref('Home')

const currentTabComponent = computed(() => {
  const components = {
    Home,
    Posts,
    Archive
  }
  return components[currentTab.value]
})
</script>
```

### 使用字符串（需注册组件）

```vue
<template>
  <component :is="currentTab" />
</template>

<script setup>
import { ref } from 'vue'
import Home from './Home.vue'
import Posts from './Posts.vue'
import Archive from './Archive.vue'

const currentTab = ref('Home')
</script>
```

### 绑定对象（推荐）

```vue
<template>
  <component :is="tabs[currentTab]" />
</template>

<script setup>
import { ref } from 'vue'
import Home from './Home.vue'
import Posts from './Posts.vue'

const currentTab = ref('home')

const tabs = {
  home: Home,
  posts: Posts
}
</script>
```

---

## 2. 保持组件状态

### 问题：组件切换时状态丢失

```vue
<template>
  <component :is="currentTab" />
</template>
```

切换标签时，之前的组件会被销毁，状态丢失。

### 解决方案：`<KeepAlive>`

```vue
<template>
  <KeepAlive>
    <component :is="currentTab" />
  </KeepAlive>
</template>
```

被包裹的组件在切换时不会被销毁，而是被缓存，状态得以保留。

### KeepAlive 属性

```vue
<!-- 只缓存 Home 和 Posts -->
<KeepAlive :include="['Home', 'Posts']">
  <component :is="currentTab" />
</KeepAlive>

<!-- 不缓存 Archive -->
<KeepAlive :exclude="['Archive']">
  <component :is="currentTab" />
</KeepAlive>

<!-- 最多缓存 5 个组件实例 -->
<KeepAlive :max="5">
  <component :is="currentTab" />
</KeepAlive>
```

### 缓存组件的生命周期

被缓存的组件有特殊的生命周期钩子：

```vue
<script setup>
import { onActivated, onDeactivated } from 'vue'

// 组件被激活时（从缓存恢复）
onActivated(() => {
  console.log('组件被激活')
  // 可以在这里刷新数据
})

// 组件被停用时（被缓存）
onDeactivated(() => {
  console.log('组件被停用，进入缓存')
  // 可以在这里停止定时器等
})
</script>
```

---

## 3. 异步组件

### 为什么需要异步组件？

- 减少首屏加载时间
- 按需加载，节省带宽
- 代码分割，优化性能

### 基本用法

```vue
<script setup>
import { defineAsyncComponent } from 'vue'

// 定义异步组件
const AsyncComponent = defineAsyncComponent(() => {
  return import('./HeavyComponent.vue')
})
</script>

<template>
  <AsyncComponent />
</template>
```

### 带加载和错误状态

```vue
<script setup>
import { defineAsyncComponent } from 'vue'

const AsyncComponent = defineAsyncComponent({
  // 加载函数
  loader: () => import('./HeavyComponent.vue'),
  
  // 加载中显示的组件
  loadingComponent: LoadingSpinner,
  
  // 出错时显示的组件
  errorComponent: ErrorDisplay,
  
  // 显示加载组件前的延迟（避免闪烁）
  delay: 200,
  
  // 超时时间
  timeout: 3000
})
</script>
```

### 完整示例

```vue
<!-- App.vue -->
<script setup>
import { ref, defineAsyncComponent } from 'vue'
import LoadingSpinner from './LoadingSpinner.vue'
import ErrorDisplay from './ErrorDisplay.vue'

// 同步组件
const Home = defineAsyncComponent(() => import('./Home.vue'))
const Dashboard = defineAsyncComponent(() => import('./Dashboard.vue'))

// 带加载状态的异步组件
const HeavyChart = defineAsyncComponent({
  loader: () => import('./HeavyChart.vue'),
  loadingComponent: LoadingSpinner,
  errorComponent: ErrorDisplay,
  delay: 200,
  timeout: 5000
})

const currentView = ref('home')

const views = {
  home: Home,
  dashboard: Dashboard,
  chart: HeavyChart
}
</script>

<template>
  <nav>
    <button @click="currentView = 'home'">首页</button>
    <button @click="currentView = 'dashboard'">仪表盘</button>
    <button @click="currentView = 'chart'">图表（重型）</button>
  </nav>
  
  <KeepAlive>
    <component :is="views[currentView]" />
  </KeepAlive>
</template>
```

---

## 4.  Suspense 与异步组件

### Suspense 组件

用于处理异步依赖（如异步组件）的加载状态：

```vue
<template>
  <Suspense>
    <!-- 默认内容：异步组件 -->
    <template #default>
      <AsyncDashboard />
    </template>
    
    <!-- 加载中显示的内容 -->
    <template #fallback>
      <div class="loading">加载中...</div>
    </template>
  </Suspense>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'

const AsyncDashboard = defineAsyncComponent(() =>
  import('./Dashboard.vue')
)
</script>
```

### 多个异步组件

```vue
<template>
  <Suspense>
    <template #default>
      <div>
        <!-- 所有异步组件都加载完成后才显示 -->
        <AsyncHeader />
        <AsyncContent />
        <AsyncFooter />
      </div>
    </template>
    
    <template #fallback>
      <div class="page-loading">
        <div class="spinner"></div>
        <p>页面加载中...</p>
      </div>
    </template>
  </Suspense>
</template>
```

### Suspense 事件

```vue
<template>
  <Suspense 
    @pending="onPending"
    @resolve="onResolve"
    @fallback="onFallback"
  >
    <AsyncComponent />
    <template #fallback>
      <Loading />
    </template>
  </Suspense>
</template>

<script setup>
const onPending = () => console.log('开始加载')
const onResolve = () => console.log('加载完成')
const onFallback = () => console.log('显示加载状态')
</script>
```

---

## 5. 完整代码示例

### 文件 1: TabSystem.vue（动态组件+KeepAlive）

```vue
<script setup>
import { ref } from 'vue'
import TabHome from './TabHome.vue'
import TabPosts from './TabPosts.vue'
import TabSettings from './TabSettings.vue'

const currentTab = ref('home')
const tabs = {
  home: TabHome,
  posts: TabPosts,
  settings: TabSettings
}

const tabList = [
  { id: 'home', label: '首页', icon: '🏠' },
  { id: 'posts', label: '文章', icon: '📝' },
  { id: 'settings', label: '设置', icon: '⚙️' }
]
</script>

<template>
  <div class="tab-system">
    <div class="tab-nav">
      <button
        v-for="tab in tabList"
        :key="tab.id"
        :class="['tab-btn', { active: currentTab === tab.id }]"
        @click="currentTab = tab.id"
      >
        <span class="tab-icon">{{ tab.icon }}</span>
        {{ tab.label }}
      </button>
    </div>
    
    <div class="tab-content">
      <KeepAlive>
        <component :is="tabs[currentTab]" />
      </KeepAlive>
    </div>
  </div>
</template>

<style scoped>
.tab-system {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}
.tab-nav {
  display: flex;
  background: #f5f5f5;
  border-bottom: 1px solid #ddd;
}
.tab-btn {
  flex: 1;
  padding: 15px;
  border: none;
  background: none;
  cursor: pointer;
  transition: all 0.3s;
}
.tab-btn:hover {
  background: #e0e0e0;
}
.tab-btn.active {
  background: white;
  color: #42b883;
  border-bottom: 2px solid #42b883;
}
.tab-icon {
  margin-right: 5px;
}
.tab-content {
  padding: 20px;
  min-height: 200px;
}
</style>
```

### 文件 2: TabPosts.vue（带激活/停用生命周期）

```vue
<script setup>
import { ref, onActivated, onDeactivated } from 'vue'

const posts = ref([
  { id: 1, title: 'Vue 3 新特性', read: false },
  { id: 2, title: '组合式 API 详解', read: false },
  { id: 3, title: '性能优化技巧', read: false }
])

const unreadCount = ref(3)

onActivated(() => {
  console.log('文章标签被激活')
  // 可以在这里刷新文章列表
})

onDeactivated(() => {
  console.log('文章标签被缓存')
})

const markAsRead = (post) => {
  post.read = true
  unreadCount.value--
}
</script>

<template>
  <div>
    <h3>文章列表 <span class="badge">{{ unreadCount }} 未读</span></h3>
    <ul class="post-list">
      <li
        v-for="post in posts"
        :key="post.id"
        :class="['post-item', { read: post.read }]"
      >
        {{ post.title }}
        <button v-if="!post.read" @click="markAsRead(post)">标记已读</button>
      </li>
    </ul>
    <p class="hint">💡 切换到其他标签再回来，阅读状态会保留（KeepAlive 效果）</p>
  </div>
</template>

<style scoped>
.badge {
  background: #ff5252;
  color: white;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 12px;
}
.post-list {
  list-style: none;
  padding: 0;
}
.post-item {
  padding: 10px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.post-item.read {
  color: #999;
  text-decoration: line-through;
}
.hint {
  margin-top: 20px;
  padding: 10px;
  background: #e8f5e9;
  border-radius: 4px;
  font-size: 13px;
  color: #2e7d32;
}
</style>
```

### 文件 3: AsyncUserProfile.vue（异步组件）

```vue
<script setup>
import { defineAsyncComponent, ref } from 'vue'
import Loading from './Loading.vue'
import Error from './Error.vue'

// 模拟重型组件的异步加载
const HeavyProfile = defineAsyncComponent({
  loader: () => {
    return new Promise((resolve) => {
      // 模拟 2 秒加载延迟
      setTimeout(() => {
        resolve(import('./UserProfileDetail.vue'))
      }, 2000)
    })
  },
  loadingComponent: Loading,
  errorComponent: Error,
  delay: 200,
  timeout: 5000
})

const showProfile = ref(false)
</script>

<template>
  <div>
    <button @click="showProfile = !showProfile">
      {{ showProfile ? '隐藏' : '显示' }} 用户详情
    </button>
    
    <div v-if="showProfile" class="profile-container">
      <HeavyProfile />
    </div>
  </div>
</template>

<style scoped>
.profile-container {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
</style>
```

---

## 关键点总结

| 特性 | 用途 | 示例 |
|------|------|------|
| `<component :is="...">` | 动态切换组件 | 标签页系统 |
| `<KeepAlive>` | 缓存组件状态 | 表单填写中切换标签 |
| `onActivated/onDeactivated` | 缓存组件的生命周期 | 恢复时刷新数据 |
| `defineAsyncComponent` | 按需加载组件 | 重型图表组件 |
| `<Suspense>` | 处理异步加载状态 | 显示加载动画 |

---

## 练习题

### 练习 1：实现一个带缓存的标签页系统

创建一个包含 4 个标签的组件：
- 首页（可以计数）
- 消息（有未读标记）
- 设置（有表单输入）
- 个人资料

使用 `KeepAlive` 缓存所有标签，验证状态保留功能。

### 练习 2：异步加载重型组件

创建一个模拟的重型组件（包含大量计算或 DOM 操作）：
- 使用 `defineAsyncComponent` 异步加载
- 添加加载动画
- 添加错误处理
- 设置超时时间

### 练习 3：结合 Suspense 和异步组件

使用 `Suspense` 包装多个异步组件：
- 创建 3 个异步组件，分别延迟 1s、2s、3s 加载
- 使用 `Suspense` 统一管理加载状态
- 实现骨架屏加载效果

---

## 常见错误

```vue
<!-- ❌ 错误：不能在 is 中使用组件对象字符串 -->
<component is="Home" />

<!-- ✅ 正确：组件需要注册或使用 :is -->
<component :is="Home" />
```

```javascript
// ❌ 错误：动态导入语法错误
const AsyncComp = defineAsyncComponent(() => {
  import('./Comp.vue')  // 缺少 return！
})

// ✅ 正确
const AsyncComp = defineAsyncComponent(() =>
  import('./Comp.vue')
)
// 或
const AsyncComp = defineAsyncComponent(() => {
  return import('./Comp.vue')
})
```

```vue
<!-- ❌ 错误：KeepAlive 只能有一个直接子元素 -->
<KeepAlive>
  <ComponentA />
  <ComponentB />
</KeepAlive>

<!-- ✅ 正确 -->
<KeepAlive>
  <component :is="currentComponent" />
</KeepAlive>
```
