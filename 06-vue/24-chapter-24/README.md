# 第二十四章：Teleport 与 Suspense

## 学习目标
1. 理解 Teleport 组件的作用和使用场景
2. 掌握将组件渲染到 DOM 其他位置的方法
3. 理解 Suspense 组件的作用
4. 学会处理异步组件加载

## 概念讲解

### Teleport - 传送门

`Teleport` 是 Vue 3 内置组件，允许你将组件的模板内容渲染到 DOM 中的其他位置，而不是组件所在的位置。

**比喻：投影仪**

想象你有一个投影仪（组件），放在会议室（父组件）里，但你可以把画面投射到任何墙面（目标位置）：
- 投影仪在会议室（组件在逻辑上属于父组件）
- 画面显示在大厅（实际渲染到 body 或其他位置）

这在处理模态框、通知、下拉菜单等需要脱离当前布局的组件时非常有用。

**基本用法：**

```html
<!-- 组件模板 -->
<div class="parent">
  <h3>父组件内容</h3>
  
  <!-- 将模态框传送到 body 末尾 -->
  <Teleport to="body">
    <div class="modal">
      <h3>模态框标题</h3>
      <p>这是模态框内容</p>
    </div>
  </Teleport>
</div>
```

渲染结果：
```html
<body>
  <div id="app">
    <div class="parent">
      <h3>父组件内容</h3>
    </div>
  </div>
  
  <!-- 模态框被传送到这里 -->
  <div class="modal">
    <h3>模态框标题</h3>
    <p>这是模态框内容</p>
  </div>
</body>
```

**to 属性的值：**
- CSS 选择器字符串：`"body"`、`"#modal-container"`、`.overlay`
- HTMLElement：`document.body`

### Teleport 的特点

1. **逻辑归属不变**：组件仍然是原父组件的子组件，事件、数据流保持不变
2. **样式隔离**：传送的组件不受父组件 CSS 影响（如 `overflow: hidden`）
3. **可以传送到多个目标**：多个 Teleport 可以共享同一个目标
4. **支持 disabled**：可以动态启用/禁用传送

```html
<!-- 多个 Teleport 共享同一个目标 -->
<Teleport to="#modals">
  <div>模态框 1</div>
</Teleport>

<Teleport to="#modals">
  <div>模态框 2</div>
</Teleport>

<!-- 渲染结果 -->
<div id="modals">
  <div>模态框 1</div>
  <div>模态框 2</div>
</div>
```

```html
<!-- 动态控制传送 -->
<Teleport to="body" :disabled="isInline">
  <!-- 当 isInline 为 true 时，不传送，正常渲染在父组件内 -->
  <div class="modal">...</div>
</Teleport>
```

### Suspense - 异步依赖处理

`Suspense` 是 Vue 3 内置组件，用于在组件树中协调异步依赖的处理，显示加载状态。

**使用场景：**
- 异步组件加载
- 带有异步 setup() 的组件
- 需要等待多个异步操作完成

**基本结构：**

```html
<Suspense>
  <!-- 默认插槽：异步内容 -->
  <template #default>
    <AsyncComponent />
  </template>
  
  <!-- fallback 插槽：加载状态 -->
  <template #fallback>
    <div>加载中...</div>
  </template>
</Suspense>
```

**异步组件示例：**

```javascript
// 使用 defineAsyncComponent 定义异步组件
import { defineAsyncComponent } from 'vue'

const AsyncComponent = defineAsyncComponent(() =>
  import('./components/HeavyComponent.vue')
)

// 或者使用异步 setup
export default {
  async setup() {
    const data = await fetchData()  // 异步获取数据
    return { data }
  }
}
```

### Suspense 的事件

```html
<Suspense @resolve="onResolve" @pending="onPending" @fallback="onFallback">
  <AsyncComponent />
  <template #fallback>加载中...</template>
</Suspense>
```

- `@pending`：异步依赖开始加载时触发
- `@resolve`：所有异步依赖加载完成时触发
- `@fallback`：显示 fallback 内容时触发

## 代码示例

### Teleport 基础示例

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>Teleport 示例</title>
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <style>
    .parent { 
      border: 2px solid #42b983; 
      padding: 20px; 
      margin: 10px;
      overflow: hidden;
    }
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .modal-content {
      background: white;
      padding: 30px;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <div id="app">
    <parent-component />
  </div>

  <script>
    const { createApp, ref } = Vue

    // 模态框组件
    const Modal = {
      props: ['title'],
      emits: ['close'],
      setup(props, { emit }) {
        return {}
      },
      template: `
        <div class="modal-overlay" @click.self="$emit('close')">
          <div class="modal-content">
            <h3>{{ title }}</h3>
            <slot></slot>
            <button @click="$emit('close')">关闭</button>
          </div>
        </div>
      `
    }

    // 父组件
    const ParentComponent = {
      components: { Modal },
      setup() {
        const showModal = ref(false)
        
        return { showModal }
      },
      template: `
        <div class="parent">
          <h2>父组件（设置了 overflow: hidden）</h2>
          <p>如果模态框在这里渲染，会被裁剪！</p>
          <button @click="showModal = true">打开模态框</button>
          
          <!-- 传送到 body，避免被父组件样式影响 -->
          <Teleport to="body">
            <modal 
              v-if="showModal" 
              title="传送门模态框"
              @close="showModal = false"
            >
              <p>这个模态框被传送到 &lt;body&gt; 标签下</p>
              <p>所以不会被父组件的 overflow: hidden 影响</p>
            </modal>
          </Teleport>
        </div>
      `
    }

    createApp({
      components: { ParentComponent }
    }).mount('#app')
  </script>
</body>
</html>
```

### Teleport 多个目标示例

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>Teleport 多目标示例</title>
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <style>
    .container { padding: 20px; }
    .notification-container {
      position: fixed;
      top: 20px;
      right: 20px;
      width: 300px;
    }
    .notification {
      background: #42b983;
      color: white;
      padding: 15px;
      margin: 10px 0;
      border-radius: 4px;
    }
    .modal-container {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .modal {
      background: white;
      border: 2px solid #333;
      padding: 20px;
    }
  </style>
</head>
<body>
  <div id="app">
    <div id="notifications"></div>
    <div id="modals"></div>
    <app />
  </div>

  <script>
    const { createApp, ref } = Vue

    // 通知组件
    const Notification = {
      props: ['message'],
      template: `<div class="notification">{{ message }}</div>`
    }

    // 模态框组件
    const Modal = {
      props: ['content'],
      emits: ['close'],
      template: `
        <div class="modal">
          <h4>模态框</h4>
          <p>{{ content }}</p>
          <button @click="$emit('close')">关闭</button>
        </div>
      `
    }

    // 应用组件
    const App = {
      components: { Notification, Modal },
      setup() {
        const notifications = ref([])
        const showModal = ref(false)
        let notificationId = 0
        
        const addNotification = () => {
          const id = ++notificationId
          notifications.value.push({
            id,
            message: `通知 ${id}`
          })
          
          // 3秒后自动移除
          setTimeout(() => {
            notifications.value = notifications.value.filter(n => n.id !== id)
          }, 3000)
        }
        
        return { notifications, showModal, addNotification }
      },
      template: `
        <div class="container">
          <h2>Teleport 多目标示例</h2>
          <button @click="addNotification">添加通知</button>
          <button @click="showModal = true">显示模态框</button>
          
          <!-- 传送到通知容器 -->
          <Teleport to="#notifications">
            <div class="notification-container">
              <notification 
                v-for="n in notifications" 
                :key="n.id"
                :message="n.message"
              />
            </div>
          </Teleport>
          
          <!-- 传送到模态框容器 -->
          <Teleport to="#modals">
            <div v-if="showModal" class="modal-container">
              <modal 
                content="这是一个模态框"
                @close="showModal = false"
              />
            </div>
          </Teleport>
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

### Suspense 基础示例

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>Suspense 示例</title>
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <style>
    .loading { 
      padding: 20px; 
      background: #f0f0f0; 
      text-align: center;
    }
    .content {
      padding: 20px;
      background: #e8f5e9;
    }
    .error {
      color: red;
      padding: 20px;
    }
  </style>
</head>
<body>
  <div id="app">
    <h2>Suspense 演示</h2>
    <async-container />
  </div>

  <script>
    const { createApp, ref, defineAsyncComponent, Suspense } = Vue

    // 模拟异步数据获取
    const fetchData = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            { id: 1, name: '张三' },
            { id: 2, name: '李四' },
            { id: 3, name: '王五' }
          ])
        }, 2000)
      })
    }

    // 异步组件
    const AsyncUserList = {
      async setup() {
        const users = ref([])
        
        // 在 setup 中使用 await
        users.value = await fetchData()
        
        return { users }
      },
      template: `
        <div class="content">
          <h3>用户列表</h3>
          <ul>
            <li v-for="user in users" :key="user.id">{{ user.name }}</li>
          </ul>
        </div>
      `
    }

    // 容器组件
    const AsyncContainer = {
      components: { 
        Suspense,
        AsyncUserList 
      },
      setup() {
        const isPending = ref(false)
        
        return { isPending }
      },
      template: `
        <div>
          <p v-if="isPending">正在加载数据...</p>
          
          <Suspense 
            @pending="isPending = true"
            @resolve="isPending = false"
          >
            <template #default>
              <async-user-list />
            </template>
            
            <template #fallback>
              <div class="loading">
                <p>加载中...</p>
                <p>请稍候</p>
              </div>
            </template>
          </Suspense>
        </div>
      `
    }

    createApp({
      components: { AsyncContainer }
    }).mount('#app')
  </script>
</body>
</html>
```

### Suspense 配合异步组件

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>Suspense 异步组件示例</title>
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <style>
    .loading { padding: 20px; background: #f5f5f5; }
    .content { padding: 20px; background: #e3f2fd; }
  </style>
</head>
<body>
  <div id="app">
    <h2>异步组件加载演示</h2>
    <app />
  </div>

  <script>
    const { createApp, ref, defineAsyncComponent, Suspense } = Vue

    // 模拟 HeavyComponent 加载
    const HeavyComponent = defineAsyncComponent(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            template: `
              <div class="content">
                <h3>重量级组件已加载</h3>
                <p>这个组件是异步加载的，模拟大文件下载</p>
                <p>加载耗时：2秒</p>
              </div>
            `
          })
        }, 2000)
      })
    })

    // 应用组件
    const App = {
      components: { Suspense, HeavyComponent },
      setup() {
        const showComponent = ref(false)
        
        return { showComponent }
      },
      template: `
        <div>
          <button @click="showComponent = !showComponent">
            {{ showComponent ? '卸载' : '加载' }}组件
          </button>
          
          <Suspense v-if="showComponent">
            <template #default>
              <heavy-component />
            </template>
            <template #fallback>
              <div class="loading">
                <p>正在下载组件...</p>
                <progress value="50" max="100"></progress>
              </div>
            </template>
          </Suspense>
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

### Teleport 最佳实践

1. **统一目标管理**：在 index.html 中预定义 teleport 目标容器
2. **避免滥用**：只在必要时使用（如模态框、通知）
3. **注意样式**：传送的组件脱离了父组件的 CSS 上下文
4. **使用 disabled**：根据需要动态控制传送

```html
<!-- index.html -->
<body>
  <div id="app"></div>
  <!-- 预定义传送目标 -->
  <div id="modals"></div>
  <div id="notifications"></div>
  <div id="dropdowns"></div>
</body>
```

### Suspense 最佳实践

1. **始终提供 fallback**：确保用户知道正在加载
2. **处理错误**：配合 Error Boundary 处理加载失败
3. **避免过度使用**：小组件不需要 Suspense
4. **组合使用**：可以嵌套多个 Suspense

## 练习题

### 练习 1：Teleport 基础练习
创建一个模态框系统：
- 创建一个模态框组件，包含标题、内容和关闭按钮
- 使用 Teleport 将模态框传送到 body
- 在父组件中控制模态框的显示/隐藏
- 添加动画效果（淡入淡出）
- 点击遮罩层或关闭按钮关闭模态框

### 练习 2：Teleport 进阶练习
创建一个全局通知系统：
- 创建一个通知组件，支持不同类型（成功、错误、警告、信息）
- 使用 Teleport 将通知传送到固定的通知容器
- 创建一个通知管理器（使用 provide/inject）
- 支持添加通知、自动消失（带进度条）、手动关闭
- 通知可以堆叠显示
- 最多显示 5 条，新的会替换旧的

### 练习 3：Suspense 综合练习
创建一个异步仪表板：
- 创建一个异步组件，在 setup 中模拟数据加载（2秒延迟）
- 使用 Suspense 包裹组件，显示加载状态
- 加载完成后显示：
  - 统计卡片（用户数、订单数、收入）
  - 简单的图表（可以用 CSS 模拟）
  - 最近活动列表
- 添加错误处理：如果加载失败显示错误信息和重试按钮
- 添加刷新功能，重新加载数据

---

完成练习后，可以查看 `practice-solution.html` 中的参考答案。
